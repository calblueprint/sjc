class CustomDevise::SessionsController < Devise::SessionsController
  before_action :configure_sign_in_params, only: [:create]

  def create
    auth_options = { :recall => 'pages#landing', :scope => :user}
    self.resource = warden.authenticate!(auth_options)
    sign_in(resource_name, resource)
    yield resource if block_given?
    respond_with resource, location: after_sign_in_path_for(resource)
  end
end
