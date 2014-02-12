require 'bundler'
Bundler.require;

require 'sinatra/activerecord'
# require './lib/'

class Inspiration < Sinatra::Application
  set :database, "sqlite3:///database.db"

  get '/' do
    haml :index
  end
end