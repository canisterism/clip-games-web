
class JwtKeyFetcher
  JWT_PUBLIC_KEY_URL = "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"

  def self.fetch_key
    response = connection.get(JWT_PUBLIC_KEY_URL)
    # 処理とエラーハンドリング...
    return response.body
  end

  def self.connection
    Faraday.new do |builder|
      builder.use :http_cache, store: Rails.cache, logger: Rails.logger
      builder.request :url_encoded
      builder.response :json, parser_options: { symbolize_names: true }, content_type: 'application/json'

      builder.adapter Faraday.default_adapter
    end
  end
end
