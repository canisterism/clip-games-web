require 'google/cloud/firestore'
require 'json'

Rails.logger = Logger.new($stdout)
Rails.logger.level = Logger::INFO

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
  task run: :environment do
    Rails.logger.info('export_firestore_data を開始します')
    firestore_credentials = Rails.application.credentials.firebase.credentials

    # Firestoreクライアントの設定
    Google::Cloud::Firestore.configure do |config|
      config.project_id = firestore_credentials[:project_id]
      config.credentials = firestore_credentials
    end

    # Firestoreクライアントを作成
    firestore = Google::Cloud::Firestore.new

    # 出力先のディレクトリを新規作成
    FileUtils.rm_rf("tmp/#{Rails.env}")
    FileUtils.mkdir_p("tmp/#{Rails.env}")

    # 対象となるコレクション名のリスト
    collections = %w[users public-profiles games hardwares]

    Rails.logger.info("コレクション名: #{collections.join(', ')}")

    collections.each do |collection_name|
      # コレクションからドキュメントを取得
      documents = firestore.col(collection_name).get
      Rails.logger.info("#{collection_name}のドキュメント数: #{documents.count}")

      # データをハッシュ形式に変換
      data = documents.map { |doc| { id: doc.document_id, data: doc.data } }

      # データをJSON形式に変換
      json_data = JSON.pretty_generate(data)

      # JSONファイルにデータを書き込み
      File.write("tmp/#{Rails.env}/#{collection_name.underscore}.json", json_data)
      Rails.logger.info("tmp/#{Rails.env}/#{collection_name.underscore}.json にデータを書き込みました")
    end

    collection_groups = %w[reviews clips likes]
    Rails.logger.info("コレクショングループ名: #{collection_groups.join(', ')}")

    collection_groups.each do |collection_group_name|
      # コレクショングループからドキュメントを取得
      documents = firestore.col_group(collection_group_name).get

      Rails.logger.info("#{collection_group_name}のドキュメント数: #{documents.count}")

      # データをハッシュ形式に変換
      data = documents.map { |doc| { id: doc.document_id, data: doc.data } }

      # データをJSON形式に変換
      json_data = JSON.pretty_generate(data)

      # JSONファイルにデータを書き込み
      File.write("tmp/#{Rails.env}/#{collection_group_name}.json", json_data)
      Rails.logger.info("tmp/#{Rails.env}/#{collection_group_name}.json にデータを書き込みました")
    end
    Rails.logger.info('export_firestore_data を終了します')
  end
end
