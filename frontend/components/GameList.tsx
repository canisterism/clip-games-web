"use client";

import RatingStars from "@/components/Game/RatingStars";
import Image from "next/image";
import Link from "next/link";
import { useHits } from "react-instantsearch-hooks-web";

export function GameList() {
  const { hits } = useHits();
  return (
    <div className="mx-auto max-w-10xl overflow-hidden sm:px-6 lg:px-3">
      <h2 className="sr-only">games</h2>

      <div className="-mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4 xl:lg:grid-cols-8">
        {hits.map((game) => (
          <Hit key={game.objectID} hit={game} />
        ))}
      </div>
    </div>
  );
}

function Hit({ hit: game }: { hit: any }) {
  return (
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
          <Link href={`games/${game.objectID}`} passHref>
            <a>
              <span aria-hidden="true" className="absolute inset-0" />

              {game.title}
            </a>
          </Link>
        </h3>
        <div className="mt-3 flex flex-col items-start">
          <p className="sr-only">{game.ratingAverage} out of 5 stars</p>
          <RatingStars ratingAverage={game.ratingTotal / game.ratingCount} />
          <p className="mt-1 text-sm text-gray-500">
            {game.reviewCount || 0} reviews
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {game.clipCount || 0} clips
          </p>
        </div>
      </div>
    </div>
  );
}
