import api from "./config"

export const getToppings = async () => {
  const resp = await api.get("/toppings")
  return resp.data
}