class API::UsersController < ApplicationController
  respond_to :json

  def show
    @users = User.all
    render json: @users
  end

end
