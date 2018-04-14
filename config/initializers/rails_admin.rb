require Rails.root.join('rails_admin_create_user', 'lib', 'rails_admin_create_user.rb').to_s
RailsAdmin::Config::Actions.register(RailsAdmin::Config::Actions::CreateUser)
RailsAdmin.config do |config|
  ENV['RAILS_ADMIN_THEME'] = 'blueprint'
  config.main_app_name = ["SJC", "Admin Dashboard"]
  config.authorize_with do
    redirect_to main_app.root_path unless current_user.admin?
  end

  config.model Client do
    edit do
      field :phone_number
      field :country
      field :state
      field :postal_code
      field :city
      field :street
      field :case_id
      field :first_name
      field :last_name
      field :stage
      field :education
      field :client_income
      field :family_income
      field :help
      field :court_date
      field :flee_country
      field :citizen_spouse
      field :citizen_child
      field :victim_crime
      field :living_w_parents
      field :initial_intake
      # e.g. include_all_fields
      # exclude_fields :website
    end
  end

  config.model 'Notification' do
    create do
      include_all_fields
      field :notifiable_id, :enum do
        enum do
          # ActiveRecord querys
          Task.all.map { |c| [ c.to_json ] }
        end
      end
    end
    edit do
      configure :notifiable_id do
        visible true
      end
    end
    list do
      configure :notifiable_id do
        visible true
      end
    end
  end

  ### Popular gems integration

  ## == Devise ==
  # config.authenticate_with do
  #   warden.authenticate! scope: :user
  # end
  # config.current_user_method(&:current_user)

  ## == Cancan ==
  #config.authorize_with :cancan

  ## == Pundit ==
  # config.authorize_with :pundit

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  ## == Gravatar integration ==
  ## To disable Gravatar integration in Navigation Bar set to false
  # config.show_gravatar = true

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new do
      except ['User']
    end
    create_user
    export
    bulk_delete
    show
    edit
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end
end
