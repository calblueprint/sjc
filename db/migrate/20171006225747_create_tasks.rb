class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :completed_status
      t.text :description

      t.timestamps
    end
  end
end
