class RemoveTypeFromNotifications < ActiveRecord::Migration[5.1]
  def change	
  	remove_column :notifications, :type
  end
end
