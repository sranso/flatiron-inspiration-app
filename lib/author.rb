class Author < ActiveRecord::Base
  validates :lastName, presence: true

  has_many :quotes
end