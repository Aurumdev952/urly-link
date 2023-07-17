import { getServerSideSession } from "@/utils/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
export default function Index() {
  return (
    <main>
      <div className="flex flex-col w-full py-32 justify-center items-center gap-8">
        <h1 className="text-5xl">Urly</h1>
        <p>Next Gen Magic Link</p>
      </div>
      <div className="flex justify-center gap-4">
        <Link href={"/dashboard"} className="btn btn-sm">
          Get Started
        </Link>
        <button className="btn btn-sm">Learn more</button>
      </div>
    </main>
  );
}
