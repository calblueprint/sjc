class AddVictimCrimeToClient < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :victim_crime, :string
  end
end
