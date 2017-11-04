class API::TasksController < ApplicationController
  respond_to :json

  def show
    @tasks = Task.where(client_id: params[:client_id])
    render json: @tasks
  end
  
  def create
    params.require(:client_id)
    params.require(:description)
    task = Task.new(
        {:client_id => params['client_id'], :description => params['description']}
    )
    saved = task.save!
    if saved
      render(:json => {:message => 'Task successfully created!'}.to_json)
    else
      render(json: task.errors.full_messages, :status => 422)
    end
  end

  def destroy
    task = Task.find(params[:id])
    if task.destroy
      render(:json => {:message => 'Task successfully deleted!'}.to_json)
    else
      render(json: client.errors.full_messages, :status => 422)
    end
  end

  def assign
    user = User.find(params[:user_id])
    task = Task.find(params[:task_id])
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
