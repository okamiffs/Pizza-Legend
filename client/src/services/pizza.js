import api from "./config";

export const getAllPizzas = async () => {
  const resp = await api.get("/pizzas")
  return resp.data
}

export const getSpecificPizza = async (id) => {
  const resp = await api.get(`/pizzas/${id}`)
  return resp.data
}

export const createPizza = async (pizzaData) => {
  const resp = await api.post("/pizzas", {pizza: pizzaData })
  return resp.data
}

export const updatePizza = async (id, pizzaData) => {
  const resp = await api.put(`/pizzas/${id}`, { pizza: pizzaData })
  return resp.data
}

export const deletePizza = async (id) => {
  const resp = await api.delete(`/pizzas/${id}`)
  return resp.data
}