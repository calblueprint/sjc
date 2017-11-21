Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    resources :clients, :only => [:index, :show, :create, :update, :destroy]
    resources :comments, :only => [:show, :create, :update, :destroy]
    resources :tasks, :only => [:show, :create, :destroy]
    resources :users, :only => [:show]

    get '/comments/client/:client_id', to: 'comments#client_comments'
    get '/users/:id/tasks', to: 'users#user_tasks'

    post 'tasks/assign', to: 'tasks#assign'
    post 'tasks/unassign', to: 'tasks#unassign'
  end

  authenticated do
    root :to => 'users#dashboard', as: :authenticated
  end
  root :to => 'pages#landing'

  get '/', to:  'users#view_tasks'
  get '/clients/:client_id/comments', to: 'clients#client_comments'
  get '/clients/:client_id', to: 'clients#view'
  get '/clients/:client_id/stage', to: 'clients#client_stage'
end
