import ReviewModalPresentation from "@/components/Review/ReviewModalPresentation";
import { PostReviewDocument } from "@/graphql/generated/graphql";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

export const postReviewModalMutation = gql`
  mutation postReview($input: PostReviewInput!) {
    postReview(input: $input) {
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

export default function PostReviewModal({
  gameId,
  isOpen,
  setIsOpen,
}: {
  gameId: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [postReview, { error, data }] = useMutation(PostReviewDocument);

  const onSubmit = async (review: { body: string; rating: number }) => {
    try {
      await postReview({
        variables: {
          input: {
            gameId: gameId,
            body: review.body,
            rating: review.rating,
          },
        },
      });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <ReviewModalPresentation
      body={undefined}
      rating={undefined}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onSubmit={onSubmit}
    />
  );
}
