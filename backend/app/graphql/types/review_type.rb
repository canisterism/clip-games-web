# frozen_string_literal: true

module Types
  class ReviewType < Types::BaseObject
    implements GraphQL::Types::Relay::Node
    field :id, ID, null: false
    field :rating, Float, null: false
    field :body, String, null: false
    field :game, Types::GameType, null: false
    field :profile, Types::ProfileType, null: false
    field :like_count, Integer, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    def game
      dataloader.with(Sources::BatchedActiveRecords, Game).load(object.game_id)
    end

    def profile
      dataloader.with(Sources::BatchedActiveRecords, Profile).load(object.profile_id)
    end

    def like_count
      dataloader.with(Sources::BatchedAssociationsByForeignKey, Like, :review_id).load(object.id).then(&:count)
    end
  end
end
