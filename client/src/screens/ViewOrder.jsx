import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { verifyUser } from '../services/auth';
import { getAllPizzas } from '../services/pizza';
import "./ViewOrder.css"

function ViewOrder(props) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const getUsersPizzas = async () => {
      await verifyUser()
      await getAllPizzas()
      setIsLoaded(true)
    }
    getUsersPizzas()
  }, [props.currentUser])

  const toppings = [
    {name: "pepperoni", price: 1},
    {name: "chicken", price: 1},
    {name: "steak", price: 1.50},
    {name: "jalapeno", price: 0.50},
    {name: "pineapple", price: 0.50}
  ]

  const sizes = [
    {size: "Small", price: 10},
    {size: "Medium", price: 15},
    {size: "Large", price: 20},
    {size: "Legendary", price: 25},
  ]


  const calculatedPrice = (obj) => {
    const currentSize = sizes.find(size => size.size === obj.size)
    let getPrice = parseInt(currentSize.price)

    if (obj.toppings.length) {
      for (let i = 0; i < obj.toppings.length; i++){
        toppings.find((x) => {
          if (x.name === obj.toppings[i].name) {
            getPrice += x.price
          }
        })
      }
    }
    return (Number.isInteger(getPrice) ? getPrice : getPrice.toFixed(2))
  }

  if (!isLoaded) {
    return (
      <div>
        <h1>issue</h1>
      </div>
    )
  }

  return (
    <div className="view-pizza-container">
      {props.pizzas.filter((pizza) => pizza.user_id === props.currentUser.id).map((displayPizza, key) => (
        <div key={key} className="order-details-container">
            <img
              className="view-order-img"
              alt="generic pizza2"
              src="https://res.cloudinary.com/ddv5mxj6f/image/upload/v1633687302/Pizza/depositphotos_30103299-stock-photo-pepperoni-pizza_z2e5fj.jpg"
            />
            <div className="order-text-container">
              <h3>{displayPizza.name}</h3>
              <h3>{displayPizza.size}</h3>
            </div>
              <div className="buttons-container">
                <Link to={`/pizza/${displayPizza.id}/edit`}><button className="buttons">Edit</button></Link>
                <button className="buttons" onClick={() => props.handlePizzaDelete(displayPizza.id)}>Delete</button>
              </div>
          <div className="price-container">
            <h1 className="price">${calculatedPrice(displayPizza)}</h1>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ViewOrder
