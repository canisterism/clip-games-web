# frozen_string_literal: true

# A:B=n:m　において、AのidをキーにしてBを取得するためのSource
# example:
# Game has_many Platforms through GamePlatforms
# def platforms
#   dataloader.with(Sources::BatchedAssociationsByManyToMany, Platform, :game_platforms, :game_id, :platform_id).load(object.id)
# end
module Sources
  class BatchedAssociationsByManyToMany < GraphQL::Dataloader::Source
    def initialize(model_class, join_table, source_key, target_key)
      @model_class = model_class
      @join_table = join_table
      @source_key = source_key
      @target_key = target_key
    end

    def fetch(ids)
      records = @model_class.joins(@join_table)
                            .where(@join_table => { @source_key => ids })
                            .select("#{@model_class.table_name}.*, #{@join_table}.#{@source_key} as join_source_key")
      grouped_records = records.group_by(&:join_source_key)
      ids.map { |id| grouped_records[id] || [] }
    end
  end
end
