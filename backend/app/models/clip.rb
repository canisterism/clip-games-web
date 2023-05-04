# frozen_string_literal: true

# ゲームのクリップを表すモデル

# @attr [String] id ID
# @attr [Game] game ゲーム
# @attr [Profile] profile プロフィール
# @attr [Date] created_at 作成日
# @attr [Date] updated_at 更新日
class Clip < ApplicationRecord
  belongs_to :game
  belongs_to :profile
end
