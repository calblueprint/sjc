class API::UsersController < ApplicationController
  #TODO: Uncomment when finalized what roles access what resources
  #load_and_authorize_resource
  skip_before_action :authenticate_user!, only: :create, :raise => false
  respond_to :json

  def create
    user = User.new(user_params)
    begin
      saved = user.save!
    rescue ActiveRecord::StatementInvalid => invalid
      flash[:error] = "Attorney failed to create";
      return render json: '{"message": "Invalid attorney"}', status => 422
    end
    if saved
      flash[:success] = "Attorney successfully created!";
      render json: '{"message": "Attorney successfully created!"}'
    else
      render json: '{"message": Attorney failed to create"}', status => 422
    end
  end

  def show
    if params[:id]
      @user = User.find(params[:id])
      render json: { user: @user, avatar_url: @user.avatar.url }
    end
  end

  def update
    begin
      result = current_user.update(user_params)
    rescue
      return render json: {error: "Forbidden"}
    end

    if result
      new_user = current_user
      return render json: {message: 'User successfully updated!',
                           user: new_user}
    else
      return render json: {error: current_user.errors.full_messages}
    end
  end

  def index
    users = User.all
    render json: users
  end

  def user_active_tasks
    user = User.find(params[:id])
    tasks = user.tasks.where(:completed_status => 0).order(:due_date)
    render json: tasks
  end

  def user_completed_tasks
    user = User.find(params[:id])
    tasks = user.tasks.where(:completed_status => 1).order(:updated_at).reverse_order
    render json: tasks
  end

  def user_cases
    user = User.find(params[:id])
    cases = user.cases
    render json: cases
  end

  def user_params
    params.require(:user).permit(
      :email,
      :first_name,
      :last_name,
      :password,
      :avatar
    )
  end

  def user_read_notifications
  	user = User.find(params[:id])
  	notifications = user.notifications.where(read: true).order(updated_at: :desc)
  	render json: notifications
  end

  def user_unread_notifications
  	user = User.find(params[:id])
  	notifications = user.notifications.where(read: false).order(updated_at: :desc)
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
