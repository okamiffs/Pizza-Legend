class CreatePizzas < ActiveRecord::Migration[6.1]
  def change
    create_table :pizzas do |t|
      t.string :name
      t.string :size
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
