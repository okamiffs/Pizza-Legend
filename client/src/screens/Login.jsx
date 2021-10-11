import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Login.css"

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
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          try {
            props.handleLogin(formData);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <h3 className="sign-in-title">Please sign in below</h3>
        <div className="fields-container">
          <label>
            Username:
            <input
              className="input-fields"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            ></input>
          </label>
          <label>
            Password:
            <input
              className="input-fields"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <button className="sign-in-button">Sign in</button>
      </form>
      <div className="redirect">
        <p>Don't have an account? <Link to="/register">Click here</Link></p>
      </div>
    </div>
  );
}

export default Login
