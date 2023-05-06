FROM ruby:3.1.0

# 必要なパッケージのインストール
RUN apt-get update -qq && apt-get install -y postgresql-client
RUN mkdir /clip-games-web
WORKDIR /clip-games-web

# Gemfileをコピー
COPY Gemfile /clip-games-web/Gemfile
COPY Gemfile.lock /clip-games-web/Gemfile.lock
RUN bundle install --without test development

# アプリケーションのソースコードをコピー
COPY . /clip-games-web

# ポートを公開
EXPOSE 8080

# 起動コマンド
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "8080"]
