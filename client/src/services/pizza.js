import api from "./config";

export const getAllPizzas = async () => {
  const resp = await api.get("/pizzas")
  return resp.data
}

export const createPizza = async (pizzaData) => {
  const resp = await api.post("/pizzas", {pizza: pizzaData })
  return resp.data
}