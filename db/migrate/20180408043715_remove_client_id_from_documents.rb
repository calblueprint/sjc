class RemoveClientIdFromDocuments < ActiveRecord::Migration[5.1]
  def change
    remove_column :documents, :client_id
  end
end
