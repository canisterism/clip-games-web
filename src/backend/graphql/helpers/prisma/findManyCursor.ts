import * as Relay from "graphql-relay";

/**
 * Supports the Relay Cursor Connection Specification
 *
 * @see https://facebook.github.io/relay/graphql/connections.html
 * @see https://gist.github.com/ctrlplusb/17b5a1bd1736b5ba547bb15b3dd5be29
 */
export async function findManyCursor<Model extends { id: string }>(
  findMany: (args: Relay.ConnectionArguments) => Promise<Model[]>,
  args: Relay.ConnectionArguments = {} as Relay.ConnectionArguments
): Promise<Relay.Connection<Model>> {
  if (args.first != null && args.first < 0) {
    throw new Error("first is less than 0");
  }
  if (args.last != null && args.last < 0) {
    throw new Error("last is less than 0");
  }

  const originalLength =
    args.first != null ? args.first : args.last != null ? args.last : undefined;

  // We will fetch an additional node so that we can determine if there is a
  // prev/next page
  const first = args.first != null ? args.first + 1 : undefined;
  const last = args.last != null ? args.last + 1 : undefined;

  // Execute the underlying findMany operation
  const nodes = await findMany({ ...args, first, last });

  // Check if we actually got an additional node. This would indicate we have
  // a prev/next page
  const hasExtraNode = originalLength != null && nodes.length > originalLength;

  // Remove the extra node from the results
  if (hasExtraNode) {
    if (first != null) {
      nodes.pop();
    } else if (last != null) {
      nodes.shift();
    }
  }

  // Get the start and end cursors
  const startCursor = nodes.length > 0 ? nodes[0].id : null;
  const endCursor = nodes.length > 0 ? nodes[nodes.length - 1].id : null;

  // If paginating forward:
  // - For the next page, see if we had an extra node in the result set
  // - For the previous page, see if we are "after" another node (so there has
  //   to be more before this)
  // If paginating backwards:
  // - For the next page, see if we are "before" another node (so there has to be
  //   more after this)
  // - For the previous page, see if we had an extra node in the result set
  const hasNextPage = first != null ? hasExtraNode : args.before != null;
  const hasPreviousPage = first != null ? args.after != null : hasExtraNode;

  return {
    pageInfo: {
      startCursor,
      endCursor,
      hasNextPage,
      hasPreviousPage,
    },
    edges: nodes.map((node) => ({ cursor: node.id, node })),
  };
}
