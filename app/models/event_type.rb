# == Schema Information
#
# Table name: event_types
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class EventType < ApplicationRecord
	has_many :task_templates
end
