require 'google/cloud/firestore'
require 'json'

namespace :import_json_data do
  desc 'Import data from a JSON file'
  task run: :environment do
    file_names = %w[hardwares users public_profiles games reviews clips likes]
    file_names.each do |file_name|
      send("import_#{file_name}")
    end
  end
end

def import_hardwares
  read_file(name: 'hardwares').each do |doc|
    Platform.find_or_create_by!(id: doc['id']) do |platform|
      platform.name = doc['data']['name']
      platform.published_at = doc['data']['publishedAt']
    end
  end
end

def import_users
  read_file(name: 'users').each do |doc|
    User.find_or_create_by!(id: doc['id']) do |user|
      user.name = doc['data']['name']
      user.notification_read_at = doc['data']['notificationReadAt']
      user.created_at = doc['data']['createdAt']
      user.updated_at = doc['data']['updatedAt']
    end
  end
end

def import_public_profiles
  read_file(name: 'public_profiles').each do |doc|
    Profile.find_or_create_by!(id: doc['id']) do |profile|
      profile.description = doc['data']['description']
      profile.display_name = doc['data']['displayName']
      profile.photo_url = doc['data']['photoUrl']
      profile.created_at = doc['data']['createdAt']
      profile.updated_at = doc['data']['updatedAt']
    end
  end
end

def import_games
  read_file(name: 'games').each do |doc|
    Game.find_or_create_by!(id: doc['id']) do |game|
      genres = split_genre(doc['data']['genre']).map do |id|
        Genre.find_or_initialize_by(id:, name: GENRES_MAP[:id].to_sym)
      end
      publisher = Publisher.find_or_initialize_by(name: doc['data']['publisher'])
      platforms = Platform.where(id: doc['data']['hardwareIds'])

      game.title        = doc['data']['title']
      game.image_url    = doc['data']['imageUrl']
      game.price        = doc['data']['price']
      game.published_at = doc['data']['publishedAt']
      game.wiki_id      = doc['data']['wikiId']
      game.created_at   = doc['data']['createdAt']
      game.updated_at   = doc['data']['updatedAt']
      game.genres       = genres
      game.publisher    = publisher
      game.platforms    = platforms
    end
  end
end

def import_reviews
  read_file(name: 'reviews').each do |doc|
    Review.find_or_create_by!(
      game_id: doc['data']['game']['ref'],
      profile_id: doc['data']['profile']['ref']
    ) do |review|
      game = Game.find_by(id: doc['data']['game']['ref'])
      profile = Profile.find_by(id: doc['data']['profile']['ref'])
      review.game = game
      review.profile = profile

      review.body = doc['data']['body']
      review.rating = doc['data']['rating']
      review.created_at = doc['data']['createdAt']
      review.updated_at = doc['data']['updatedAt']
    end
  end
end

def import_clips
  read_file(name: 'clips').each do |doc|
    Clip.find_or_create_by!(
      game_id: doc['data']['game']['ref'],
      profile_id: doc['data']['profile']['ref']
    ) do |clip|
      game = Game.find_by(id: doc['data']['game']['ref'])
      profile = Profile.find_by(id: doc['data']['profile']['ref'])
      clip.game = game
      clip.profile = profile

      clip.created_at = doc['data']['createdAt']
      clip.updated_at = doc['data']['createdAt']
    end
  # ActiveRecord::RecordNotFound, ActiveRecord::RecordInvalid は無効なデータなのでスキップ
  rescue ActiveRecord::RecordNotFound, ActiveRecord::RecordInvalid => e
    puts doc
    puts e
    next
  end
end

def import_likes
  read_file(name: 'likes').each do |doc|
    review = Review.find_by(profile_id: doc['data']['author']['ref'], game_id: doc['data']['game']['ref'])
    ReviewLike.find_or_create_by!(review:, liker_id: doc['data']['viewer']['ref']) do |like|
      liker = Profile.find_by(id: doc['data']['viewer']['ref'])
      like.review = review
      like.liker = liker

      like.created_at = doc['data']['createdAt']
      like.updated_at = doc['data']['createdAt']
    end
  # ActiveRecord::RecordNotFound, ActiveRecord::RecordInvalid は無効なデータなのでスキップ
  rescue ActiveRecord::RecordNotFound, ActiveRecord::RecordInvalid => e
    puts doc
    puts e
    next
  end
end

# JSONファイルからデータを読み込む
# @param [String] name コレクション名
# @return [Array<Hash>] データ
def read_file(name:)
  json_data = File.read("tmp/#{Rails.env}/#{name}.json")
  JSON.parse(json_data)
end

# ジャンルの元データには以下のような文字列が含まれるので分割する
# ACT/PZL, RPG&ACT
def split_genre(raw_string)
  return [] if raw_string.nil? || raw_string.empty?

  raw_string
    .split(%r{(?:\+)|(?:&)|(?:/)}) # ? & / は区切り文字なので split する
    .flat_map { |str| str.gsub(/(\.)|(他)|(3D)|\s/, '') } # . 他 3D 空白などは扶養なので削除
    .filter { |v| !v.nil? && !v.empty? }
    .map { |str| INVALID_GENRE_MAP.key?(str.to_sym) ? INVALID_GENRE_MAP[str.to_sym] : str }
    .filter { |v| !v.nil? }
end

GENRES_MAP = {
  ACT: 'アクション',
  PZL: 'パズル',
  TBL: 'テーブルゲーム',
  RPG: 'RPG',
  クイズ: 'クイズ',
  ARPG: 'アクションRPG',
  ADV: 'アドベンチャー',
  AADV: 'アクションアドベンチャー',
  STG: 'シューティング',
  RCG: 'レース',
  SLG: 'シミュレーション',
  etc: 'その他',
  SRPG: 'シミュレーションRPG',
  SPG: 'スポーツ',
  FTG: '格闘ゲーム',
  APZL: 'アクションパズル',
  音楽: '音楽',
  RTS: 'リアルタイムストラテジー',
  FPS: 'FPS',
  TPS: 'TPS',
  BG: 'ボードゲーム',
  ダンスシミュレーション: 'ダンスシミュレーション',
  FACT: '格闘アクション',
  キャラ: 'キャラゲー',
  ASTG: 'アクションシューティング',
  脱衣麻雀: '脱衣麻雀',
  RPG制作: 'RPG制作',
  RACT: 'レースアクション',
  FPA: 'ファーストパーソンアドベンチャー',
  TCG: 'トレーディングカードゲーム',
  サバイバル: 'サバイバル',
  ACR: 'アクションレース'
}.freeze

# マスタ側のデータが間違ってるなどの理由で修正されるべきジャンルのキー名と正しいキー名のマッピング
INVALID_GENRE_MAP = {
  SPRG: 'SRPG',
  PZLl: 'PZL',
  SPT: 'SPG',
  ボードゲーム: 'BG',
  AVG: 'ADV',
  ATC: 'ACT',
  ETC: 'etc',
  act: 'ACT',
  RCE: 'RCG',
  SRG: 'SLG',
  SLC: 'SLG',
  BDG: 'BG'
}.freeze
