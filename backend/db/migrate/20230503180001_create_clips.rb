class CreateClips < ActiveRecord::Migration[7.0]
  def change
    create_table :clips, id: :uuid do |t|
      t.references :game, null: false, type: :string, foreign_key: true
      t.references :profile, null: false, type: :string, foreign_key: true
      t.timestamps
    end
    add_index :clips, %i[game_id profile_id], unique: true
  end
end
