class Quote < ActiveRecord::Base
  validates :body, presence: true

  belongs_to :user
  belongs_to :author

  serialize :preferences, Array
end