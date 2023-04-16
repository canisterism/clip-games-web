class Profile < ApplicationRecord
  belongs_to :user, foreign_key: :id
end
