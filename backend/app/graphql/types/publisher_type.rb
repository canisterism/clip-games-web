# frozen_string_literal: true

module Types
  class PublisherType < Types::BaseObject
    implements GraphQL::Types::Relay::Node
    field :id, ID, null: false
    field :name, String
  end
end
