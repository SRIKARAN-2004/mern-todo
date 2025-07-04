const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Todo = require('./Models/Todo')

const app = express()
app.use(cors())
app.use(express.json())

// ✅ Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/test')

const conn = mongoose.connection
conn.once('open', () => {
  console.log("MongoDB connected successfully")
})

// ✅ Get all todos
app.get('/get', (req, res) => {
  Todo.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})
// login
app.post('/login', (req, res) => {
  const { email, password } = req.body

  // Hardcoded for demo – replace with MongoDB User model check
  if(email === "test@gmail.com" && password === "12345") {
    res.json({ message: "Login Successful" })
  } else {
    res.status(401).json({ message: "Invalid credentials" })
  }
})


// ✅ Get todo by ID
app.get('/get/:id', (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => res.json(todo))
    .catch(err => res.json(err))
})

// ✅ Add new todo
app.post('/add', (req, res) => {
  const { task, description, dueDate } = req.body
  Todo.create({ task, description, dueDate })
    .then(todo => res.json(todo))
    .catch(err => res.json(err))
})

// ✅ Update task status (toggle done)
app.put('/update/:id', (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => {
      todo.done = !todo.done
      todo.save()
        .then(() => res.json(todo))
        .catch(err => res.json(err))
    })
    .catch(err => res.json(err))
})

// ✅ Delete task
app.delete('/delete/:id', (req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(() => res.json("Deleted"))
    .catch(err => res.json(err))
})

// ✅ Add subtask
app.post('/addSubtask/:id', (req, res) => {
  const { title } = req.body
  Todo.findByIdAndUpdate(req.params.id, {
    $push: { subtasks: { title } }
  }, { new: true })
    .then(todo => res.json(todo))
    .catch(err => res.json(err))
})

// ✅ Start server
app.listen(3001, () => {
  console.log("Server running on port 3001")
})
