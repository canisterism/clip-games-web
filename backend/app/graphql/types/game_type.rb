# frozen_string_literal: true

module Types
  class GameType < Types::BaseObject
    implements GraphQL::Types::Relay::Node

    # field :id, ID, null: false GraphQL::Types::Relay::Node によって自動的に追加される
    field :title, String, null: false
    field :published_at, GraphQL::Types::ISO8601DateTime
    field :price, Float
    field :image_url, String
    # field :wiki_id, String ユーザー向けには要らない
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :reviews_count, Integer, null: false, description: 'レビュー数'
    field :clips_count, Integer, null: false, description: 'クリップ数'

    field :rating_distribution, GraphQL::Types::JSON, null: false, description: 'レビューの評価分布'
    field :rating_average, Float, null: false, description: 'レビューの平均評価'

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
        total_ratings = reviews.sum(&:rating)
        total_ratings.to_f / reviews.size
      end
    end
  end
end
