# frozen_string_literal: true

module Types
  class PublisherType < Types::BaseObject
    implements GraphQL::Types::Relay::Node
    field :name, String
    field :games, [Types::GameType], null: false

    def games
      dataloader.with(Sources::BatchedAssociationsByForeignKey, Game, :publisher_id).load(object.id)
    end
  end
end
