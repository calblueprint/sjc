class ApplicationController < ActionController::Base
  include CanCan::ControllerAdditions
  protect_from_forgery with: :exception
  before_action :get_current_user
  respond_to :html, :json
  helper_method :toast

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

  #cancan
  def current_ability
    @current_ability ||= ::Abilities::Ability.new(current_user)
  end

  protected
  def authenticate_user!
    if user_signed_in?
      super
    else
      redirect_to '/', :notice => 'Please login first.'
      ## if you want render 404 page
      ## render :file => File.join(Rails.root, 'public/404'), :formats => [:html], :status => 404, :layout => false
    end
  end

  # If user not logged in, redirect requests to landing page
  rescue_from CanCan::AccessDenied do
    redirect_to root_path
  end

  def toast
    toast = {}
    flash.each do |type, message|
      if type == "alert" or type == "error"
        toast[:error] = message
        flash.discard(:error)
      else
        toast[:success] = message
        flash.discard(:success)
      end
    end
    toast
  end

end
