class ChangeFormatofTimeInComments < ActiveRecord::Migration[5.1]
  def change
    change_column :comments, :created_at, :string
  end
end
