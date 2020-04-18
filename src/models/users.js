const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const task = require('./tasks')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true, 
        trim:true
    },
    email: {
        type: String,
        unique:true,//to make sure that only one email is associated with one account
        required: true,
        trim:true,
        lowercase:true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength:7,
        trim:true,
        validator(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password can not contain password');
            }
        }
    },
    age: {
        type: Number,
        default:0,
        validate(value){
            if(value<0){
                throw new error('Age must be a positive number');
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
});

// This is a virtual field it will not stored in db it will use only to populate(fetch) the data of user with all his task
userSchema.virtual('userstask',{
    ref:'task',
    localField:'_id',
    foreignField:'owner'
})


// Hiding the private data by deleting it at client side only
// userSchema.methods.getPublicProfile = function(){
//     const user = this;
//     const userObject = user.toObject();

//     delete userObject.password;
//     delete userObject.tokens;

//     return userObject;
// }


// This method is also hiding data by deleting it at client side only but a special
// thing about this method is that it automatically called on evey response by Express Server
// So now every response which is returned from this file will do not contians the password field and token field.

userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({ _id:user._id.toString() },process.env.JWT_SECRET);

    // user.tokens = user.tokens.concat({token:token});
    user.tokens = user.tokens.concat({token});

    await user.save();
    
    return token;
}

userSchema.statics.findByCredentials = async(email,password) => {
    const user = await User.findOne({email:email});
    if(!user){ //no record found
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error('Unable to login');
    }
    return user;
}

// Hasing the password before saving them
userSchema.pre('save',async function(next){
    const user = this
    // console.log('just before saving');

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }

    next();// to tell that function is completed
    
})

// To remove all the task of user if a user is removed

userSchema.pre('remove',async function(next){
    const user = this;
    await task.deleteMany({ owner:user._id })
    next();
})


const User = mongoose.model('User', userSchema);

module.exports = User