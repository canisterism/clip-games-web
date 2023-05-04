# frozen_string_literal: true

module Types
  class GameType < Types::BaseObject
    implements GraphQL::Types::Relay::Node
    field :title, String, null: false
    field :published_at, GraphQL::Types::ISO8601DateTime
    field :price, Float
    field :image_url, String
    field :publisher_id, Types::UuidType, null: false
    field :wiki_id, String
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :id, ID, null: false
  end
end
