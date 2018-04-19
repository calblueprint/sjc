class UsersController < ApplicationController
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
