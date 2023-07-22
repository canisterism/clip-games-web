module Types
  class QueryType < Types::BaseObject
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :me, Types::ProfileType, null: true do
      description 'Find the current user'
    end

    def me
      Profile.find_by(user: context[:current_user])
    end

    field :game, Types::GameType, null: false do
      description 'Find a game by ID'
      argument :id, ID, required: true
    end

    def game(id:)
      GlobalID::Locator.locate(id)
    end


    field :games, Types::GameType.connection_type, null: false do
      description 'Fetch all games'
    end

    def games
      Game.all
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

    field :reviews, Types::ReviewType.connection_type, null: false do
      description 'Fetch all reviews. filtered by game or profile'
      argument :game_id, ID, required: false
      argument :profile_id, ID, required: false
    end

    def reviews(game_id: nil, profile_id: nil)
      if game_id
        Review.where(game: GlobalID::Locator.locate(game_id))
      elsif profile_id
        Review.where(profile: GlobalID::Locator.locate(profile_id))
      else
        Review.all
      end
    end

  end
end
