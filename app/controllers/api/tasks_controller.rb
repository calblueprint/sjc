class API::TasksController < ApplicationController
  before_action :authenticate_user!
  respond_to :json

  def get_task
    task = Task.find(params[:task_id])
    user = task.users.first.id
    render json: {"task": TaskSerializer.new(task), "user": user}
  end

  def show
    @tasks = Task.where(client_id: params[:client_id])
    render json: @tasks, each_serializer: TaskSerializer
  end

  def destroy
    task = Task.find(params[:id])
    if task.destroy
      render(:json => {:message => 'Task successfully deleted!'}.to_json)
    else
      render(json: client.errors.full_messages, :status => 422)
    end
  end

  def complete
    params.require(:task_id)
    task = Task.find(params[:task_id])
    if task.update_attribute(:completed_status, 1)
      render(:json => {:message => 'Task successfully marked as complete!'}.to_json)
    else
      render(json: task.errors.full_messages, :status => 422)
    end
  end

  def uncomplete
    params.require(:task_id)
    task = Task.find(params[:task_id])
    if task.update_attribute(:completed_status, 0)
      render(:json => {:message => 'Task successfully marked as uncomplete!'}.to_json)
    else
      render(json: task.errors.full_messages, :status => 422)
    end
  end

  def completed
    client = Client.find(params[:client_id])
    tasks = client.tasks.where(:completed_status => 1).order(:updated_at).reverse_order
    render json: tasks
  end

  def uncompleted
    client = Client.find(params[:client_id])
    tasks = client.tasks.where(:completed_status => 0).order(:due_date)
    render json: tasks
  end
end
