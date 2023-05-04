class ChangeRatingsColumnTypeInReviews < ActiveRecord::Migration[7.0]
  def change
    change_column :reviews, :rating, :decimal, precision: 5, scale: 1
  end
end
