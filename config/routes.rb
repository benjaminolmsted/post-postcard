Rails.application.routes.draw do
  
  resources :carts 
  resources :postcards

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  get '/usercart/:id', to: 'users#user_cart'

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/presign', to: 's3_uploads#set_s3_direct_post'

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
