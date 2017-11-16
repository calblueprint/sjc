class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
    	t.string :name
    	t.string :location
    	t.datetime :start_time
    	t.datetime :end_time
    	t.belongs_to :user, index: true
    	t.belongs_to :event_type
    	
      t.timestamps
    end
  end
end
