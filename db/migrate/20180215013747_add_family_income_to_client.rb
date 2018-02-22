class AddFamilyIncomeToClient < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :family_income, :integer
  end
end
