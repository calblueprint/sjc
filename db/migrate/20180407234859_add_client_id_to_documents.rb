class AddClientIdToDocuments < ActiveRecord::Migration[5.1]
  def change
    add_column :documents, :client_id, :bigint
  end
end
