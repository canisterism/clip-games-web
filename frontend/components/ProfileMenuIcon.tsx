"use client";
import { MeDocument } from "@/graphql/generated/graphql";
import { classNames } from "@/lib/classNames";
import { useQuery } from "@apollo/client";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { withUser } from "next-firebase-auth";
import Image from "next/image";
import { Fragment } from "react";

function ProfileMenuIcon() {
  const { data } = useQuery(MeDocument);
  const user = data?.me;

  const userNavigation = [
    { name: "プロフィール", href: "#" },
    user
      ? { name: "Sign out", href: "/signin" }
      : { name: "Sign in", href: "/signin" },
  ];

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="-m-1.5 flex items-center p-1.5">
        <span className="sr-only">Open user menu</span>
        <Image
          className="h-8 w-8 rounded-full bg-gray-50"
          src={user?.photoUrl ?? ""}
          alt="profile icon"
          width="40"
          height="40"
        />
        <span className="hidden lg:flex lg:items-center">
          <span
            className="ml-4 text-sm font-semibold leading-6 text-gray-300"
            aria-hidden="true"
          >
            {user?.displayName ?? "ゲスト"}
          </span>
          <ChevronDownIcon
            className="ml-2 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-gray-700 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <a
                  href={item.href}
                  className={classNames(
                    active ? "bg-gray-600" : "",
                    "block px-3 py-1 text-sm leading-6 text-gray-300"
                  )}
                >
                  {item.name}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default withUser()(ProfileMenuIcon);
