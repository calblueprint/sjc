class Notification < ApplicationRecord
  belongs_to :user
  belongs_to :notified_by, :foreign_key => "notified_by_id", :class_name => 'User'
  belongs_to :notifiable, polymorphic: true
end
