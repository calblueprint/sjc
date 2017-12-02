class AddDetailsToComments < ActiveRecord::Migration[5.1]
  def change
  	add_column :comments, :details, :string
  end
end
