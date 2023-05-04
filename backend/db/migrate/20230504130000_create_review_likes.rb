class CreateReviewLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :review_likes, id: :uuid do |t|
      t.references :review, null: false, type: :uuid, foreign_key: true
      t.string :liker_id, index: true, null: false

      t.timestamps
    end
    add_foreign_key :review_likes, :profiles, column: :liker_id, primary_key: :id, on_delete: :cascade
  end
end
