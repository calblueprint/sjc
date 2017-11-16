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

class Event < ApplicationRecord
end
