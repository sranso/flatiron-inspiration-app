require 'bundler'
Bundler.require;

require 'sinatra/activerecord'
Dir.glob('./lib/*.rb') do |model|
  require model
end

class Inspiration < Sinatra::Application
  set :database, "sqlite3:///database.db"

  # show everything
  get '/' do
    @users = User.all
    @authors = Author.all
    @quotes = Quote.all
    haml :index
  end

  # all quotes
  get '/quotes' do
    @quotes = Quote.all
    haml :quotes
  end

  # add new quote + author
  get '/quotes/new' do
    @author = Author.new
    @quote = Quote.new
    haml :new
  end

  # create new quote + author
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

  # show specific quote
  get '/quotes/:id' do
    @quote = Quote.find(params[:id])
    @author = Author.find(@quote.author_id)
    haml :show
  end

  # edit quote + author
  get '/quotes/edit/:id' do
    @quote = Quote.find(params[:id])
    @author = Author.find(@quote.author_id)
    haml :edit
  end

  # update quote + author
  put 'quotes/edit/:id' do
    @quote = Quote.find(params[:id])
    @author = Author.find(@quote.author_id)
    if @quote.update(params["quote"]) && @author.update(params["author"])
      status 201
      redirect '/quotes/' + params[:id]
    else
      status 400
      haml :edit
    end
  end

  # delete quote
  get '/quotes/delete/:id' do
    @quote = Quote.find(params[:id])
    haml :delete
  end
end

# TO DO
# 1. pre-populate the edit form
# 2. make quote input box bigger
# 3. allow user to style their quote (what color should this quote have, font, etc)
# 4. add angular so you can easily filter