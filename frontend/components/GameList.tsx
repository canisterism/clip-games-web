import { GameQuery } from "@/graphql/generated/graphql";
import { classNames } from "@/lib/classNames";
import { StarIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export default function GameList({ games }: { games: GameQuery["game"][] }) {
  return (
    <div className="mx-auto max-w-10xl overflow-hidden sm:px-6 lg:px-3">
      <h2 className="sr-only">Products</h2>

      <div className="-mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4 xl:lg:grid-cols-8">
        {games.map((game) => (
          <div key={game.id} className="group relative p-2">
            <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
              <Image
                src={
                  game.imageUrl
                    ? `${game.imageUrl}`
                    : "https://placeimg.com/320/400/any"
                }
                alt={`${game.title}`}
                className="h-full w-full object-cover object-center"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="pb-4 pt-2 ">
              <h3 className="text-sm text-gray-300">
                <a href={`games/${game.id}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {game.title}
                </a>
              </h3>
              <div className="mt-3 flex flex-col items-start">
                <p className="sr-only">{game.ratingAverage} out of 5 stars</p>
                <div className="flex items-start">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        game.ratingAverage > rating
                          ? "text-yellow-400"
                          : "text-gray-100",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {game.reviewsCount || 0} reviews
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {game.clipsCount || 0} reviews
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
