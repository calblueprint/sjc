class CreateClients < ActiveRecord::Migration[5.1]
  def change
    create_table :clients do |t|
      t.string :name
      t.string :phone_number
      t.string :country
      t.string :state
      t.string :postal_code
      t.string :city
      t.string :street
    end
  end
end
