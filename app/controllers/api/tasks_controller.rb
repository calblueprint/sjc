class API::TasksController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def get_task
    @task = Task.find(params[:task_id])
    @user = @task.users.first.id
    render json: {"task": @task, "user": @user}
  end

  def update
    task_params
    @task = Task.find(params[:task_id])
    @task.update(:client_id => params['client_id'], :description => params['description'], :title => params['title'], :due_date => params['due_date'])
    saved = @task.save!
    if @task.users.first.id != params[:user_id]
      self.unassign(@task.users.first.id, @task.id)
      self.assign(params[:user_id], @task.id)
    else
      render(:json => {:message => 'Task successfully updated!'}.to_json)
    end
  end

  def show
    @tasks = Task.where(client_id: params[:client_id])
    render json: @tasks
  end

  def create
    task_params
    task = Task.new(:client_id => params['client_id'], :description => params['description'], :title => params['title'], :due_date => params['due_date'])
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

  def unassign(user_id, task_id)
    user = User.find(user_id)
    task = Task.find(task_id)
    a = user.tasks.delete(task)
    n = Notification.create(
      notification_type: Notification.types[:task_unassigned],
      user: user,
      notified_by: current_user,
      notifiable: task,
    )
  end

  def task_params
    params.require(:client_id)
    params.require(:description)
    params.require(:due_date)
    params.require(:title)
    params.require(:user_id)
  end
end
