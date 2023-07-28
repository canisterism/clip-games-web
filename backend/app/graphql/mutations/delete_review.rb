class Mutations::DeleteReview < Mutations::BaseMutation
  null true
  argument :review_id, ID, required: true, loads: Types::ReviewType

  field :review, Types::ReviewType, null: true
  field :errors, [String], null: false

  def resolve(review:)
    review.destroy!
    return { review: review, errors: [] }
  rescue ActiveRecord::RecordInvalid => e
    raise GraphQL::ExecutionError.new(e.full_messages, extensions: { "code" => ""})
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
