# frozen_string_literal: true

module Types
  class ProfileType < Types::BaseObject
    implements GraphQL::Types::Relay::Node
    field :id, ID, null: false
    field :description, String, null: false
    field :display_name, String, null: false
    field :photo_url, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :reviews, [Types::ReviewType], null: false
    field :clips, [Types::ClipType], null: false
    field :review_likes, [Types::ReviewLikeType], null: false
  end
end
