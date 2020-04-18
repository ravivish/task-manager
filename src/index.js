const express = require('express');
require('./db/mongoose');

const userRouter = require('../src/router/user');
const taskRouter = require('../src/router/task');


const app = express();
// const port  = process.env.PORT || 3000;
const port  = process.env.PORT;

// app.use( (req,res,next) =>{
//     // console.log("method: ",req.method,"\nPath: ",req.path);
//     // next(); // if we will not call next() method it will stuck at "do Something" to move further we will need to call next() method.
//     if(req.method === 'GET'){
//         res.send('GET request are disabled');
//     }
//     else{
//         next();
//     }
// })


// // Middleware for maintenance 
// app.use( (req,res,next) => {

//     res.status(503).send('Site is under maintenance');

//     // if(req.method.length > 0){
//     //     res.status(503).send('Site is under maintenance');
//     // }else{
//     //     next();
//     // }
// })

app.use(express.json());

app.use(userRouter); // Registering user router

app.use(taskRouter); // Registering task router

// 
// Without Middleware: new request -> run route handler
// 
// With Middleware: new request -> do something -> run route handler
// 

app.listen(port,()=>{
    console.log('Server is up on port ' + port);
});


// const jwt = require('jsonwebtoken');

// const myfun = async () => {
//     const token = await jwt.sign({_id:'abc123'},'thisistestonly',{expiresIn :'1 seconds'});
//     console.log("token: ",token);

//     // validate tokens

//     // const data  = jwt.verify(token,'hisistestonly'); //error in string
//     const data  = jwt.verify(token,'thisistestonly');
//     console.log(data);
    
    
// }

// myfun();


// const bcrypt = require('bcryptjs');

// const myfun = async () => {
//     const password = "Red12345!$";
//     const hashedpassword = await bcrypt.hash(password,8);
//     console.log(password);
//     console.log(hashedpassword); 

//     const isMatch = await bcrypt.compare('Red12345!$',hashedpassword);
//     console.log(isMatch);

//     // Difference between hasing and encryption is that encryption proecess is reversable means we can get the 
//     // the orginal text back but hashing process is not reversable.To authenticate we will compare the hashes of
//     // passwords. 
    
// }

// myfun()



// const pet = {
//     name:'Hal'
// }

// pet.toJSON = function(){
//     // console.log(this);
//     // return this;

//     // return this;

//     return {};
// }

// // This is exactly what Express server do each time we send data(res.send())
// console.log(JSON.stringify(pet));


// const Task = require('./models/tasks');
// const User = require('./models/users');


// const fun = async () => {
//     // const task = await Task.findById('5d4913f721dd11140c8e4073'); // task_id
//     // console.log(task);
//     // console.log(task.owner);
    
//     // await task.populate('owner').execPopulate();// it's going to find the user associate with the task id
//     // console.log(task.owner);
    
    
//     const user = await User.findById('5d4808012489c90e042a5a41');//owner-id
//     await user.populate('userstask').execPopulate();
//     console.log(user.userstask);
    
// }

// fun();