Rails.application.routes.draw do

  resources :todos do
    member do
      patch :mark_as_completed
    end
    resources :tasks, except: [:new, :edit]do     
      patch :toggle_completed, on: :member
    end
  end

  root "home#index"
end