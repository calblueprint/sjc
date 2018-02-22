class AddClientIdToCase < ActiveRecord::Migration[5.1]
  def change
    add_column :cases, :client_id, :bigint
  end
end
