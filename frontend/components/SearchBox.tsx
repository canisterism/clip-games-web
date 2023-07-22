"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useSearchBox } from "react-instantsearch-hooks";

export default function SearchBox() {
  const { query, refine } = useSearchBox();
  return (
    <form className="relative flex flex-1" action="#" method="GET">
      <label htmlFor="search-field" className="sr-only">
        Search
      </label>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </div>
      <input
        id="search-field"
        className="block h-full w-full border-0 rounded-md py-1.5 pl-10 pr-3 bg-gray-700 text-gray-200 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm"
        placeholder="Search..."
        type="search"
        name="search"
        onChange={(event) => refine(event.target.value)}
      />
    </form>
  );
}
