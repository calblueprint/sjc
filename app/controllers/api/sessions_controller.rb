class API::SessionsController < ApplicationController
  respond_to :json
  
  def create
  	@user = User.find_by_email(params[:email])
	  if @user and @user.valid_password? params[:password]
	    sign_in(:user, @user) 
	    render_json_message(:ok, message: 'Successfully signed in!')
	  else
	    render_json_message(:forbidden, errors: 'There has been an error with your request.')
	  end
	end
end
