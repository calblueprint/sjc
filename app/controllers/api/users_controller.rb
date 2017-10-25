class API::UsersController < ApplicationController
	def user_tasks
  	user = User.find(params[:id])
  	tasks = user.tasks
  	render json: tasks
  end
end