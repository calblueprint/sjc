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

require 'test_helper'

class TaskTemplateTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
