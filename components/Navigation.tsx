import Link from "next/link";

export const Navigation = () => {
  return (
    <>
      <div className="bg-white lg:pb-12">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
          <header className="flex justify-between items-center py-4 md:py-4">
            {/* logo - start  */}
            <Link href="/">
              <a
                className="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5"
                aria-label="logo"
              >
                clip-games
              </a>
            </Link>
            {/* logo - end  */}

            {/* nav - start  */}
            <nav className="hidden lg:flex gap-12">
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
              >
                Home
              </a>
              <a
                href="#"
                className="inline-flex items-center text-indigo-500 text-lg font-semibold gap-1"
              >
                Features
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
              >
                Pricing
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
              >
                About
              </a>
            </nav>
            {/* nav - end  */}

            {/* buttons - start  */}
            <div className="hidden lg:flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-2.5 -ml-8">
              <a
                href="#"
                className="inline-block focus-visible:ring ring-indigo-300 text-gray-500 hover:text-indigo-500 active:text-indigo-600 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-4 py-3"
              >
                Sign in
              </a>

              <a
                href="#"
                className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
              >
                Sign up
              </a>
            </div>

            <button
              type="button"
              className="inline-flex items-center lg:hidden bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold rounded-lg gap-2 px-2.5 py-2"
            >
              Menu
            </button>
            {/* buttons - end  */}
          </header>
        </div>
      </div>
    </>
  );
};
