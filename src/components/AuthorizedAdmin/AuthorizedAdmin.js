"use client";

import { useAddress } from "@thirdweb-dev/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthorizedAdmin = ({ children }) => {
  const { data: user, status } = useSession() || {};
  const wallet = useAddress();
  const router = useRouter();
  if (status === "loading") {
    return (
      <span className="loading loading-spinner  loading-lg text-white bg-white h-[100vh] mx-auto flex justify-center"></span>
    );
  }

  if (user?.user?.role !== "admin") {
    return router.push("/");
  }

  return (
    <div className="bg-black">
      <div className=" mb-10">
        {!user && (
          <div className="flex flex-col gap-2 justify-center items-center my-10 h-[30vh] lg:h-[50vh]">
            <h2 className="text-white text-2xl font-bold">Not Authorized</h2>
            <Link href={"/"}>
              {" "}
              <button className="bg-primary  text-md font-semibold border-none h-10 w-28 hover:bg-[#f2a74b] rounded-lg ">
                Go to Home
              </button>
            </Link>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default AuthorizedAdmin;
