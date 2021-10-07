import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router";
import { Link } from "react-router-dom";
import CreatePizza from "../screens/CreatePizza";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { createPizza, getAllPizzas } from "../services/pizza";
import { getToppings } from "../services/topping";
import "./MainContainer.css";

function MainContainer(props) {
  const [pizzas, setPizzas] = useState([]);
  const [toppings, setToppings] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getAllPizzas();
      setPizzas(resp);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getToppings();
      setToppings(resp);
    };
    fetchData();
  }, []);

  const handlePizzaCreate = async (formData) => {
    const pizzaData = await createPizza(formData);
    setPizzas((prevState) => [...prevState, pizzaData]);
    history.push("/");
  };

  return (
    <div>
      <Switch>
        <Route path="/login">
          <Login handleLogin={props.handleLogin} />
        </Route>
        <Route path="/register">
          <Register handleRegister={props.handleRegister} />
        </Route>
        <Route path="/signout">
          <div>
            <h3>Would you like to sign out?</h3>
            <button onClick={props.handleLogout}>Yes</button>
            <button onClick={() => history.push("/")}>No</button>
          </div>
        </Route>
        <Route path="/orders">Hello orders</Route>
        <Route path="/create">
          <CreatePizza
            handlePizzaCreate={handlePizzaCreate}
            toppings={toppings}
            setToppings={setToppings}
          />
        </Route>
        <Route path="/">
          <div className="hero-container">
            <img
              alt="logo"
              src="https://res.cloudinary.com/ddv5mxj6f/image/upload/v1633578589/Pizza/025f61ffab0641998b5b64deb3f83818_q3gmzw.png"
            />
            <h3 className="hero-title">A legendary Pizza, for legendary people!</h3>
            <Link to="/create">
              <button>Order now!</button>
            </Link>
          </div>
          <div className="main-pizza-container">
            {pizzas.map((pizza, key) => (
              <div className="pizza-container" key={key}>
                <div className="pizza-content-container">
                  <img
                    className="generic-img"
                    src="https://res.cloudinary.com/ddv5mxj6f/image/upload/v1633450081/Pizza/istockphoto-1083487948-612x612_fturxb.jpg"
                    alt="generic pizza image"
                  />
                  <h2>{pizza.name}</h2>
                </div>
              </div>
            ))}
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default MainContainer;
