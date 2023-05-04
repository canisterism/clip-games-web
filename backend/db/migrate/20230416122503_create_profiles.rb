class CreateProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :profiles, id: false do |t|
      t.string :id, null: false, primary_key: true
      t.string :description, null: false, default: ''
      t.string :display_name, null: false
      t.string :photo_url, null: false
      t.timestamps
    end
  end
end
