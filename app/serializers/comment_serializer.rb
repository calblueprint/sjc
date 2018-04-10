# == Schema Information
#
# Table name: comments
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  content    :text
#  thread_id  :integer
#  client_id  :integer
#  created_at :string           not null
#  updated_at :datetime         not null
#  user_name  :string
#  details    :string
#

class CommentSerializer < ActiveModel::Serializer
  attributes :id,
             :user_id,
             :content,
             :thread_id,
             :client_id
end
