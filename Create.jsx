import React, { useState } from 'react'
import axios from 'axios'

function Create() {
  const [task, setTask] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')

  const handleAdd = () => {
    axios.post('http://localhost:3001/add', {
      task,
      description,
      dueDate
    })
    .then(result => {
      location.reload()
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='create_form'>
      <input type="text" placeholder='Enter Task' onChange={(e) => setTask(e.target.value)} />
      <input type="text" placeholder='Enter Description' onChange={(e) => setDescription(e.target.value)} />
      <input type="date" onChange={(e) => setDueDate(e.target.value)} />
      <button type="button" onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create
