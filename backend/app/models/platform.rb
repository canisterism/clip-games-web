class Platform < ApplicationRecord
  has_many :games_platforms
  has_many :games, through: :games_platforms
end
