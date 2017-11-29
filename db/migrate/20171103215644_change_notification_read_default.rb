class ChangeNotificationReadDefault < ActiveRecord::Migration[5.1]
  def change
  	change_column_default :notifications, :read, false
  end
end
