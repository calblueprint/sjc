# == Schema Information
#
# Table name: events
#
#  id            :integer          not null, primary key
#  name          :string
#  location      :string
#  start_time    :datetime
#  end_time      :datetime
#  user_id       :integer
#  event_type_id :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'test_helper'

class EventTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
