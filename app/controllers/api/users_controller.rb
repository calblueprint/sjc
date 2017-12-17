class API::UsersController < ApplicationController
  respond_to :json

  def create
    user = User.new(user_params)
    puts user
    begin
      saved = user.save!
    rescue ActiveRecord::StatementInvalid => invalid
      return render json: '{"message": "Invalid attorney"}', status => 422
    end
    if saved
      render json: '{"message": "Attorney successfully created!"}'
    else
      render json: '{"message": Attoney failed to create"}', status => 422
    end
  end

  def show
    @users = User.all
    render json: @users
  end

  def user_tasks
    user = User.find(params[:id])
    tasks = user.tasks
    render json: tasks
  end

  def user_params
    params.permit(
      :id,
      :email,
      :password,
      :first_name,
      :last_name,
      :avatar
    )
  end

  def user_notifications
  	user = User.find(params[:id])
  	notifications = user.notifications
  	render json: notifications
  end

  def read_notifications
    Notification.where(id: params[:notification_ids]).update_all({read: true})
    render json: {message: 'Notifications read'}
  end
end
