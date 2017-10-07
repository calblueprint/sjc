class AddDefaultAdminToUsers < ActiveRecord::Migration[5.1]
  def change
  	change_column_default :users, :admin, false
  end
end
