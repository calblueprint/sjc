Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    resources :clients, :only => [:show, :create, :update, :destroy]
    resources :tasks, :only => [:show, :create, :destroy]

    put 'tasks/assign', to: 'tasks#assign'
    put 'tasks/unassign', to: 'tasks#unassign'
  end

  get '/', to:  'users#view_tasks'
  get '/client', to: 'clients#view'
end
