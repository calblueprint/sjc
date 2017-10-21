class CommentSerializer < ActiveModel::Serializer
  attributes :id,
             :user_id,
             :content,
             :thread_id,
             :client_id

end
