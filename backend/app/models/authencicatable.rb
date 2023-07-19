# Firebase Authのjwtを検証して、ユーザーを認証するモジュール
module Authenticatable
  extend ActiveSupport::Concern

  included do
    # リクエストヘッダーからjwtを取得する
    def current_user
      @current_user ||= authenticate_user
    end

    private

    def authenticate_user
      return unless request.headers['Authorization'].present?

      # リクエストヘッダーからjwtを取得
      token = request.headers['Authorization'].split(' ').last
      binding.b
      # jwtを検証
      # payload = JWT.decode(token, Rails.application.credentials.firebase[:jwt_secret], true, algorithm: 'RS256')
      payload = JWT.decode(token, nil, true, algorithm: 'RS256')
      binding.b
      # jwtのペイロードからユーザーを検索
      User.find_by(uid: payload['sub'])
    end
  end
end
