Rails.application.routes.draw do

  resources :todos do
    resources :tasks, except: [:new, :edit]do     
      patch 'mark_as_complete', on: :member
  end

  end

  root "todos#index"
  
  # get "home/index"
  
  # # Defines the root path route ("/")
  # root "home#index"
end