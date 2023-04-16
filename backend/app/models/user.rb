class User < ApplicationRecord
  has_one :profile, dependent: :destroy, foreign_key: :id
end
