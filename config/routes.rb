Rails.application.routes.draw do
  get "home/index"
  
  # Defines the root path route ("/")
  root "home#index"
end