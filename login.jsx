import React, { useState } from 'react'
import axios from 'axios'
import './App.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/login', { email, password })
      .then(res => {
        alert('Login Successful')
        // If your backend sends a token, save it:
        // localStorage.setItem('token', res.data.token)
        // Redirect to Home
        window.location.href = '/home'
      })
      .catch(err => {
        console.log(err)
        alert('Invalid Credentials')
      })
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
