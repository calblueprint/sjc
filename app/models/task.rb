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

class Task < ApplicationRecord
	enum completed_status: [ :active, :archived ]
	has_and_belongs_to_many :users
	belongs_to :client

	def self.update(params)
    self.task_params(params)
    task = Task.find(params[:task_id])
    task.update(:client_id => params['client_id'], :description => params['description'], :title => params['title'], :due_date => params['due_date'])
    saved = task.save!
    if task.users.first.id != params[:user_id]
      self.unassign(task.users.first.id, task.id, params[:current_user_id])
      self.assign(params[:user_id], task.id, params[:current_user_id])
    end
    task
  end

	def self.create(params)
		self.task_params(params)
		task = Task.new(:client_id => params['client_id'], :description => params['description'], :title => params['title'], :due_date => params['due_date'])
    saved = task.save!
    self.assign(params[:user_id], task.id, params[:current_user_id])
		task
	end

	def self.assign(user_id, task_id, current_user_id)
    user = User.find(user_id)
    task = Task.find(task_id)
		current_user = User.find(current_user_id)
    a = user.tasks << task
    n = Notification.create(
      notification_type: Notification.types[:task_assigned],
      user: user,
      notified_by: current_user,
      notifiable: task,
    )
  end

  def self.unassign(user_id, task_id, current_user_id)
    user = User.find(user_id)
    task = Task.find(task_id)
		current_user = User.find(current_user_id)
    a = user.tasks.delete(task)
    n = Notification.create(
      notification_type: Notification.types[:task_unassigned],
      user: user,
      notified_by: current_user,
      notifiable: task,
    )
  end

	def self.task_params(params)
    params.require(:client_id)
    params.require(:description)
    params.require(:due_date)
    params.require(:title)
    params.require(:user_id)
    params.require(:current_user_id)
  end
end
