# == Schema Information
#
# Table name: clients
#
#  id           :integer          not null, primary key
#  name         :string
#  phone_number :string
#  country      :string
#  state        :string
#  postal_code  :string
#  city         :string
#  street       :string
#  case_id      :integer
#

class Client < ApplicationRecord
	has_many :tasks
  has_many :comments
end
