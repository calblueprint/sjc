class AddCaseIdToClients < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :case_id, :bigint
  end
end
