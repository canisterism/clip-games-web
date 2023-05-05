# frozen_string_literal: true

module Types
  class ReviewLikeType < Types::BaseObject
    implements GraphQL::Types::Relay::Node
    field :review, Types::ReviewType, null: false
    field :liker, Types::ProfileType, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    def review
      dataloader.with(Sources::BatchedActiveRecords, Review).load(object.review_id)
    end

    def liker
      dataloader.with(Sources::BatchedActiveRecords, Profile).load(object.profile_id)
    end
  end
end
