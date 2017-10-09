class AddDefaultToCompletedStatus < ActiveRecord::Migration[5.1]
  def change
  	change_column_default :tasks, :completed_status, 0
  end
end
