class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews, id: :uuid do |t|
      t.integer :rating, null: false
      t.text :body, null: false, default: ''
      t.references :game, null: false, type: :string, foreign_key: true
      t.references :profile, null: false, type: :string, foreign_key: true
      t.timestamps
    end
    add_index :reviews, %i[game_id profile_id], unique: true
  end
end
