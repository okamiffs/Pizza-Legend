import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router'
import Login from '../screens/Login'
import "./MainContainer.css"

function MainContainer(props) {
  const [pizzas, setPizzas] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get('http://localhost:3000/pizzas')
      setPizzas(resp.data)
    }
    fetchData()
  }, [])

  return (
    <div>
      <Switch>
        <Route path="/login">
          <Login handleLogin={props.handleLogin}/>
        </Route>
        <Route path="/orders">
          Hello orders
        </Route>
        <Route path="/">
          {pizzas.map((pizza, key) => (
            <div className="pizza-container" key={key}>
              <div className="pizza-content-container">
                <img className="generic-img" src="https://res.cloudinary.com/ddv5mxj6f/image/upload/v1633450081/Pizza/istockphoto-1083487948-612x612_fturxb.jpg" />
                <h2>{pizza.name}</h2>
              </div>
            </div>
          ))}
        </Route>
      </Switch>
    </div>
  )
}

export default MainContainer
