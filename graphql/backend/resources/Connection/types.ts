import * as Relay from "graphql-relay";
import { ArgsType, ClassType, Field, ObjectType } from "type-graphql";

@ArgsType()
export class ConnectionArgs implements Relay.ConnectionArguments {
  @Field((type) => String, {
    nullable: true,
    description: "Paginate before opaque cursor",
  })
  before?: Relay.ConnectionCursor;

  @Field((type) => String, {
    nullable: true,
    description: "Paginate after opaque cursor",
  })
  after?: Relay.ConnectionCursor;

  @Field((type) => Number, { nullable: true, description: "Paginate first" })
  first?: number;

  @Field((type) => Number, { nullable: true, description: "Paginate last" })
  last?: number;
}

export function EdgeType<NodeType>(
  nodeName: string,
  nodeType: ClassType<NodeType>
) {
  @ObjectType(`${nodeName}Edge`, { isAbstract: true })
  abstract class Edge implements Relay.Edge<NodeType> {
    @Field((type) => nodeType)
    node!: NodeType;

    @Field((type) => String, {
      description: "Used in `before` and `after` args",
    })
    cursor!: Relay.ConnectionCursor;
  }

  return Edge;
}

@ObjectType()
class PageInfo implements Relay.PageInfo {
  @Field((type) => Boolean)
  hasNextPage!: boolean;

  @Field((type) => Boolean)
  hasPreviousPage!: boolean;

  @Field((type) => String)
  startCursor!: Relay.ConnectionCursor | null;

  @Field((type) => String)
  endCursor!: Relay.ConnectionCursor | null;
}

type ExtractNodeType<EdgeType> = EdgeType extends Relay.Edge<infer NodeType>
  ? NodeType
  : never;

export function ConnectionType<
  EdgeType extends Relay.Edge<NodeType>,
  NodeType = ExtractNodeType<EdgeType>
>(nodeName: string, edgeClass: ClassType<EdgeType>) {
  @ObjectType(`${nodeName}Connection`, { isAbstract: true })
  abstract class Connection implements Relay.Connection<NodeType> {
    @Field((type) => PageInfo)
    pageInfo!: PageInfo;

    @Field((type) => [edgeClass])
    edges!: EdgeType[];
  }

  return Connection;
}
