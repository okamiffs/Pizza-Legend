class PizzasController < ApplicationController
  before_action :authorize_request, only: [:create, :update, :destroy]
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
    @pizza = Pizza.new(pizza_params.except(:toppings))
    @pizza.user = @current_user

    if @pizza.toppings.length > 0
      @toppings = Topping.find(pizza_params[:toppings].map {|t| t[:id]})
      @pizza.toppings = @toppings
    end

    if @pizza.save
      render json: @pizza, status: :created, location: @pizza, include: :toppings
    else
      render json: @pizza.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /pizzas/1
  def update
    if @pizza.update(pizza_params.except(:toppings))
      @toppings = Topping.find(pizza_params[:toppings].map {|t| t[:id]})
      @pizza.toppings = @toppings
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
    else
      render json: "Your pizza already contains this topping!"
    end

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pizza
      @pizza = Pizza.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def pizza_params
      params.require(:pizza).permit(:name, :size, toppings:[:id, :name, :created_at, :updated_at])
    end
end
