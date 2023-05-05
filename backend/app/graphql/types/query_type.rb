module Types
  class QueryType < Types::BaseObject
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :game, Types::GameType, null: false do
      description 'Find a game by ID'
      argument :id, ID, required: true
    end

    def game(id:)
      Game.find(id)
    end

    field :genres, [Types::GenreType], null: false do
      description 'Find all genres'
    end

    def genres
      Genre.all
    end

    field :platforms, [Types::PlatformType], null: false do
      description 'Find all platforms'
    end

    def platforms
      Platform.all
    end

    field :profile, Types::ProfileType, null: false do
      description 'Find a profile by ID'
      argument :id, ID, required: true
    end

    def profile(id:)
      Profile.find(id)
    end

    field :review, Types::ReviewType, null: false do
      description 'Find a review by ID'
      argument :id, ID, required: true
    end

    def review(id:)
      Review.find(id)
    end




  end
end
