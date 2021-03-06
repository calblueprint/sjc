require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Sjc
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    # Enable React addons
    config.react.addons = true

    # Enable experimental features for Babel
    config.react.jsx_transform_options = {
      stage: 0
    }
    #add missing middleware
    config.middleware.use Rack::MethodOverride

    Paperclip::Attachment.default_options[:s3_host_name] = "s3-us-west-1.amazonaws.com"

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
  end
end
