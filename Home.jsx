import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Create from './create'
import { BsCheckCircleFill, BsCircleFill, BsFillTrashFill } from 'react-icons/bs'
import './App.css'

function Home() {
  const [todos, setTodos] = useState([])

  // Fetch all todos
  const fetchTodos = () => {
    axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleEdit = (id) => {
    axios.put('http://localhost:3001/update/' + id)
      .then(() => {
        setTodos(todos.map(todo =>
          todo._id === id ? { ...todo, done: !todo.done } : todo
        ))
      })
      .catch(err => console.log(err))
  }

  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/delete/' + id)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id))
      })
      .catch(err => console.log(err))
  }

  const handleAdd = (task) => {
    axios.post('http://localhost:3001/add', { task })
      .then(result => {
        setTodos([...todos, result.data])
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='home'>
      <h1>Todo List</h1>
      <Create handleAdd={handleAdd} />
      <br />
      {todos.length === 0 ? (
        <div><h2>No Record</h2></div>
      ) : (
        todos.map(todo => (
          <div className='task' key={todo._id}>
            <div className='checkbox' onClick={() => handleEdit(todo._id)}>
              {todo.done
                ? <BsCheckCircleFill className='icon' />
                : <BsCircleFill className='icon' />
              }
              <p className={todo.done ? "Line_through" : ""}>{todo.task}</p>
            </div>
            <div className='delete-btn' onClick={() => handleDelete(todo._id)}>
              <BsFillTrashFill className='icon trash-icon' />
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Home
