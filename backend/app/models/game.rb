class Game < ApplicationRecord
  belongs_to :publisher
  has_many :games_genres
  has_many :genres, through: :games_genres
  has_many :games_platforms
  has_many :platforms, through: :games_platforms
end
