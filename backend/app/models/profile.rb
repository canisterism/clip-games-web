# frozen_string_literal: true

# ユーザーのプロフィールを表すモデル
# Userと1対1の関係で、IDはFirebaseのUIDを使用する。
#
# @attr [String] id ID
# @attr [User] user ユーザー
# @attr [String] name 名前
# @attr [String] description 自己紹介
# @attr [String] avatar アバター
# @attr [Date] created_at 作成日
# @attr [Date] updated_at 更新日
# @attr [Array<Review>] reviews レビュー
# @attr [Array<Clip>] clips クリップ
# @attr [Array<ReviewLike>] review_likes いいね

class Profile < ApplicationRecord
  belongs_to :user, foreign_key: :id
  has_many :reviews, dependent: :destroy
  has_many :clips, dependent: :destroy
  has_many :review_likes, dependent: :destroy
end
