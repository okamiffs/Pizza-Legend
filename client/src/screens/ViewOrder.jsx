import React from 'react'
import { Link } from 'react-router-dom';
import "./ViewOrder.css"

function ViewOrder(props) {
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
              <h1>$10</h1>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ViewOrder
