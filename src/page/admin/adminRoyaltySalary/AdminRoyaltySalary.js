"use client";
import { useSession } from "next-auth/react";
import React from "react";
import useGetAllUsers from "@/hooks/useGetAllUsers/useGetAllUsers";
import UpLine from "@/components/UpLine/UpLine";
import SendRoyaltySalary from "./SendRoyaltySalary";
import RegistrationFunction from "@/components/RegistationFunction";

const AdminRoyaltySalary = () => {
  const { data: user } = useSession() || {};
  const [allUsers, refetch] = useGetAllUsers({
    adminId: user?.user?._id,
    adminEmail: user?.user?.email,
    wallet: user?.user?.wallet,
  });

  return (
    <div>
      <h2 className="text-white text-2xl font-bold my-5">Royalty Salary</h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-white">
              <th className="whitespace-nowrap">No.</th>
              <th className="whitespace-nowrap">UserId</th>
              <th className="whitespace-nowrap">Wallet</th>
              <th className="whitespace-nowrap">Up Line</th>
              <th className="whitespace-nowrap">Down Line</th>
              <th className="whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.map((item, idx) => (
              <tr className="text-white mx-auto" key={idx}>
                <th className="whitespace-nowrap">{idx + 1}</th>
                <th className="whitespace-nowrap">
                  {item?._id?.slice(0, 5)}... {item?._id?.slice(19, 24)}
                </th>
                <th className="whitespace-nowrap">{item?.wallet}</th>
                <th className="whitespace-nowrap">
                  <UpLine id={item?._id} />
                </th>
                <th className="whitespace-nowrap">
                  <UpLine id={item?._id} />
                </th>
                <th className="whitespace-nowrap">
                  <RegistrationFunction />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRoyaltySalary;
