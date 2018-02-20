class AddTimestampsToComments < ActiveRecord::Migration[5.1]
  def change
  	change_table(:comments) { |t| t.timestamps }
  end
end
