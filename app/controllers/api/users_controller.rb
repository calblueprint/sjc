class API::UsersController < ApplicationController
  respond_to :json

  def show
    @users = User.all
    render json: @users
  end

	def user_tasks
  	user = User.find(params[:id])
  	tasks = user.tasks
  	render json: tasks
  end

  def user_notifications
  	user = User.find(params[:id])
  	notifications = user.notifications
  	render json: notifications
  end
end
