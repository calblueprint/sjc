class MakeFixesToCases < ActiveRecord::Migration[5.1]
  def up
    change_column :cases, :type_of_case, 'integer USING CAST(type_of_case AS integer)'
    change_column :cases, :date_rec_last_disbursement, 'date USING CAST(date_rec_last_disbursement AS date)'
  end

  def down
    change_column :cases, :type_of_case, :string
    change_column :cases, :date_rec_last_disbursement, :string
  end
end
