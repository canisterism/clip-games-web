# frozen_string_literal: true

module Types
  class ClipType < Types::BaseObject
    implements GraphQL::Types::Relay::Node
    field :game, Types::GameType, null: false
    field :profile, Types::ProfileType, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    def game
      dataloader.with(Sources::BatchedActiveRecords, Game).load(object.game_id)
    end

    def profile
      dataloader.with(Sources::BatchedActiveRecords, Profile).load(object.profile_id)
    end
  end
end
