class Genre < ApplicationRecord
  has_many :games_genres
  has_many :games, through: :games_genres
end
