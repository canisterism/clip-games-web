# frozen_string_literal: true

module Types
  class GameType < Types::BaseObject
    implements GraphQL::Types::Relay::Node
    field :id, ID, null: false
    field :title, String, null: false
    field :published_at, GraphQL::Types::ISO8601DateTime
    field :price, Float
    field :image_url, String
    # field :wiki_id, String ユーザー向けには要らない
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :reviews_count, Integer, null: false
    field :clips_count, Integer, null: false

    field :reviews, [Types::ReviewType], null: false
    field :clips, [Types::ClipType], null: false
    field :platforms, [Types::PlatformType], null: false
    field :genres, [Types::GenreType], null: false
    field :publisher, Types::PublisherType, null: false

    def reviews_count
      object.reviews.count
    end

    def clips_count
      object.clips.count
    end
  end
end
