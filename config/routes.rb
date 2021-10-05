Rails.application.routes.draw do
  post '/auth/login', to: "authentication#login"
  get '/auth/verify', to: "authentication#verify"
  resources :toppings, only: [:index, :show]
  resources :pizzas
  resources :users, except: [:destroy, :index]
  put 'pizzas/:pizza_id/topping/:id', to: "pizzas#add_toppings_to_pizza"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
