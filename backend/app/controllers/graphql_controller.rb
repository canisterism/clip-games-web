class GraphqlController < ApplicationController
  # If accessing from outside this domain, nullify the session
  # This allows for outside API access while preventing CSRF attacks,
  # but you'll have to authenticate your user separately
  # protect_from_forgery with: :null_session

  rescue_from StandardError do |exception|
    render json: { errors: [ { message: exception.message } ] }, status: 200
  end

  def execute
    variables = prepare_variables(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    context = { current_user: }
    result = BackendSchema.execute(query, variables:, context:, operation_name:)
    render json: result
  # rescue StandardError => e
  #   Rails.logger.error e.message
  #   raise e unless Rails.env.development?

  #   handle_error_in_development(e)
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
    jwks = JwtKeyFetcher.fetch_key

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
