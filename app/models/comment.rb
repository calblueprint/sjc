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

class Comment < ApplicationRecord
	belongs_to :user
  belongs_to :client
end
