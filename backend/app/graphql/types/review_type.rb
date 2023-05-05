# frozen_string_literal: true

module Types
  class ReviewType < Types::BaseObject
    implements GraphQL::Types::Relay::Node
    field :id, ID, null: false
    field :rating, Float, null: false
    field :body, String, null: false
    field :game, Types::GameType, null: false
    field :profile, Types::ProfileType, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
