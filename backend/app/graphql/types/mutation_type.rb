module Types
  class MutationType < Types::BaseObject
    field :post_review, mutation: Mutations::PostReview
    field :update_review, mutation: Mutations::UpdateReview
    field :delete_review, mutation: Mutations::DeleteReview
  end
end
