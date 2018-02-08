class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :get_current_user
  respond_to :html, :json

  def render_json_message(status, options = {})
    render json: {
      data: options[:data],
      message: options[:message],
      to: options[:to],
      errors: options[:errors]
    }, status: status
  end

	def get_current_user
	   @user = current_user
	end

  # If user not logged in, redirect requests to landing page
  rescue_from CanCan::AccessDenied do
    redirect_to root_path
  end
end
