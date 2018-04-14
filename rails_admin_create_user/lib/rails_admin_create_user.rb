require "rails_admin_create_user/engine"

module RailsAdminCreateUser
  # Your code goes here...
end

require 'rails_admin/config/actions'

module RailsAdmin
  module Config
    module Actions
      class CreateUser < Base
        RailsAdmin::Config::Actions.register(self)
        # This ensures the action only shows up for Users
        register_instance_option :visible do
          bindings[:abstract_model].model == User
        end
        register_instance_option :link_icon do
          'icon-plus'
        end
        register_instance_option :collection? do
          true
        end
        register_instance_option :controller do
          proc do
            if current_user.admin?
              redirect_to '/users/register'
            end
          end
        end
      end
    end
  end
end
