# frozen_string_literal: true

module Types
  class GenreType < Types::BaseObject
    implements GraphQL::Types::Relay::Node
    field :id, ID, null: false
    field :name, String
    field :games, [Types::GameType], null: false
  end
end
