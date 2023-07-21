class GraphqlController < ApplicationController
  # If accessing from outside this domain, nullify the session
  # This allows for outside API access while preventing CSRF attacks,
  # but you'll have to authenticate your user separately
  # protect_from_forgery with: :null_session

  rescue_from GraphQL::ExecutionError do |exception|
    render json: { errors: [ { message: exception.message, extensions: exception.extensions } ] }, status: 200
  end

  def execute
    variables = prepare_variables(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    context = { current_user: }
    result = BackendSchema.execute(query, variables:, context:, operation_name:)
    render json: result
  rescue StandardError => e
    raise e unless Rails.env.development?

    handle_error_in_development(e)

  end
  private

  def current_user
    @current_user ||= authenticate_user
  end

  def authenticate_user

    return unless request.headers['Authorization'].present?

    # リクエストヘッダーからjwtを取得
    token = request.headers['Authorization'].split(' ').last

    # TODO: あとでmiddlewareでキャッシュする実装にする
    jwks = {  "keys": [    {      "kty": "RSA",      "n": "tBgvHPcxjamT4o-VUFxOfwJPh_eL8uz6SjqBZ7d3j1STNg_kACW_8WEcdAD4fklt8ZSYX5fC2LkDPRI0AKwsx-TWcXpsHi_rIywbOFrlKeOjc9W1zLyFr4ZQOUaxdM5d8RE5v1zSIF2MQpg_pEOIhpJpr89mmFqyrDPMTeU58B9Dwu1uuAtA2-flvaKMJ-Jo9AWPgnzFTb4xkyGmuRPcdOy1CpiS83YSwwtSHIfNkYZv9raBBIoN4hKd50av96zdWPZ3ECTnl16L0_DRKPK1jRWF9ihdF63TT9rPvUiDB21xDU3sZSK6jIZoPTxCQz65-HTz4Sfo8UTJXAa9RXMPGw",      "alg": "RS256",      "e": "AQAB",      "use": "sig",      "kid": "14eb8a3b6837f6158eeb6076e6a8c428a5f62a7b"    },    {      "e": "AQAB",      "n": "vVhsA2TGjP3NSpf2OjhUSD_TQBP5Z24aBeHTU7V6TgJRN2hkVWqwDyJ0DzFDZ0XI0xdFi497YT-UQC5en9xgMJgshohK2Ovazx6fpR0nBikqbt4YR4PCD2BcBK5oHFX-fsCMMqoieZaHeEsMSyw-pBNrPrPBSJw8b6iOPomU9HlcmDbKlL84jtKUrmBEMc3CLPEMehA9LdXxw3Wi5eSTd-GNPSOQxLEjgFPgzIdArCRT6TG_yHibebgv_HczTNHmGSpLhE8Te971po8RIwB7MB-I570D3aWUwIvsyw_iaPEm0Ub4hEqRIjBQqKdeCBC9beaRjEuY95G5Lm5oBLHS_Q",      "alg": "RS256",      "use": "sig",      "kid": "b2dff78a0bdd5a02212063499d77ef4deed1f65b",      "kty": "RSA"    }  ]}

    # jwtを検証
    payload = JWT.decode(token, nil, true, algorithms: ['RS256'], jwks:).first

    # jwtのペイロードからユーザーを検索
    User.find_by(id: payload['sub'])
  rescue JWT::ExpiredSignature => e
    # extenstionscode ="TOKEN_EXPIRED"を設定する
    raise GraphQL::ExecutionError.new(e.message, extensions: { "code" => "TOKEN_EXPIRED" })
  end

  # Handle variables in form data, JSON body, or a blank value
  def prepare_variables(variables_param)
    case variables_param
    when String
      if variables_param.present?
        JSON.parse(variables_param) || {}
      else
        {}
      end
    when Hash
      variables_param
    when ActionController::Parameters
      variables_param.to_unsafe_hash # GraphQL-Ruby will validate name and type of incoming variables.
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{variables_param}"
    end
  end

  def handle_error_in_development(error)
    logger.error error.message
    logger.error error.backtrace.join("\n")

    render json: { errors: [{ message: error.message, backtrace: error.backtrace }], data: {} }, status: 500
  end
end
