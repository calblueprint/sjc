class API::TasksController < ApplicationController
  respond_to :json

  def show
    @tasks = Task.where(client_id: params[:client_id])
    render json: @tasks
  end
  
  def create
    task = Task.new(
        params.require(
            :client_id,
            :description
        )
    )
    begin
      saved = task.save!
    rescue ActiveRecord::StatementInvalid => invalid
      return render_json_message(:forbidden, errors: "Invalid task.")
    end
    if saved
      render_json_message(:ok, message: 'Task successfully created!')
    else
      render_json_message(:forbidden, errors: task.errors.full_messages)
    end
  end

  def destroy
    task = Task.find(params[:id])
    if task.destroy
      render_json_message(:ok, message: 'Task successfully deleted!')
    else
      render_json_message(:forbidden, errors: client.errors.full_messages)
    end
  end

  def assign
    begin
        user = User.find(params[:user_id])
        a = user.tasks << Task.find(params[:task_id])
    rescue
      render_json_message(:forbidden)
      return
    end
    if a
      render_json_message(:ok, message: 'Task successfully updated!')
    else
      render_json_message(:forbidden, errors: user.errors.full_messages)
    end
  end

  def unassign
    begin
        user = User.find(params[:user_id])
        a = user.tasks.delete(Task.find(params[:task_id]))
    rescue
      render_json_message(:forbidden)
      return
    end
    if a
      render_json_message(:ok, message: 'Task successfully updated!')
    else
      render_json_message(:forbidden, errors: user.errors.full_messages)
    end
  end

end
