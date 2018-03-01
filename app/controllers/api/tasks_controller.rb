class API::TasksController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def show
    @tasks = Task.where(client_id: params[:client_id])
    render json: @tasks
  end

  def create
    params.require(:client_id)
    params.require(:description)
    params.require(:user_id)
    params.require(:title)
    params.require(:due_date)
    task = Task.new(
        {:client_id => params['client_id'], :description => params['description'], :title => params['title'], :due_date => params['due_date']}
    )
    saved = task.save!
    self.assign(params[:user_id], task.id)
  end

  def destroy
    task = Task.find(params[:id])
    if task.destroy
      render(:json => {:message => 'Task successfully deleted!'}.to_json)
    else
      render(json: client.errors.full_messages, :status => 422)
    end
  end

  def assign(user_id, task_id)
    puts "sad"
    user = User.find(user_id)
    task = Task.find(task_id)
    a = user.tasks << task
    if a
      n = Notification.create(
        notification_type: Notification.types[:task_assigned],
        user: user,
        notified_by: current_user,
        notifiable: task,
      )
      render(:json => {:message => 'Task successfully updated!'}.to_json)
    else
      render(json: user.errors.full_messages, :status => 422)
    end
  end

  def unassign
    user = User.find(params[:user_id])
    task = Task.find(params[:task_id])
    a = user.tasks.delete(task)
    if a
      n = Notification.create(
        notification_type: Notification.types[:task_unassigned],
        user: user,
        notified_by: current_user,
        notifiable: task,
      )
      render(:json => {:message => 'Task successfully updated!'}.to_json)
    else
      render(json: user.errors.full_messages, :status => 422)
    end
  end

end
