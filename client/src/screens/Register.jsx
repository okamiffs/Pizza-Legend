import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './Register.css'

function Register(props) {
  const [confirmPassword, setConfirmPassword] = useState("")
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const registeration = (e) => {
    e.preventDefault()
    if (formData.password === confirmPassword) {
      props.handleRegister(formData)
    } else {
      alert("passwords do not match")
    }
  }

  return (
    <div className="form-container">
      <h3>Please sign in below</h3>
      <form className="form-itself" onSubmit={registeration}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            password="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </label>
        <button className="submit-button">Submit</button>
        {confirmPassword === formData.password ? null : (
          <p>Passwords don't match</p>
        )}
      </form>
      <p>
        Don't have an account? <Link to="/register">Click here</Link>
      </p>
    </div>
  );
}

export default Register
