// CRUD operations

const {MongoClient,ObjectID} = require('mongodb')
// const MongoClient = require('mongodb')
// const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const database = 'task-manager'

MongoClient.connect(connectionURL,{ useNewUrlParser : true }, (error,client) => {
    if(error){
        return console.log('Unable to connect to database')
    }
    const db = client.db(database)

    // db.collection('users').insertOne({
    //     name: 'Tony',
    //     age: 48
    // }, (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name:"Ramesh",
    //         age:25
    //     },
    //     {
    //         name:"Kamlesh",
    //         age:28
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert documents')
    //     }
    //     console.log(result.ops)
    // })

    // Challange

    // db.collection('task').insertMany([
    //     {
    //         description:"Major Project",
    //         completed:true
    //     },
    //     {
    //         description:"Node",
    //         completed:true
    //     },
    //     {
    //         description:"React",
    //         completed:false
    //     }
    // ], (error,result) => {
    //     if(error){
    //         return console.log('Unable to insert documents')
    //     }
    //     console.log(result.ops)
    // })


    // Searching in database

    // db.collection('users').findOne( {name:'Tony' , age:48}, (error,user) => {
    //     if(error){
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(user)
    // })

    // db.collection('users').findOne( { _id:new ObjectID('5cb590a0a0557122e881576b')}, (error,user) => {
    //     if(error){
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(user)
    // })

    // find method return a cursor(it is pointer to that data in db (which is an array of all those document))
    // db.collection('users').find( { age:25 }).toArray( (error,user) => {
    //     console.log(user)          
    // })
    // // count method return number of matched record 
    // db.collection('users').find( { age:25 }).count( (error,user) => {
    //     console.log(user)          
    // })

    // db.collection('task').findOne( {_id:new ObjectID("5cb595c13ca1b70fdc5c4700")}, (error, user)=>{
    //     if(error){
    //         return console.log('Unable to fetch record')
    //     }
    //     console.log('Last record: ',user)
    // })

    // db.collection('task').find( { completed:true }).toArray( (error,user) => {
    //     if(error){
    //         return console.log('Unable to fetch record')
    //     }
    //     console.log(user)
    // })


    // Updating the records using Promises

    // const updatePromises = db.collection('users').updateOne({
    //     _id:new ObjectID("5cb59419cf94771b20b9da47")
    // },{
    //     $set: {
    //         name:'Banner'
    //     }
    // })

    // updatePromises.then( (result ) => {
    //     console.log(result)
    // }).then( (error) => {
    //     console.log(error)
    // })

    // now we are mixing the promises with function calling

    // db.collection('users').updateOne({
    //     _id:new ObjectID("5cb59419cf94771b20b9da46")
    // },{
    //     $set: {
    //         name:'Banner'
    //     }
    // }).then( (result ) => {
    //     console.log(result)
    // }).then( (error) => {
    //     console.log(error)
    // })

    // db.collection('users').updateOne({
    //     _id:new ObjectID("5cb59419cf94771b20b9da46")
    // },{
    //     $inc: {
    //         age:-10 //age:20 to increase by 20
    //     }
    // }).then( (result ) => {
    //     console.log(result)
    // }).then( (error) => {
    //     console.log(error)
    // })

    // updating more than one record with updatemany() method
    
    // db.collection('task').updateMany({
    //     completed:true
    // },{
    //     $set: {
    //         completed:false
    //     }
    // }).then( (result ) => {
    //     console.log(result.modifiedCount)
    // }).then( (error) => {
    //     console.log(error)
    // })


    // Deleteing one record
    // db.collection('users').deleteOne({
    //     age:13
    // }).then( (result) => {
    //     console.log(result)
    // }).catch( (error) => {
    //     console.log(error)
    // })
    // db.collection('task').deleteOne({
    //     description:'Node'
    // }).then( (result) => {
    //     console.log(result)
    // }).catch( (error) => {
    //     console.log(error)
    // })

    // Deleting more than one record
    // db.collection('users').deleteMany({
    //         age:28
    // }).then( (result) => {
    //         console.log(result)
    // }).catch( (error) => {
    //         console.log(error)
    // })

})