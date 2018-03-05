# == Schema Information
#
# Table name: clients
#
#  id               :integer          not null, primary key
#  phone_number     :string
#  country          :string
#  state            :string
#  postal_code      :string
#  city             :string
#  street           :string
#  case_id          :integer
#  first_name       :string
#  last_name        :string
#  stage            :integer          default(1)
#  education        :string
#  client_income    :integer
#  family_income    :integer
#  help             :string
#  court_date       :datetime
#  flee_country     :boolean
#  citizen_spouse   :boolean
#  citizen_child    :boolean
#  victim_crime     :string
#  living_w_parents :boolean
#  initial_intake   :string
#

class Client < ApplicationRecord
    has_many :tasks
    has_many :comments
    has_many :clients
    has_many :cases
end
