# == Schema Information
#
# Table name: tasks
#
#  id               :integer          not null, primary key
#  completed_status :string
#  description      :text
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Task < ApplicationRecord
	enum completed_status: [ :active, :archived ]
	has_and_belongs_to_many :users
	belongs_to :client
end
