class API::UsersController < ApplicationController
  skip_before_action :authenticate_user!, only: :create, :raise => false
  respond_to :json

  def create
    user = User.new(user_params)
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
    if params[:id]
      @user = User.find(params[:id])
      render json: @user
    end
  end

  def index
    users = User.all
    render json: users
  end

  def user_tasks
    user = User.find(params[:id])
    tasks = user.tasks
    render json: tasks
  end

  def user_cases
    user = User.find(params[:id])
    cases = user.cases
    render json: cases
  end

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :password, :avatar)
  end

  def user_notifications
  	user = User.find(params[:id])
  	notifications = user.notifications
  	render json: notifications
  end

  def read_notification
    updated = Notification.find(params[:notif_id]).update({read: true})

    if updated
      render json: {message: 'success'}
    else
      render json: {message: 'fail'}
    end
  end

  def read_all_notifications
    Notification.where(id: params[:notification_ids]).update_all({read: true})
    render json: {message: 'Notifications read'}
  end
end
