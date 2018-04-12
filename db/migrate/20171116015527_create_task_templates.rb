class CreateTaskTemplates < ActiveRecord::Migration[5.1]
  def change
    create_table :task_templates do |t|
			t.text :description
			t.integer :completion_time
			t.boolean :prior
			t.belongs_to :event_type, index: true
			t.timestamps
    end
  end
end
