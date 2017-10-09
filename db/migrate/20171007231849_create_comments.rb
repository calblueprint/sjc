class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.bigint :user_id
      t.text :content
      t.bigint :thread_id
      t.bigint :client_id
    end
  end
end
