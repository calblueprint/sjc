class ChangeCaseProgressToEnum < ActiveRecord::Migration[5.1]
  def change
    change_column :cases, :case_progress, 'integer USING CAST(case_progress AS integer)'
  end
end
