import { ReviewListItemFragment } from "@/components/Review/ReviewListItem";
import ReviewModalPresentation from "@/components/Review/ReviewModalPresentation";
import { FragmentType, useFragment } from "@/graphql/generated";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

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
  myReview: FragmentType<typeof ReviewListItemFragment>;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSubmitComplete?: () => void;
};

export default function UpdateReviewModal({
  myReview: myReviewFragment,
  isOpen,
  setIsOpen,
  onSubmitComplete,
}: Props) {
  const myReview = useFragment(ReviewListItemFragment, myReviewFragment);
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
      onSubmitComplete && onSubmitComplete();
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
