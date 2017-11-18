class AddStageToClients < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :stage, :integer, :default => 1
  end
end
