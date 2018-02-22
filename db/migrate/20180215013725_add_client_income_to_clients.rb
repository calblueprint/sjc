class AddClientIncomeToClients < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :client_income, :integer
  end
end
