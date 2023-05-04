
# frozen_string_literal: true

# ゲームのタイトルを表すモデル
#
# @attr [String] id ID
# @attr [String] title タイトル
# @attr [String] image_url イメージURL
# @attr [Integer] price 価格
# @attr [Date] published_at 発売日
# @attr [String] wiki_id Wiki ID
# @attr [Date] created_at 作成日
# @attr [Date] updated_at 更新日
# @attr [Publisher] publisher 発売元
# @attr [Array<Genre>] genres ジャンル
# @attr [Array<Platform>] platforms プラットフォーム
# @attr [Array<Review>] reviews レビュー
# @attr [Array<Clip>] clips クリップ
class Game < ApplicationRecord
  belongs_to :publisher
  has_many :games_genres
  has_many :genres, through: :games_genres
  has_many :games_platforms
  has_many :platforms, through: :games_platforms
  has_many :reviews, dependent: :destroy
  has_many :clips, dependent: :destroy
  has_many :review_likes, through: :reviews
end
