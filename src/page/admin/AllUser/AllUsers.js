"use client";
import useGetAllUsers from "@/hooks/useGetAllUsers/useGetAllUsers";
import { useSession } from "next-auth/react";
import Link from "next/link";

const AllUsers = () => {
  const { data: user } = useSession() || {};
  const [allUsers, refetch] = useGetAllUsers({
    adminId: user?.user?._id,
    adminEmail: user?.user?.email,
    wallet: user?.user?.wallet,
  });

  return (
    <div>
      <h2 className="text-white text-2xl font-bold my-5">
        All Users Information
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-white">
              <th className="whitespace-nowrap">Name</th>
              <th className="whitespace-nowrap">email</th>
              <th className="whitespace-nowrap">Wallet</th>
              <th className="whitespace-nowrap">Role</th>
              <th className="whitespace-nowrap">View</th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.map((item, idx) => (
              <tr className="text-white mx-auto" key={idx}>
                <th className="whitespace-nowrap">{item?.username}</th>
                <th className="whitespace-nowrap">{item?.email}</th>
                <th className="whitespace-nowrap">
                  {item?.wallet?.slice(0, 7)}...{item?.wallet?.slice(12, 20)}
                </th>
                <th className="whitespace-nowrap">{item?.role}</th>
                <th className="whitespace-nowrap">
                  <Link
                    href={`/admin/dashboard/allUser/viewUser?id=${item?._id}`}
                  >
                    {" "}
                    <button className="px-5 py-2 bg-primary rounded-md hover:bg-yellow-600">
                      View
                    </button>
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
