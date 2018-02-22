class AddHelpToClient < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :help, :string
  end
end
