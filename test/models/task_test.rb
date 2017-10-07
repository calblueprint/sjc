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

require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
