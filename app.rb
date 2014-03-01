require 'bundler'
Bundler.require;
require 'sinatra/activerecord'
require 'debugger'

Dir.glob('./lib/*.rb') do |model|
  require model
end

class Inspiration < Sinatra::Application

  configure :development do
    set :database, 'sqlite3:///database.db'
  end

  before do
    headers 'Access-Control-Allow-Origin' => '*', 
            'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST'],
            'Access-Control-Allow-Headers' => 'Content-Type' 
  end

  set :protection, false

  configure :production do
    db = URI.parse(ENV['DATABASE_URL'] || 'postgres:///localhost/mydb')
    ActiveRecord::Base.establish_connection(
      :adapter => db.scheme == 'postgres' ? 'postgresql' : db.scheme,
      :host => db.host,
      :username => db.user,
      :password => db.password,
      :database => db.path[1..-1],
      :encoding => 'utf8'
    )
  end

  # show everything
  get '/' do
    @users = User.all
    @authors = Author.all
    @quotes = Quote.all
    File.read(File.join('public/app', 'index.html'))
  end

  # all quotes
  get '/quotes' do
    @quotes = Quote.all
    @quotes.to_json(:only => [:id, :body],
                    :include => {
                      :author => {
                        :only => [:id, :firstName, :lastName]}})
  end

  # create new quote + author
  post '/quotes' do
    begin
      params.merge! JSON.parse(request.env["rack.input"].read)
    rescue JSON::ParserError
      logger.error "Cannot parse request body."
    end
    @author = Author.find_or_create_by(params[:author]) # find or create by
    @author.quotes.build(:body => params[:body])
    @author.save!
    redirect '/'
  end

  # show specific quote + author
  get '/quotes/:id' do
    @quote = Quote.find(params[:id])
    @author = Author.find(@quote.author_id)
    results = {}
    results["quote"] = @quote
    results["author"] = @author
    results.to_json
  end

  # edit quote and author
  put '/quotes/edit/:id' do
    begin
      params.merge! JSON.parse(request.env["rack.input"].read)
    rescue JSON::ParserError
      logger.error "Cannot parse request body."
    end
    @quote = Quote.find(params[:id])
    @author = Author.find(@quote.author_id)
    if @quote.update(:body => params[:body]) && @author.update(params[:author])
      status 201
      redirect '/'
    else
      status 400
      reload
    end
  end

  # delete
  delete '/quotes/:id' do
    Quote.find(params[:id]).destroy
    redirect '/'
  end

  # all authors
  get '/authors' do
    @authors = Author.all
    @authors.to_json
  end

  # show specific author + quotes
  get '/authors/:id' do
    @author = Author.find(params[:id])
    @quotes = Quote.where(:author_id => @author.id)
    results = {}
    results["author"] = @author
    results["quotes"] = @quotes
    results.to_json
  end

  # edit author
  put '/authors/edit/:id' do
    begin
      params.merge! JSON.parse(request.env["rack.input"].read)
    rescue JSON::ParserError
      logger.error "Cannot parse request body."
    end
    @author = Author.find(params[:id])
    if @author.update(params[:author])
      status 201
      redirect '/'
    else
      status 400
      reload
    end
  end

  # delete an author and all their quotes
  delete '/authors/:id' do
    @author = Author.find(params[:id])
    @quotes = Quote.where(:author_id => @author.id).all
    @quotes.each do |quote|
      quote.destroy
    end
    @author.destroy
    redirect '/'
  end

end