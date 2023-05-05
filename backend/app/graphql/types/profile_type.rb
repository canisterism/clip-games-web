# frozen_string_literal: true

module Types
  class ProfileType < Types::BaseObject
    implements GraphQL::Types::Relay::Node
    field :description, String, null: false
    field :display_name, String, null: false
    field :photo_url, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :reviews, [Types::ReviewType], null: false
    field :clips, [Types::ClipType], null: false
    field :review_likes, [Types::ReviewLikeType], null: false

    def reviews
      dataloader.with(Sources::BatchedAssociationsByForeignKey, Review, :profile_id).load(object.id)
    end

    def clips
      dataloader.with(Sources::BatchedAssociationsByForeignKey, Clip, :profile_id).load(object.id)
    end

    def review_likes
      dataloader.with(Sources::BatchedAssociationsByForeignKey, ReviewLike, :profile_id).load(object.id)
    end

    # fidle :reviewed_games, [Types::GameType], null: false
    # def reviewed_games
    #   dataloader.with(Sources::BatchedAssociationsByManyToMany, Game, :reviews, :profile_id, :game_id).load(object.id)
    # end

    # field :clipped_games, [Types::GameType], null: false
    # def clipped_games
    #   dataloader.with(Sources::BatchedAssociationsByManyToMany, Game, :clips, :profile_id, :game_id).load(object.id)
    # end
  end
end
