"use client";

import { useSession } from "next-auth/react";
import { SignInButtonBig, SignOutButton } from "./AuthButtons";
import Link from "next/link";

const SideBar: React.FC = () => {
  const { status } = useSession();
  return (
    <ul className="menu p-4 w-60 h-full bg-base-200">
      {/* Sidebar content here */}
      <li>
        <Link href={"/"}>home</Link>
      </li>
      {status === "authenticated" && (
        <>
          <li>
            <Link href={"/dashboard"} className="hover:underline">
              dashboard
            </Link>
          </li>
          <li>
            <Link href={"/"} className="hover:underline">
              about
            </Link>
          </li>
        </>
      )}
      {status === "authenticated" && (
        <li>
          <SignOutButton />
        </li>
      )}
      {status === "unauthenticated" && (
        <li>
          <SignInButtonBig />
        </li>
      )}
    </ul>
  );
};

export default SideBar;
