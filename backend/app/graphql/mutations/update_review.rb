class Mutations::UpdateReview < Mutations::BaseMutation
  null true
  argument :review_id, ID, required: true, loads: Types::ReviewType
  argument :rating, Float, required: true
  argument :body, String, required: false

  field :review, Types::ReviewType, null: true
  field :errors, [String], null: false

  def resolve(review:, rating:, body:)
    review.update!(rating: rating, body: body)
    return { review: review, errors: [] }
  rescue ActiveRecord::RecordInvalid => e
    raise GraphQL::ExecutionError.new(e.full_messages, extensions: { "code" => "" })
  end

  def ready?(**args)
    if context[:current_user].present?
      super
    elsif context[:current_user].profile == args[:review].profile
      raise GraphQL::ExecutionError.new('レビューを編集する権限がありません', extensions: { "code" => "UNAUTHORIZED" })
    else
      raise GraphQL::ExecutionError.new('ログインしてください', extensions: { "code" => "UNAUTHORIZED" })
    end
  end
end
