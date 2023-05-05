# frozen_string_literal: true

module Types
  class ReviewLikeType < Types::BaseObject
    implements GraphQL::Types::Relay::Node
    field :id, ID, null: false
    field :review, Types::ReviewType, null: false
    field :liker, Types::ProfileType, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
