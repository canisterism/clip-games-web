# frozen_string_literal: true

# 単一のモデルに対する問い合わせにおいてN+1を解消するためのSource
# example: Game
# def games
#  dataloader.with(Sources::BatchedActiveRecords, Game).load(game_id)
# end
module Sources
  class BatchedActiveRecords < GraphQL::Dataloader::Source
    def initialize(model_class)
      @model_class = model_class
    end

    def fetch(ids)
      ids = ids.flatten
      records = @model_class.where(id: ids.flatten)
      # return a list with `nil` for any ID that wasn't found
      ids.map { |id| records.find { |r| r.id == id } }
    end
  end
end
