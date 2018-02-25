class AddLivingWParentsToClient < ActiveRecord::Migration[5.1]
  def change
    add_column :clients, :living_w_parents, :boolean
  end
end
