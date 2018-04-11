class UsersController < ApplicationController
  def dashboard
    @user = current_user
  end

  def notifications
  end

  def register
  end

  def edit_profile
  end
end
