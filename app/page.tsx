"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Index() {
  const { data, status } = useSession();
  return (
    <div className="flex flex-col justify-center items-center gap-4 bg-white">
      {status}
      {status === "authenticated" && <>{data.user?.email}</>}
      <button onClick={() => void signIn("google")}>sign in</button>
    </div>
  );
}
