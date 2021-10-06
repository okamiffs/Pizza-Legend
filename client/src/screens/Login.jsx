import React, { useState } from 'react'

function Login(props) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault()
        props.handleLogin(formData)
      }}>
        <h3>Please sign in below</h3>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange}></input>
        </label>
        <br/>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange}></input>
        </label>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Login
