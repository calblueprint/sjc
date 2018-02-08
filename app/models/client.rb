# == Schema Information
#
# Table name: clients
#
#  id              :integer          not null, primary key
#  phone_number    :string
#  country         :string
#  state           :string
#  postal_code     :string
#  city            :string
#  street          :string
#  case_id         :integer
#  first_name      :string
#  last_name       :string
#  stage           :integer          default(1)
#  education       :string
#  clientIncome    :integer
#  familyIncome    :integer
#  help            :string
#  courtDate       :datetime
#  fleeCountry     :boolean
#  citizenSpouse   :boolean
#  citizenChild    :boolean
#  victimCrime     :boolean
#  livingWParents  :boolean
#  initialIntake   :string
#

class Client < ApplicationRecord
    has_many :tasks
    has_many :comments
end
