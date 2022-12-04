import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import React from "react";

const Navbar: FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  return (
    <nav className="flex items-center gap-x-2 p-8">
      <Link
        href="/"
        data-active={isActive("/")}
        className="inline-block rounded-md p-2 font-bold hover:bg-gray-400 data-[active]:text-gray-500"
      >
        Home
      </Link>
      <div className="ml-auto flex gap-x-8">
        {status === "loading" && (
          <div className="ml-auto">
            <p>Validating session...</p>
          </div>
        )}
        {!session && (
          <Link
            href="api/auth/signin"
            className="rounded-md p-2 hover:bg-gray-400"
            data-active={isActive("/signup")}
            onClick={signIn}
          >
            Log in
          </Link>
        )}
        {session && (
          <>
            <Link
              className="rounded-md p-2 font-bold text-gray-500 hover:bg-gray-400"
              href="/create"
            >
              New note
            </Link>
            <p className="font-sm inline-block p-2">
              {session.user?.name} ({session.user?.email})
            </p>
            <button
              className="rounded-md p-2 hover:bg-gray-400"
              onClick={() => signOut()}
            >
              Log out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
