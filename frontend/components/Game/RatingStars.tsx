import { classNames } from "@/lib/classNames";
import { StarIcon } from "@heroicons/react/20/solid";

export default function RatingStars({
  rating,
  size = "md",
}: {
  rating: number;
  size: "sm" | "md" | "lg";
}) {
  const sizeClass = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-9 w-9",
  }[size];

  return (
    <div className="flex items-start">
      {[0, 1, 2, 3, 4].map((n) => (
        <StarIcon
          key={n}
          className={classNames(
            Math.floor(rating) > n ? "text-yellow-400" : "text-gray-100",
            `${sizeClass} flex-shrink-0`
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
