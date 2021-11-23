import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSpecificPizza } from "../services/pizza";
import "./CreatePizza.css"

function CreatePizza(props) {
  let { id } = useParams()
  const [pizza, setPizza] = useState([])
  // const [topping, setToppings] = useState([])
  const [selectedTopping, setSelectedTopping] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    size: "",
    toppings: [],
  });

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const resp = await getSpecificPizza(id)
        setPizza(resp)
        if (resp) {
          setFormData(resp)
          // setToppings(resp.toppings)
        }
      }
      fetchData()
    }
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addToArray = (e) => {
    e.preventDefault();
    if (formData.toppings.map((t) => t.id).includes(parseInt(selectedTopping)) !== true) {
      setFormData((prevState) => ({
        ...prevState,
        toppings: [
          ...prevState.toppings,
          props.toppings.find((t) => t.id === parseInt(selectedTopping)),
        ],
      }));
    } else {
      alert("Your pizza already has this topping.")
    }
  };

  const removeFromArray = (e) => {
    e.preventDefault()
    if (formData.toppings.length > 1) {
      const { value } = e.target
      setFormData((prevState) => ({
        ...prevState,
        toppings: 
          prevState.toppings.filter((t) => t.id !== parseInt(value))
      }))
      console.log(formData)
      setSelectedTopping(null)
    } else {
      setFormData((prevState) => ({
        ...prevState,
        toppings: [],
      }))
      setSelectedTopping(null)
    }
  }

  const sizes = ["Small", "Medium", "Large", "Legendary"];

  return (
    <div className="main-container">
      <div className="pizza-and-toppings-container">
        <img
          className="pizza-img"
          alt="generic pizza2"
          src="https://res.cloudinary.com/ddv5mxj6f/image/upload/v1633687302/Pizza/depositphotos_30103299-stock-photo-pepperoni-pizza_z2e5fj.jpg"
        />
        <div className="topping-table">
          {formData.toppings.map((topping) => (
            <div className="topping-selection-container" key={topping.id}>
              <p className="topping-name">{topping.name}</p>
              <button className="buttons" value={topping.id} onClick={removeFromArray}>
                remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (id) {
            const updatedFormData = {
              name: formData.name,
              size: formData.size,
              toppings: [
                ...formData.toppings,
              ]
            };
            props.handlePizzaUpdate(id, updatedFormData);
          } else {
            props.handlePizzaCreate(formData);
          }

        }}
      >
        <div className="form-container">
          <label>
            Name:
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
            ></input>
          </label>
          <label>
            Size:
            {id ? (
              <select
                value={sizes.find((value) => value === pizza.size)}
                defaultValue="default"
                name="size"
                onChange={handleChange}
              >
                <option disabled value="default">
                  {" "}
                  -- Select --{" "}
                </option>
                {sizes.map((sizeOption, key) => (
                  <option key={key} value={sizeOption}>
                    {sizeOption}
                  </option>
                ))}
              </select>
            ) : (
              <select
                name="size"
                defaultValue="default"
                onChange={handleChange}
              >
                <option disabled value="default">
                  {" "}
                  -- Select --{" "}
                </option>
                {sizes.map((sizeOption, key) => (
                  <option key={key} value={sizeOption}>
                    {sizeOption}
                  </option>
                ))}
              </select>
            )}
          </label>
          <label>
            Toppings:
            <select
              defaultValue="default"
              onChange={(e) => setSelectedTopping(e.target.value)}
            >
              <option disabled value="default">
                {" "}
                -- Select --{" "}
              </option>
              {/* {id
                ? topping.map((topping) => (
                    <option key={topping.id} value={topping.id}>
                      {topping.name}
                    </option>
                  ))
                : */}
                {props.toppings.map((topping) => (
                    <option key={topping.id} value={topping.id}>
                      {topping.name}
                    </option>
                  ))}
            </select>
          </label>
          <button id="add-button" className="buttons" onClick={addToArray}>Add</button>
        </div>
          <button id="submit-button" className="buttons">Submit</button>
      </form>
    </div>
  );
}

export default CreatePizza;
