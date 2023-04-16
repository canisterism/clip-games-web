class CreateGamesPlatforms < ActiveRecord::Migration[7.0]
  def change
    create_table :games_platforms do |t|
      t.references :game, null: false, type: :string, foreign_key: true
      t.references :platform, null: false, type: :string, foreign_key: true
    end
  end
end
