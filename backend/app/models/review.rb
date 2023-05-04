# frozen_string_literal: true

# ゲームのレビューを表すモデル
#
# @attr [String] id ID
# @attr [Game] game ゲーム
# @attr [Profile] profile プロフィール
# @attr [String] body 本文
# @attr [Integer] rating 評価
# @attr [Date] created_at 作成日
# @attr [Date] updated_at 更新日
# @attr [Array<ReviewLike>] review_likes いいね
class Review < ApplicationRecord
  belongs_to :game
  belongs_to :profile
  has_many :review_likes, dependent: :destroy
end
