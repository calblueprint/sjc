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

class NotificationSerializer < ActiveModel::Serializer
  attributes :id,
             :read,
             :created_at,
             :notification_type,
             :notifiable_type

 	has_one :user
 	has_one :notified_by
 	has_one :notifiable

end
