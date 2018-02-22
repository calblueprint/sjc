class AddInitialIntakeToClient < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :initial_intake, :string
  end
end
