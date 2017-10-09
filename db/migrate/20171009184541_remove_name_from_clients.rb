class RemoveNameFromClients < ActiveRecord::Migration[5.1]
  def change
    remove_column :clients, :name, :string
  end
end
