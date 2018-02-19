# == Schema Information
#
# Table name: notifications
#
#  id                :integer          not null, primary key
#  user_id           :integer
#  notified_by_id    :integer
#  notifiable_type   :string
#  notifiable_id     :integer
#  read              :boolean          default(FALSE)
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  notification_type :integer
#

require 'test_helper'

class NotificationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
