class API::TasksController < ApplicationController
  respond_to :json

  def user_tasks
    user = User.find(params[:user_id])
    @tasks = user.tasks
    render json: @tasks
  end

end
