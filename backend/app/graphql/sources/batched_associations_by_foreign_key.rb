# frozen_string_literal: true

# A has_many B　において、AのidをキーにしてBを取得するためのSource
# example: Game has_many Reviews
# def reviews
#   dataloader.with(Sources::BatchedAssociationsByForeignKey, Review, :game_id).load(object.id)
# end
module Sources
  class BatchedAssociationsByForeignKey < GraphQL::Dataloader::Source
    def initialize(model_class, foreign_key)
      @model_class = model_class
      @foreign_key = foreign_key
    end

    def fetch(ids)
      records = @model_class.where(@foreign_key => ids)
      grouped_records = records.group_by { |record| record.send(@foreign_key) }
      ids.map { |id| grouped_records[id] || [] }
    end
  end
end
