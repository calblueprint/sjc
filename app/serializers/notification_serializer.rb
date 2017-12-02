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
