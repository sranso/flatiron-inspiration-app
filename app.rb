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
    # haml :index
    File.read(File.join('public/app', 'index.html'))
  end

  # all quotes
  get '/quotes' do
    @quotes = Quote.all
    # haml :quotes
    @quotes.to_json(:only => [:id, :body],
                    :include => {
                      :author => {
                        :only => [:id, :firstName, :lastName]}})
  end

  # add new quote + author
  get '/quotes/new' do
    @author = Author.new
    @quote = Quote.new
    haml :new
  end

  # create new quote + author
  post '/quotes' do
    @quote = Quote.create(:body => params[:body])
    @author = Author.create(params[:author])
    redirect '/'
    # @quote = Quote.create(params["quote"])
    # @author = Author.create(params["author"])
    # @quote.update_attributes("author_id" => @author.id)
    # if @quote.save && @author.save
    #   status 201
    #   redirect '/quotes/' + @quote.id.to_s
    # else
    #   status 400
    #   haml :new
    # end
  end

  # show specific quote + author
  get '/quotes/:id' do
    @quote = Quote.find(params[:id])
    @author = Author.find(@quote.author_id)
    # haml :show_quote
    results = {}
    results["quote"] = @quote
    results["author"] = @author
    results.to_json
  end

  # edit quote + author
  get '/quotes/edit/:id' do
    @quote = Quote.find(params[:id])
    @author = Author.find(@quote.author_id)
    haml :edit_quote
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
      haml :edit_quote
    end
  end

  # delete quote confirmation
  get '/quotes/delete/:id' do
    @quote = Quote.find(params[:id])
    @author = Author.find(@quote.author_id)
    haml :delete
  end

  delete '/quotes/:id' do
    Quote.find(params[:id]).destroy
    redirect '/quotes'
  end

  # all authors
  get '/authors' do
    @authors = Author.all
    # haml :authors
    @authors.to_json
  end

  # show specific author + quotes
  get '/authors/:id' do
    @author = Author.find(params[:id])
    @quotes = Quote.where(:author_id => @author.id)
    haml :show_author
  end

  # edit specific author
  get '/authors/edit/:id' do
    @author = Author.find(params[:id])
    haml :edit_author
  end
end

# TO DO
# 1. pre-populate the edit form
# 2. make quote input box bigger
# 3. allow user to style their quote (what color should this quote have, font, etc)
# 4. add angular so you can easily filter