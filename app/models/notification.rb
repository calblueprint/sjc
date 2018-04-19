# == Schema Information
#
# Table name: notifications
#
#  id                :integer          not null, primary key
#  user_id           :integer
#  notified_by_id    :integer
#  notifiable_type   :string
#  notifiable_id     :integer
#  read              :boolean          default(FALSE)
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  notification_type :integer
#

class Notification < ApplicationRecord
  belongs_to :user
  belongs_to :notified_by, :foreign_key => "notified_by_id", :class_name => 'User'
  belongs_to :notifiable, polymorphic: true
  has_many :join_notifs_comments
  enum types: { task_assigned: 0, task_unassigned: 1, comment: 2, mentioned: 3 }
end
