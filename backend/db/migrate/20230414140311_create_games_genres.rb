class CreateGamesGenres < ActiveRecord::Migration[7.0]
  def change
    create_table :games_genres do |t|
      t.references :game, null: false, type: :string, foreign_key: true
      t.references :genre, null: false, type: :string, foreign_key: true
    end
  end
end
