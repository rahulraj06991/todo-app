const { text } = require('body-parser');
const express = require('express')
const { connectToMongo } = require('../helpers/db');
const { ObjectId } = require('mongodb');
 
const router = express.Router();

// let todos = []

router.get('/todos', async (req, res, next) => {
    const db = await connectToMongo()
    const todos = await db.collection('todos').find().toArray()
    const transformedTodos = todos.map((todo) => {
            return { id: todo._id, text: todo.text };
        });
        console.log(transformedTodos)
    res.json({ todos: transformedTodos });
    // const todos = await db.collection('todos').find();
    // console.log(todos)
    // const transformedTodos = todos.map((todo) => {
    //     return { id: todo._id, text: todo.text };
    // });
    // console.log(transformedTodos)
    // res.body = {todos: transformedTodos}
    //res.json({ todos: todos });
});

router.post('/todos', async (req, res, next) => {
    const db = await connectToMongo()
    const data = req.body
    console.log(data)
    const result = await db.collection('todos').insertOne(data)
    res.status(201).json({ message: 'Todo Created', todo: result.insertedId });
});

router.put('/todos/:todoId', async (req, res, next) => {
    //for testing
    console.log("in the put function")
    const db = await connectToMongo()
    const tid = req.params.todoId;
    //for testing
    console.log(tid)
    const id = new ObjectId(tid)
    const data = req.body
    console.log(data)
    await db.collection('todos').updateOne({ _id: id }, {$set: {text: data.text}} )
    res.status(200).json({ message: 'Updated' })
});

router.delete('/todos/:todoId', async (req, res, next) => {
    //for testing
    console.log("in the delete function")
    const db = await connectToMongo()
    const tid = req.params.todoId;
    //for testing
    console.log(tid)
    const id = new ObjectId(tid)
    await db.collection('todos').deleteOne({ _id: id })
    res.status(200).json({ message: 'Todo deleted' })
});


module.exports = router;