import axios from 'axios'
import React, { useEffect, useState } from 'react'

function MainContainer() {
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
      {pizzas.map((pizza, key) => (
        <div key={key}>
          <img className="generic-img" src="https://res.cloudinary.com/ddv5mxj6f/image/upload/v1633450081/Pizza/istockphoto-1083487948-612x612_fturxb.jpg"/>
          <h2>{pizza.name}</h2>
        </div>
      ))

      }
    </div>
  )
}

export default MainContainer
