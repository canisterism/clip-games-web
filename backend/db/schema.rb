# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 20_230_504_130_001) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'pg_graphql'
  enable_extension 'pg_stat_statements'
  enable_extension 'pgcrypto'
  enable_extension 'pgjwt'
  enable_extension 'pgsodium'
  enable_extension 'plpgsql'
  enable_extension 'supabase_vault'
  enable_extension 'uuid-ossp'

  # Custom types defined in this database.
  # Note that some types may not work with other database engines. Be careful if changing database.
  create_enum 'aal_level', %w[aal1 aal2 aal3]
  create_enum 'code_challenge_method', %w[s256 plain]
  create_enum 'factor_status', %w[unverified verified]
  create_enum 'factor_type', %w[totp webauthn]
  create_enum 'key_status', %w[default valid invalid expired]
  create_enum 'key_type',
              %w[aead-ietf aead-det hmacsha512 hmacsha256 auth shorthash generichash kdf secretbox
                 secretstream stream_xchacha20]

  create_table 'clips', id: :uuid, default: -> { 'gen_random_uuid()' }, force: :cascade do |t|
    t.string 'game_id', null: false
    t.string 'profile_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index %w[game_id profile_id], name: 'index_clips_on_game_id_and_profile_id', unique: true
    t.index ['game_id'], name: 'index_clips_on_game_id'
    t.index ['profile_id'], name: 'index_clips_on_profile_id'
  end

  create_table 'games', id: :string, default: -> { 'uuid_generate_v4()' }, force: :cascade do |t|
    t.string 'title', null: false
    t.datetime 'published_at'
    t.decimal 'price'
    t.string 'image_url'
    t.uuid 'publisher_id', null: false
    t.string 'wiki_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['publisher_id'], name: 'index_games_on_publisher_id'
  end

  create_table 'games_genres', force: :cascade do |t|
    t.string 'game_id', null: false
    t.string 'genre_id', null: false
    t.index ['game_id'], name: 'index_games_genres_on_game_id'
    t.index ['genre_id'], name: 'index_games_genres_on_genre_id'
  end

  create_table 'games_platforms', force: :cascade do |t|
    t.string 'game_id', null: false
    t.string 'platform_id', null: false
    t.index ['game_id'], name: 'index_games_platforms_on_game_id'
    t.index ['platform_id'], name: 'index_games_platforms_on_platform_id'
  end

  create_table 'genres', id: :string, force: :cascade do |t|
    t.string 'name'
  end

  create_table 'platforms', id: :string, force: :cascade do |t|
    t.string 'name'
    t.datetime 'published_at'
  end

  create_table 'profiles', id: :string, force: :cascade do |t|
    t.string 'description', default: '', null: false
    t.string 'display_name', null: false
    t.string 'photo_url', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'publishers', id: :uuid, default: -> { 'gen_random_uuid()' }, force: :cascade do |t|
    t.string 'name'
  end

  create_table 'review_likes', id: :uuid, default: -> { 'gen_random_uuid()' }, force: :cascade do |t|
    t.uuid 'review_id', null: false
    t.string 'liker_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['liker_id'], name: 'index_review_likes_on_liker_id'
    t.index ['review_id'], name: 'index_review_likes_on_review_id'
  end

  create_table 'reviews', id: :uuid, default: -> { 'gen_random_uuid()' }, force: :cascade do |t|
    t.decimal 'rating', precision: 5, scale: 1, null: false
    t.text 'body', default: '', null: false
    t.string 'game_id', null: false
    t.string 'profile_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index %w[game_id profile_id], name: 'index_reviews_on_game_id_and_profile_id', unique: true
    t.index ['game_id'], name: 'index_reviews_on_game_id'
    t.index ['profile_id'], name: 'index_reviews_on_profile_id'
  end

  create_table 'users', id: :string, force: :cascade do |t|
    t.string 'name', null: false
    t.datetime 'notification_read_at', default: -> { 'now()' }, null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  add_foreign_key 'clips', 'games'
  add_foreign_key 'clips', 'profiles'
  add_foreign_key 'games', 'publishers'
  add_foreign_key 'games_genres', 'games'
  add_foreign_key 'games_genres', 'genres'
  add_foreign_key 'games_platforms', 'games'
  add_foreign_key 'games_platforms', 'platforms'
  add_foreign_key 'review_likes', 'profiles', column: 'liker_id', on_delete: :cascade
  add_foreign_key 'review_likes', 'reviews'
  add_foreign_key 'reviews', 'games'
  add_foreign_key 'reviews', 'profiles'
end
