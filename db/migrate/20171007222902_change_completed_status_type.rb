class ChangeCompletedStatusType < ActiveRecord::Migration[5.1]
  def change
  	change_column :tasks, :completed_status, 'integer USING CAST(completed_status AS integer)', :default => :active
  end
end
