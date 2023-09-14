"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { PiSignOutFill } from "react-icons/pi";

export const SignInButtonBig: React.FC = () => {
  const { status } = useSession();
  if (status !== "unauthenticated") {
    return null;
  } else {
    return (
      <button className="btn btn-sm" onClick={() => void signIn("google")}>
        <FcGoogle /> sign in with google
      </button>
    );
  }
};
export const SignInButtonSmall: React.FC = () => {
  return (
    <button className="btn btn-sm" onClick={() => void signIn("google")}>
      <FcGoogle /> sign in
    </button>
  );
};
export const SignOutButton: React.FC = () => {
  return (
    <button className="btn btn-sm" onClick={() => void signOut()}>
      <PiSignOutFill /> log out
    </button>
  );
};
