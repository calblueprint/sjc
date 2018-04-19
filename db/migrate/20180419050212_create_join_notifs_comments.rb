class CreateJoinNotifsComments < ActiveRecord::Migration[5.1]
  def change
    create_table :join_notifs_comments do |t|
      t.references :notification, foreign_key: true
      t.references :comment, foreign_key: true

      t.timestamps
    end
  end
end
