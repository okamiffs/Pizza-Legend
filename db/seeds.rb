# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Topping.destroy_all
Pizza.destroy_all
User.destroy_all

@users = User.create!(username: "Bruno1", email: "Bruno1@email.com", password: "bruno1")

puts "#{User.count} users were created!"

@pizzas = Pizza.create!(name: "My Pizza", size: "Meduim", user: @users)

puts "#{Pizza.count} pizzas are created!"

@pepperoni = Topping.create!(name: "pepperoni")
@steak = Topping.create!(name: "steak")
@chicken = Topping.create!(name: "chicken")
@jalapeno = Topping.create!(name: "jalapeno")
@pineapple = Topping.create!(name: "pineapple")

puts "#{Topping.count} toppings are created!"