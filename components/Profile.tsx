"use client";

import { useSession } from "next-auth/react";

const Profile: React.FC = () => {
  const { data, status } = useSession();
  console.log(data?.user);

  return (
    <>
      {status === "authenticated" && (
        <div className="flex gap-3">
          <p>{data.user?.name}</p>
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={data.user?.image ?? ""} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
