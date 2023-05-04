# frozen_string_literal: true

# ユーザーを表すモデル
# Profileと1対1の関係で、IDはFirebaseのUIDを使用する。
#
# @attr [String] id ID
# @attr [String] name 名前
# @attr [Date] notification_read_at 通知を既読した日
# @attr [Date] created_at 作成日
# @attr [Date] updated_at 更新日
# @attr [Profile] profile プロフィール

class User < ApplicationRecord
  has_one :profile, dependent: :destroy, foreign_key: :id
end
