require 'google/cloud/firestore'
require 'json'

namespace :import_json_data do
  desc 'Import data from a JSON file'
  task run: :environment do
    # file_names = %w[hardwares users public_profiles games reviews clips]
    file_names = %w[hardwares users public_profiles]
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

# def import_games
#   read_file(name: 'games').each do |doc|
#     Game.find_or_initializecreate!(
#       id: doc['id'],
#       title: doc['data']['title'],
#       image_url: doc['data']['imageUrl'],
#       genre: doc['data']['genre'],
#       publisher: doc['data']['publisher'],
#       price: doc['data']['price'],
#       platforms: doc['data']['hardwareIds'],
#       published_at: doc['data']['publishedAt'],
#       wiki_id: doc['data']['wikiId'],
#       created_at: doc['data']['createdAt'],
#       updated_at: doc['data']['updatedAt']
#     )
#   end
# end
# def import_games

# end
# def import_reviews

# end
# def import_clips

# end

# JSONファイルからデータを読み込む
# @param [String] name コレクション名
# @return [Array<Hash>] データ
def read_file(name:)
  json_data = File.read("tmp/#{name}.json")
  JSON.parse(json_data)
end
