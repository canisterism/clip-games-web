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
    # review.ratingの分布を返す
    field :rating_distribution, GraphQL::Types::JSON, null: false
    field :rating_average, Float, null: false

    field :reviews, [Types::ReviewType], null: false
    field :clips, [Types::ClipType], null: false
    field :platforms, [Types::PlatformType], null: false
    field :genres, [Types::GenreType], null: false
    field :publisher, Types::PublisherType, null: false

    def reviews
      dataloader.with(Sources::BatchedAssociationsByForeignKey, Review, :game_id).load(object.id)
    end

    def clips
      dataloader.with(Sources::BatchedAssociationsByForeignKey, Clip, :game_id).load(object.id)
    end

    def platforms
      dataloader.with(Sources::BatchedAssociationsByManyToMany, Platform, :games_platforms, :game_id, :platform_id).load(object.id)
    end

    def genres
      dataloader.with(Sources::BatchedAssociationsByManyToMany, Genre, :games_genres, :game_id, :genre_id).load(object.id)
    end

    def publisher
      dataloader.with(Sources::BatchedActiveRecords, Publisher).load(object.publisher_id)
    end

    def reviews_count
      dataloader.with(Sources::BatchedAssociationsByForeignKey, Review, :game_id).load(object.id).then(&:count)
    end

    def clips_count
      dataloader.with(Sources::BatchedAssociationsByForeignKey, Clip, :game_id).load(object.id).then(&:count)
    end

    def rating_distribution
      dataloader.with(Sources::BatchedAssociationsByForeignKey, Review, :game_id).load(object.id).then do |reviews|
        reviews.group_by(&:rating).transform_values(&:count)
      end
    end

    def rating_average
      dataloader.with(Sources::BatchedAssociationsByForeignKey, Review, :game_id).load(object.id).then do |reviews|
        reviews.average(&:rating)
      end
    end
  end
end
