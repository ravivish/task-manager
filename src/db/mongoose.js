const mongoose = require('mongoose');
// const validator = require('validator');

// DB connectivity

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:false //Only to disable the "DeprecationWaring: collection.findAndModify is depricated" warning
})

// const User = mongoose.model('User',{
//     name:{
//         type:String
//     },
//     age:{
//         type:Number
//     }
// })

// const me = new User({
//     name:'Mike',
//     age:25
// })

// me.save().then( () => {
//     console.log(me)
// }).catch( (error) =>{
//     console.log('Error ',error)
// })

// const task = mongoose.model('task',{
//     description:{
//         type:String,
//         require:true,
//         trim:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     }
// })

// const task1 = new task({
//     description:'Learn ReactJS',
//     completed:false
// })

// task1.save().then( () => {
//     console.log(task1)
// }).catch( (error) => {
//     console.log(error)
// })



// After installing validator

// const User = mongoose.model('User', {
//     name: {
//         type: String
//     },
//     email: {
//         type: String,
//         required: true,
//         trim:true,
//         lowercase:true,
//         validator(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email is invalid');
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength:7,
//         trim:true,
//         validator(value) {
//             if (value.toLowerCase().includes('password')) {
//                 throw new Error('password can not contain password');
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default:0,
//         validate(value){
//             if(value<0){
//                 throw new error('Age must be a positive number');
//             }
//         }
//     }
// })

// const me = new User({
//     name: 'Mike',
//     email: 'mike@'
// })
// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error ', error)
// })