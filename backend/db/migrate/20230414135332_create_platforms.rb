class CreatePlatforms < ActiveRecord::Migration[7.0]
  def change
    create_table :platforms, id: :string do |t|
      t.string :name
      t.datetime :published_at
    end
  end
end
