Rails.application.routes.draw do
  devise_for :users, :controllers => {registrations: 'registrations',
  									   omniauth_callbacks: 'callbacks'}
  	devise_scope :user do
  		get 'login', to: 'devise/sessions#new'
  	end
  	devise_scope :user do
  		get 'signup', to: 'devise/registrations#new'
  	end
  
  resources :lists do
    #resources :items
    resources :list_items
  end

  resources :items
  root to: 'application#welcome'

 

end
