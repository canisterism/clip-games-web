# frozen_string_literal: true

# ゲームの販売元を表すモデル
#
# @attr [String] id ID
# @attr [String] name 名前
# @attr [Date] created_at 作成日
# @attr [Date] updated_at 更新日
# @attr [Array<Game>] games ゲーム

class Publisher < ApplicationRecord
  has_many :games
end
