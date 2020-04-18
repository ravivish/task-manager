const express = require('express');
const User = require('../models/users');
const auth = require('../middleware/auth');

const router = new express.Router();



router.post('/users',async (req,res) => {
    
    const users = new User(req.body);
    try {
        await users.save();
        const token = await users.generateAuthToken();
        // res.send({user,token });
        res.status(201).send({users,token}); 
        // res.status(201).send(users); 
    }catch(e){
        res.status(400).send(e);
    }
    
})


// router.post('/users',(req,res) => {
//         // console.log(req.body);
//         // res.send('testing');

//         const users = new User(req.body);

//         users.save().then( ()=> {
//             res.status(201).send(users); 
//         }).catch((e)=>{
//             // console.log('Error ',error)
//             // res.status(400);            
//             res.status(400).send(e);
//             // res.send(e);
//         });
// })

// router.get('/users',async (req,res) => {
    // Adding middleware to each route handler 
router.get('/users/me',auth,async (req,res) => {
//    This is giving all the users of user table 
    // try{
    //     const users = await User.find({})
    //     res.send(users);
    // }catch(e){
    //     res.status(500).send(e);
    // }

    // This is give the data of current user only
    res.send(req.user);

})


// router.get('/users',(req,res) => {
//     User.find({}).then( (users) => {
//         res.send(users);
//     }).catch( (e) => {
//         res.status(500).send();
//     })
// })


router.get('/users/:id', async (req,res) => {

    const _id = req.params.id;
    
    try {
        const users = await User.findById(_id);
        if(!users){
            return res.status(404).send();
        }
        res.send(users);
    }catch(e){
        res.status(500).send(e);
    }
})



// router.get('/users/:id',(req,res) => {
//     // console.log(req.params);
//     const _id = req.params.id;
//     User.findById(_id).then( (user) => {
//         if(!user){
//             return res.status(404).send();
//         }
//         res.send(user);
//     }).catch( (e) => {
//         // res.status(500).send('No data found');
//         res.status(500).send(e);
//     })
// })


router.patch('/users/me', auth,async (req,res) => {
    // if we are trying to update a column which does not exist

    const upadtes = Object.keys(req.body);
    const allowUpdates = ['name','email','password','age'];
    // const isValidOpertion = upadtes.every((update) => {
    //     return allowUpdates.includes(update);
    // });
    const isValidOpertion = upadtes.every((update) => allowUpdates.includes(update) );

    if(!isValidOpertion){
        return res.status(400).send({error:"Invalid Updates!"})
    }

    try {

        // const user = await User.findById(req.params.id);
        const user = req.user;

        upadtes.forEach((upadte)=>{
            user[upadte] = req.body[upadte];
        })

        await user.save();

        // const user = await User.findByIdAndUpdate(req.params.id,req.body, {new : true , runValidators:true});

        // We don't need this because we are now using the middleware it will give only valid and one recod using token
        // if(!user){
        //     return res.status(404).send();
        // }

        res.send(user);
        
    }catch(e){
        res.status(400).send();
    }
})

router.delete('/users/me', auth, async (req,res) => {
    try{
        // const user = await User.findByIdAndDelete(req.params.id);

        // we don't need to find the record and delete it because in middleware function "auth" we 
        // already have id in form of "req.user._id" so just remove the user.
        
        // const user = await User.findByIdAndDelete(req.user._id);
        // if(!user){
        //     return res.status(400).send({error:'No User found'});
        // }

        await req.user.remove();
        res.send(req.user);
    }catch(e){
        res.status(500).send(e);
    }
})

router.post('/users/login',async (req,res)=>{
    try{
        const usr = await User.findByCredentials(req.body.email,req.body.password);
        const token = await usr.generateAuthToken();
        // res.send({usr,token });

        // Calling the user defined method in "models/user.js" to delete the password field and token array
        // res.send({usr:usr.getPublicProfile(),token });

        res.send({usr:usr,token });
        // res.send({usr,token });
    }catch(e){
        res.status(400).send(e);
    }
})

// Logout from current place only
router.post('/users/logout', auth,async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((tkn)=>{
            return tkn.token !== req.token;
        })
        await req.user.save();

        res.send();
    }catch(e){
        res.status(500).send();
    }
})

// Logout from every place where we loggedin
router.post('/users/logoutAll', auth,async (req, res) => {
    try{
        req.user.tokens =[]
        await req.user.save();

        res.send();
    }catch(e){
        res.status(500).send();
    }
})

module.exports = router;