Rails.application.routes.draw do

  resources :todos do
    resources :tasks, except: [:index, :show]
  end

  root "todos#index"
  
  # get "home/index"
  
  # # Defines the root path route ("/")
  # root "home#index"
end