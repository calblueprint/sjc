class AddFleeCountryToClient < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :flee_country, :boolean
  end
end
