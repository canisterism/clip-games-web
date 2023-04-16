class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games, id: false do |t|
      t.string :title, null: false
      t.datetime :published_at, null: true
      t.decimal :price, null: true
      t.string :image_url, null: true
      t.references :publisher, null: false, type: :uuid, foreign_key: true
      t.string :wiki_id, null: true

      t.timestamps
    end
    add_column :games, :id, :string, default: -> { 'uuid_generate_v4()' }, primary_key: true
  end
end
