# == Schema Information
#
# Table name: tasks
#
#  id               :integer          not null, primary key
#  completed_status :integer          default("active")
#  description      :text
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  client_id        :integer
#  title            :string
#  due_date         :datetime
#

class TaskSerializer < ActiveModel::Serializer
  attributes :id,
             :title,
             :description,
             :completed_status,
             :due_date,
             :client_name,
             :client_id,
             :created_at

  def client_name
    "#{object.client.first_name} #{object.client.last_name}"
  end

  def client_id
    object.client.id
  end
end
