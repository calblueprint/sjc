class AddTitleToTaskTemplates < ActiveRecord::Migration[5.1]
  def change
    add_column :task_templates, :title, :string
  end
end
