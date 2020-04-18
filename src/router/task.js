const express = require('express');
const tasks = require('../models/tasks');
const auth = require('../middleware/auth');

const router = new express.Router();

 

router.post('/task', auth,async (req,res) => {
    // const Task = new tasks(req.body);

    //(...req.body)ES6 spread operator to copy all of body to object
    const Task = new tasks({
        ...req.body, 
        owner:req.user._id
    })


    try {
        await Task.save();
        res.status(201).send(Task);     

    }catch(e){
        res.status(400).send(e);
    }
})


// router.post('/task',(req,res) => {
//     const Task = new tasks(req.body);

//     Task.save().then( () => {
//         res.status(201).send(Task);
//     }).catch( (e) => {
//         // console.log(e);
//         res.status(400).send(e);
//     }); 
// })


// GET /tasks?completed=true
// Now we have five ways to fetch task data
// 1. "/task"
// 2. "/task?completed=true"
// 3. "/task?completed=false"
// 4. "/task?limit=5"
// 5. "/task?limit=5&skip=5"
// 6. "/task?completed=true&limit=5&skip=5"
// 7. "/task?sortBy=createdAt"
// 8. "/task?sortBy=createdAt_asc" [OR] "/task?sortBy=createdAt!asc"
// 9. "/task?sortBy=createdAt_desc" [OR] "/task?sortBy=completed!desc"
// 9. "/task?sortBy=completed_desc" [OR] "/task?sortBy=createdAt!desc"
// 9. "/task?sortBy=completed_desc" [OR] "/task?sortBy=completed!desc"

router.get('/task', auth ,async (req,res) => {

    const matchData = {};
    const sortData = {};

    if(req.query.completed){
        matchData.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const part = req.query.sortBy.split(":");
        sortData[part[0]] = part[1] === 'desc' ? -1 : 1
    }

    try {
        // To find all task stored in db
        // const task = await tasks.find({});

        // To find the task which is only created by owner of task
        // Approach 1:
        // const task = await tasks.find({owner:req.user._id});

        // Approach 2:
        await req.user.populate({
            path:'userstask',
            match:matchData,
            options:{
                limit:parseInt(req.query.limit),// limit:2
                skip:parseInt(req.query.skip),
                // sort:{
                //     // createdAt:1, //for asc according to timestamps
                //     // createdAt:-1, //for desc
                //     // completed:1, // first false task and then true tasks
                //     // completed:-1 // first true task and then false tasks
                // }
                sort:sortData,
            }
        }).execPopulate();

        res.send(req.user.userstask);
    }catch(e){
        res.status(404).send(e);        
    }
})



// router.get('/task', (req,res) => {
//     tasks.find({}).then( (task) => {
//         res.send(task);
//     }).catch((e) => {
//         res.status(404).send(e);
//     })  
// })

router.get('/task/:id', auth,async (req,res) => {
    const _id = req.params.id;
    try {
        // const task = await tasks.findById(_id);
        const task = await tasks.findOne({ _id, owner:req.user._id });

        if(!task){
            // res.status(404).send('No data found');
            return res.status(404).send();
        }
        res.send(task);
    }catch(e){
        res.status(404).send(e);
    }
})


// router.get('/task/:id', (req,res) => {
//     const _id = req.params.id;
//     tasks.findById(_id).then((task)=> {
//         if(!task){
//             // res.status(404).send('No data found');
//             return res.status(404).send();
//         }
//         res.send(task);
//     }).catch((e)=> {
//         // res.status(404).send('No data found');
//         res.status(404).send(e);
//     })
// })

router.patch('/task/:id',auth,async (req,res) => {
    const updates = Object.keys(req.body);
    const allowedUpadtes = ['description','completed'];
    const isValidOpertion = updates.every( (update) => allowedUpadtes.includes(update) );

    if(!isValidOpertion){
        return res.status(400).send({error:"Invalid Upadtes!"});
    }
    try {
        const tsk = await tasks.findOne({_id:req.params.id,owner:req.user._id});
        
        if(!tsk){
            return res.status(404).send();
        }
        
        updates.forEach((update) => {
            tsk[update] = req.body[update];
        });

        await tsk.save();
        // const tsk = await tasks.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        res.send(tsk);
    }catch(e){
        res.status(400).send(e);
    }
})


router.delete('/task/:id', auth,async (req,res) => {
    try{
        // const tsk = await tasks.findByIdAndDelete(req.params.id);
        const tsk = await tasks.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!tsk){
            // return res.status(404).send({error:'No task found'});
            return res.status(404).send();
        }
        res.send(tsk);
    }catch(e){
        res.status(500).send(e);
    }
})

module.exports = router;
