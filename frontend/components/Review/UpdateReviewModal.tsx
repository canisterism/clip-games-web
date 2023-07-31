import ReviewModalPresentation from "@/components/Review/ReviewModalPresentation";
import { FragmentType, graphql, useFragment } from "@/graphql/generated";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

export const MyReviewFragment = graphql(`
  fragment MyReviewFragment on Review {
    id
    body
    rating
    createdAt
    profile {
      id
      displayName
      photoUrl
    }
  }
`);
export const updateReviewModalMutation = gql`
  mutation updateReview($input: UpdateReviewInput!) {
    updateReview(input: $input) {
      review {
        id
        body
        rating
        createdAt
        profile {
          id
          displayName
          photoUrl
        }
      }
    }
  }
`;

type Props = {
  myReview: FragmentType<typeof MyReviewFragment>;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export default function UpdateReviewModal({
  myReview: myReviewFragment,
  isOpen,
  setIsOpen,
}: Props) {
  const myReview = useFragment(MyReviewFragment, myReviewFragment);
  console.log({ myReview });
  const [updateReview, { error, data }] = useMutation(
    updateReviewModalMutation
  );

  const onSubmit = async (newReview: { body: string; rating: number }) => {
    try {
      await updateReview({
        variables: {
          input: {
            reviewId: myReview.id,
            ...newReview,
          },
        },
      });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <ReviewModalPresentation
      body={myReview.body}
      rating={myReview.rating}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onSubmit={onSubmit}
    />
  );
}
