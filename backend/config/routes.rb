Rails.application.routes.draw do
  post '/graphql', to: 'graphql#execute'
  mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql' # if Rails.env.development?

  # health check returns ok if the server is up
  get '/health', to: proc { [200, {}, ['ok']] }

end
