class CreatePublishers < ActiveRecord::Migration[7.0]
  def change
    create_table :publishers, id: :uuid do |t|
      t.string :name
    end
  end
end
