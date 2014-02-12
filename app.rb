require 'bundler'
Bundler.require;

require 'sinatra/activerecord'
Dir.glob('./lib/*.rb') do |model|
  require model
end

class Inspiration < Sinatra::Application
  set :database, "sqlite3:///database.db"

  get '/' do
    @users = User.all
    @authors = Author.all
    @quotes = Quote.all
    haml :index
  end

  # add new quote + author
  get '/quotes/new' do
    @author = Author.new
    @quote = Quote.new
    haml :new
  end

  post '/quotes' do
    @quote = Quote.create(params["quote"])
    @author = Author.create(params["author"])
    @quote.update_attributes("author_id" => @author.id)
    if @quote.save
      status 201
      redirect '/quotes/' + @quote.id.to_s
    else
      status 400
      haml :new
    end
  end

  get '/quotes/:id' do
    @quote = Quote.find(params[:id])
    @author = Author.find(@quote.author_id)
    haml :show
  end
end