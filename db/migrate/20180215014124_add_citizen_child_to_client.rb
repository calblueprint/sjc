class AddCitizenChildToClient < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :citizen_child, :boolean
  end
end
