# frozen_string_literal: true

module Types
  class PlatformType < Types::BaseObject
    implements GraphQL::Types::Relay::Node
    field :id, ID, null: false
    field :name, String
    field :published_at, GraphQL::Types::ISO8601DateTime
  end
end
