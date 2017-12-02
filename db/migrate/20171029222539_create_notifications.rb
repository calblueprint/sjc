class CreateNotifications < ActiveRecord::Migration[5.1]
  def change
    create_table :notifications do |t|
      t.references :user, foreign_key: true
      t.references :notified_by
      t.references :notifiable, polymorphic: true, index: true
      t.integer :type
      t.boolean :read

      t.timestamps
    end
    add_foreign_key :notifications, :users, column: :notified_by_id
  end
end
