class UsersController < ApplicationController
  before_action :authenticate_user!, except: [:register]

  def dashboard
    @user = current_user
    @clients = Client.all
    @eventTypes = EventType.all
  end

  def notifications
  end

  def register
  end

  def edit
  end
end
