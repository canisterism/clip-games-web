# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    implements GraphQL::Types::Relay::Node
    field :name, String, null: false
    field :profile, Types::ProfileType, null: false
    field :notification_read_at, GraphQL::Types::ISO8601DateTime, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    # TODO: 実装する
    # def authozied?; end

    def profile
      dataloader.with(Sources::BatchedActiveRecords, Profile).load(object.profile_id)
    end
  end
end
