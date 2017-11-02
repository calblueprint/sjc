Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    resources :clients, :only => [:index, :show, :create, :update, :destroy]
    resources :comments, :only => [:show, :create, :update, :destroy]
    get '/users/:id/tasks', to: 'users#user_tasks'
  end
  authenticated do
	  root :to => 'users#dashboard', as: :authenticated
	end
	root :to => 'pages#landing'

  get '/clients/:client_id/comments', to: 'clients#client_comments'
  get '/', to:  'users#view_tasks'
end
