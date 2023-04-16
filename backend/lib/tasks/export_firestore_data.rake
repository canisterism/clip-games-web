require 'google/cloud/firestore'
require 'json'

# Google::Cloud::Firestore::DocumentReference クラスがうまくシリアライズできないので to_json メソッドをオーバーライドしてIDだけを返すようにする
module Google
  module Cloud
    module Firestore
      class DocumentReference
        def to_json(*_)
          "\"#{get.document_id}\""
        end
      end
    end
  end
end

namespace :export_firestore_data do
  desc 'Export data from Firestore and save as a JSON file'
  task :run do
    firestore_credentials = Rails.application.credentials.firebase.credentials

    # Firestoreクライアントの設定
    Google::Cloud::Firestore.configure do |config|
      config.project_id = firestore_credentials[:project_id]
      config.credentials = firestore_credentials
    end

    # Firestoreクライアントを作成
    firestore = Google::Cloud::Firestore.new

    # 対象となるコレクション名のリスト
    collections = %w[users public-profiles games hardwares]

    collections.each do |collection_name|
      # コレクションからドキュメントを取得
      documents = firestore.col(collection_name).get

      # データをハッシュ形式に変換
      data = documents.map { |doc| { id: doc.document_id, data: doc.data } }

      # データをJSON形式に変換
      json_data = JSON.pretty_generate(data)

      # JSONファイルにデータを書き込み
      File.write("tmp/#{collection_name.underscore}.json", json_data)
    end

    collection_groups = %w[reviews clips]

    collection_groups.each do |collection_group_name|
      # コレクショングループからドキュメントを取得
      documents = firestore.col_group(collection_group_name).get

      # データをハッシュ形式に変換
      data = documents.map { |doc| { id: doc.document_id, data: doc.data } }

      # データをJSON形式に変換
      json_data = JSON.pretty_generate(data)

      # JSONファイルにデータを書き込み
      File.write("tmp/#{collection_group_name}.json", json_data)
    end
  end
end