Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users,
  :controllers => { :sessions => "custom_devise/sessions"}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    resources :clients, :only => [:index, :show, :create, :update, :destroy]
    resources :comments, :only => [:show, :create, :update, :destroy]
    resources :tasks, :only => [:show, :create, :destroy]
    resources :cases, :only => [:show, :create]
    resources :users, :only => [:index, :show, :create, :update]
    resources :documents, :only => [:index, :show, :create, :destroy]
    resources :events, :only => [:index, :create]
    resources :sessions, :only => [:create]

    get '/comments/client/:client_id', to: 'comments#client_comments'
    get '/users/:id/activetasks', to: 'users#user_active_tasks'
    get '/users/:id/completedtasks', to: 'users#user_completed_tasks'
    get '/users/:id/cases', to: 'users#user_cases'

    put '/users/:id/updatetasks', to: 'users#update_tasks'
    post '/users/:id/createtask', to: 'users#create_task'

    get '/clients/:id/cases', to: 'clients#client_cases'

    get '/cases/:id/documents', to: 'cases#case_documents'

    put 'tasks/complete', to: 'tasks#complete'
    put 'tasks/uncomplete', to: 'tasks#uncomplete'

    get 'tasks/completed/:client_id', to: 'tasks#completed'
    get 'tasks/uncompleted/:client_id', to: 'tasks#uncompleted'

    put '/users/:id/notifications/:notif_id/read', to: 'users#read_notification'
    put '/users/:id/notifications/read', to: 'users#read_all_notifications'

    get 'tasks/:task_id/get', to: 'tasks#get_task'

    get '/event_types/', to: 'events#index_event_types'
    post '/event_types/', to: 'events#create_event_type'
    post '/event_types/:event_type_id/tasks', to: 'events#create_task_templates'
  end

  authenticated :user do
    root :to => 'users#dashboard', as: :authenticated
  end

  root :to => 'pages#landing'

  get '/users/register', to: 'users#register'
  get '/users/edit_profile', to: 'users#edit_profile'

  get '/clients/new'
  get '/clients/', to: 'clients#all_clients'
  get '/clients/:client_id', to: 'clients#view'
  get '/clients/:client_id/profile', to: 'clients#profile'
  get '/clients/:client_id/edit', to: 'clients#edit'
  get '/clients/:client_id/comments', to: 'clients#client_comments'
  get '/clients/:client_id/stage', to: 'clients#client_stage'
  get '/clients/:client_id/cases/:case_id', to: 'clients#view_case'
  get '/clients/:client_id/tasks', to: 'clients#tasks'
  put '/clients/updatetasks/:current_client', to: 'clients#update_tasks'
  post '/clients/createtask/:current_client', to: 'clients#create_task'
  get '/clients/:client_id/activetasks', to: 'clients#active_tasks'
  get '/clients/:client_id/completedtasks', to: 'clients#completed_tasks'

  get '/cases/new', to: 'cases#new'
  get '/cases/:case_id', to: 'cases#view'

  get '/clients/:client_id/stage', to: 'clients#client_stage'

  get '/events/', to: 'events#all_events'

  get '/notifications/', to:  'users#notifications'
end
