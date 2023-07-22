"use client";
import MeContext from "@/context/meContext";
import { classNames } from "@/lib/classNames";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useContext } from "react";

function ProfileMenuIcon() {
  const { me, loading } = useContext(MeContext);

  const userNavigation = [
    { name: "プロフィール", href: "#" },
    me
      ? { name: "Sign out", href: "/signin" }
      : { name: "Sign in", href: "/signin" },
  ];

  return loading ? null : (
    <Menu as="div" className="relative">
      <Menu.Button className="-m-1.5 flex items-center p-1.5">
        <span className="sr-only">Open user menu</span>
        {me && (
          <Image
            className="h-8 w-8 rounded-full bg-gray-50"
            src={me?.photoUrl ?? ""}
            alt="profile icon"
            width="40"
            height="40"
          />
        )}
        <span className="hidden lg:flex lg:items-center">
          <span
            className="ml-4 text-sm font-semibold leading-6 text-gray-300"
            aria-hidden="true"
          >
            {me?.displayName ?? "ゲスト"}
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
                <Link href={item.href} passHref>
                  <a
                    className={classNames(
                      active ? "bg-gray-600" : "",
                      "block px-3 py-1 text-sm leading-6 text-gray-300"
                    )}
                  >
                    {item.name}
                  </a>
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default React.memo(ProfileMenuIcon);
