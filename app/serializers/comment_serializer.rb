# == Schema Information
#
# Table name: comments
#
#  id        :integer          not null, primary key
#  user_id   :integer
#  content   :text
#  thread_id :integer
#  client_id :integer
#

class CommentSerializer < ActiveModel::Serializer
  attributes :id,
             :user_id,
             :content,
             :thread_id,
             :client_id

end
