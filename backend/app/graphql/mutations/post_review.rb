class Mutations::PostReview < Mutations::BaseMutation
  null true
  argument :game_id, ID, required: true, loads: Types::GameType
  argument :rating, Float, required: true
  argument :body, String, required: false

  field :review, Types::ReviewType, null: true
  field :errors, [String], null: false

  def resolve(game:, rating:, body:)
    review = Review.new(game: game, rating:, body:, profile: context[:current_user].profile)
    if review.save
      { review: review, errors: [] }
    else
      { review: nil, errors: review.errors.full_messages }
    end
  end

  def ready?(**args)
    if context[:current_user].present?
      super
    else
      raise GraphQL::ExecutionError.new('ログインしてください', extensions: { "code" => "UNAUTHORIZED" })
    end
  end
end
