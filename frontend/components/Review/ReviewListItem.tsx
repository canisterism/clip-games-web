import RatingStars from "@/components/Game/RatingStars";
import { FragmentType, graphql, useFragment } from "@/graphql/generated";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export const ReviewListItemFragment = graphql(`
  fragment ReviewListItemFragment on Review {
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

type Props = {
  review: FragmentType<typeof ReviewListItemFragment>;
};

export function ReviewListItem(props: Props) {
  const review = useFragment(ReviewListItemFragment, props.review);
  console.log({ review });
  return (
    <div
      key={review.id}
      className="text-gray-100 flex flex-col gap-2 p-4 bg-gray-800 rounded-md border border-gray-600"
    >
      <div className="flex">
        <ProfileHeading {...review.profile} />
        <div className="flex-grow" aria-hidden></div>
      </div>
      <div className="flex items-center gap-2">
        <RatingStars rating={review.rating} size="md" />
        <span className="text-xl font-semibold flex ">
          {review.rating.toFixed(1)}
        </span>
      </div>
      <div className="gap-1">
        <p>{review.body}</p>
        <span className="text-gray-400 text-sm">
          投稿日：{format(new Date(review.createdAt), "yyyy-MM-dd")}
        </span>
      </div>
    </div>
  );
}

function ProfileHeading({
  id,
  photoUrl,
  displayName,
}: {
  id: string;
  photoUrl: string | null | undefined;
  displayName: string | null | undefined;
}) {
  return (
    <Link href={`/users/${id}`} passHref>
      <a>
        <div className="flex gap-4">
          <Image
            className="h-8 w-8 rounded-full bg-gray-50"
            src={photoUrl ?? ""}
            alt="profile icon"
            width="40"
            height="40"
          />

          <span className="text-lg font-semibold text-gray-300 flex items-center">
            {displayName ?? "退会済みユーザー"}
          </span>
        </div>
      </a>
    </Link>
  );
}
