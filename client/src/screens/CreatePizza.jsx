import React, { useState } from "react";

function CreatePizza(props) {
  const [selectedTopping, setSelectedTopping] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    size: "",
    toppings: [],
  });

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
      console.log("Already exists");
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
        toppings: []
      }))
      setSelectedTopping(null)
    }
  }

  const sizes = ["Small", "Medium", "Large", "Legendary"];

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.handlePizzaCreate(formData);
        }}
      >
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
          <select name="size" defaultValue="default" onChange={handleChange}>
            <option disabled value="default">
              {" "}
              -- Select --{" "}
            </option>
            {sizes.map((sizeOption) => (
              <option value={sizeOption}>{sizeOption}</option>
            ))}
          </select>
        </label>
        {formData.toppings.map((topping) => (
          <div key={topping.id}>
            <p>{topping.name}</p>
            <button value={topping.id} onClick={removeFromArray}>remove</button>
          </div>
        ))}
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
            {props.toppings.map((topping) => (
              <option key={topping.id} value={topping.id}>
                {topping.name}
              </option>
            ))}
          </select>
        </label>
        <button onClick={addToArray}>Add</button>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default CreatePizza;
