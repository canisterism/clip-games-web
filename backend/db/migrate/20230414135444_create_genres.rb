class CreateGenres < ActiveRecord::Migration[7.0]
  def change
    create_table :genres, id: :string do |t|
      t.string :name
    end
  end
end
