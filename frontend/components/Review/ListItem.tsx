import { FragmentType, graphql, useFragment } from "@/graphql/generated";

export const ReviewListItemFragment = graphql(`
  fragment ReviewListItemFragment on Review {
    id
    body
    rating
    createdAt
  }
`);

type Props = {
  review: FragmentType<typeof ReviewListItemFragment>;
};

export function ListItem(props: Props) {
  const review = useFragment(ReviewListItemFragment, props.review);
  return (
    <div key={review.id}>
      <p>{review.body}</p>
      <p>{review.rating}</p>
      <p>{review.createdAt}</p>
    </div>
  );
}
