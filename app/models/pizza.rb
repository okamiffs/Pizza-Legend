class Pizza < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :toppings
end
