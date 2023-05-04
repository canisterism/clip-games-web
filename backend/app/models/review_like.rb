# frozen_string_literal: true

# レビューについたいいねを表すモデル
#
# @attr [String] id ID
# @attr [Review] review レビュー
# @attr [Profile] liker いいねした人のプロフィール
# @attr [Date] created_at 作成日
# @attr [Date] updated_at 更新日

class ReviewLike < ApplicationRecord
  belongs_to :review
  belongs_to :liker, class_name: 'Profile'
end
