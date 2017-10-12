class AddClientReferenceToTasks < ActiveRecord::Migration[5.1]
  def change
  	add_reference :tasks, :client, foreign_key: true
  end
end
