# == Schema Information
#
# Table name: task_templates
#
#  id              :integer          not null, primary key
#  description     :text
#  completion_time :integer
#  prior           :boolean
#  event_type_id   :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class TaskTemplate < ApplicationRecord
	belongs_to :event_type
end
