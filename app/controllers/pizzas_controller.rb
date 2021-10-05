class PizzasController < ApplicationController
  before_action :set_pizza, only: [:show, :update, :destroy]

  # GET /pizzas
  def index
    @pizzas = Pizza.all

    render json: @pizzas, include: :toppings
  end

  # GET /pizzas/1
  def show
    render json: @pizza, include: :toppings
  end

  # POST /pizzas
  def create
    @pizza = Pizza.new(pizza_params)

    if @pizza.save
      render json: @pizza, status: :created, location: @pizza, include: :toppings
    else
      render json: @pizza.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /pizzas/1
  def update
    if @pizza.update(pizza_params)
      render json: @pizza, include: :toppings
    else
      render json: @pizza.errors, status: :unprocessable_entity
    end
  end

  # DELETE /pizzas/1
  def destroy
    @pizza.destroy
  end


  def add_toppings_to_pizza
    @pizza = Pizza.find(params[:pizza_id])
    @topping = Topping.find(params[:id])

    if @pizza.toppings.include?(@topping) == false
    @pizza.toppings << @topping
    render json: @pizza, include: :toppings
    end

    render json: "Your pizza already contains this topping!"
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pizza
      @pizza = Pizza.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def pizza_params
      params.require(:pizza).permit(:name, :size, :user_id)
    end
end