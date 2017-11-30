class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  respond_to :html, :json
  
  def render_json_message(status, options = {})
    render json: {
      data: options[:data],
      message: options[:message],
      to: options[:to],
      errors: options[:errors]
    }, status: status
  end
end
