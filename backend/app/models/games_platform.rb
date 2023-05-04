class GamesPlatform < ApplicationRecord
  belongs_to :game
  belongs_to :platform
end
