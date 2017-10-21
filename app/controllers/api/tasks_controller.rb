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
    begin
      saved = task.save!
    rescue ActiveRecord::StatementInvalid => invalid
      return render(:json => {:message => "Invalid task."}.to_json)
    end
    if saved
      render(:json => {:message => 'Task successfully created!'}.to_json)
    else
      render(json: task.errors.full_messages)
    end
  end

  def destroy
    task = Task.find(params[:id])
    if task.destroy
      render(:json => {:message => 'Task successfully deleted!'}.to_json)
    else
      render(json: client.errors.full_messages)
    end
  end

  def assign
    begin
        user = User.find(params[:user_id])
        a = user.tasks << Task.find(params[:task_id])
    rescue
      render(:json => {:message => "Invalid assignment."}.to_json)
      return
    end
    if a
      render(:json => {:message => 'Task successfully updated!'}.to_json)
    else
      render(json: user.errors.full_messages)
    end
  end

  def unassign
    begin
        user = User.find(params[:user_id])
        a = user.tasks.delete(Task.find(params[:task_id]))
    rescue
      render(:json => {:message => "Invalid unassign."}.to_json)
      return
    end
    if a
      render(:json => {:message => 'Task successfully updated!'}.to_json)
    else
      render(json: user.errors.full_messages)
    end
  end

end
