# frozen_string_literal: true

module Types
  class GenreType < Types::BaseObject
    implements GraphQL::Types::Relay::Node
    field :name, String
    field :games, [Types::GameType], null: false

    def games
      dataloader.with(Sources::BatchedAssociationsByManyToMany, Game, :games_genres, :genre_id,
                      :game_id).load(object.id)
    end
  end
end
