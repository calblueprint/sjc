class AddCitizenSpouseToClient < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :citizen_spouse, :boolean
  end
end
