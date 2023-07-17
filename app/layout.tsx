import { NextAuthProvider } from "@/components/Provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "urly",
  description: "next gen magic link",
};
import React from "react";
import {
  SignInButtonBig,
  SignInButtonSmall,
  SignOutButton,
} from "@/components/AuthButtons";
import Link from "next/link";
import { getServerSideSession } from "@/utils/auth";
import { useSession } from "next-auth/react";
import Profile from "@/components/Profile";
import SideBar from "@/components/SideBar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="synthwave">
      <body className={inter.className}>
        <NextAuthProvider>
          <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
              {/* Navbar */}
              <div className="w-full navbar bg-base-300">
                <div className="flex-none lg:hidden">
                  <label
                    htmlFor="my-drawer-3"
                    className="btn btn-square btn-ghost"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block w-6 h-6 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                  </label>
                </div>
                <div className="flex-1 px-2 mx-2">
                  <Link href={"/"}>Urly</Link>
                </div>
                <div className="flex-none hidden lg:block">
                  <ul className="menu menu-horizontal">
                    {/* Navbar menu content here */}
                    <li>
                      <SignInButtonBig />
                    </li>
                  </ul>
                </div>
                <Profile />
              </div>
              {children}
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
              <SideBar />
            </div>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
