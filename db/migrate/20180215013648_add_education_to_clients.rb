class AddEducationToClients < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :education, :string
  end
end
