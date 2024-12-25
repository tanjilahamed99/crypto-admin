"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import useGetAllUsers from "@/hooks/useGetAllUsers/useGetAllUsers";
import UpLine from "@/components/UpLine/UpLine";
import RegistrationFunction from "@/components/RegistationFunction";
import DownLine from "@/components/DownLine/DownLine";
import MonthlyUpLine from "./MonthlyUpLine";
import MonthlyDownLine from "./MonthlyDownLine";

const AdminRoyaltySalary = () => {
  const { data: user } = useSession() || {};
  const [allUsers, refetch] = useGetAllUsers({
    adminId: user?.user?._id,
    adminEmail: user?.user?.email,
    wallet: user?.user?.wallet,
  });
  const [filterText, setFilterText] = useState("");
  const [allUsersData, setAlUsersData] = useState([]);

  const handleFilter = (e) => {
    setFilterText(e.target.value);
  };

  useEffect(() => {
    if (filterText.trim().length > 0) {
      // Filter users based on name (case-insensitive)
      const filtered = allUsers.filter((user) =>
        user?.username?.toLowerCase()?.includes(filterText?.toLowerCase())
      );
      setAlUsersData(filtered);
    } else {
      setAlUsersData(allUsers);
    }
  }, [filterText]);

  useEffect(() => {
    if (allUsers?.length > 0) {
      setAlUsersData(allUsers);
    }
  }, [allUsers]);

  return (
    <div>
      <h2 className="text-white text-2xl font-bold my-5">Royalty Salary</h2>

      <label className="input input-bordered flex items-center gap-2 mb-2 w-[50%] lg:w-[30%] mx-auto">
        <input
          onChange={handleFilter}
          type="text"
          className="grow text-black bg-white"
          placeholder="Search"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-white">
              <th className="whitespace-nowrap">No.</th>
              <th className="whitespace-nowrap">User Name</th>
              <th className="whitespace-nowrap">UserId</th>
              <th className="whitespace-nowrap">Wallet</th>
              <th className="whitespace-nowrap">Up Line</th>
              <th className="whitespace-nowrap">Down Line</th>
              <th className="whitespace-nowrap">Monthly Up Line</th>
              <th className="whitespace-nowrap">Monthly Down Line</th>
              <th className="whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsersData?.map((item, idx) => (
              <tr className="text-white mx-auto" key={idx}>
                <th className="whitespace-nowrap">{idx + 1}</th>
                <th className="whitespace-nowrap">{item?.username}</th>
                <th className="whitespace-nowrap">
                  {item?._id?.slice(0, 5)}... {item?._id?.slice(19, 24)}
                </th>
                <th className="whitespace-nowrap">{item?.wallet}</th>
                <th className="whitespace-nowrap">
                  <UpLine id={item?._id} />
                </th>
                <th className="whitespace-nowrap">
                  <DownLine id={item?._id} />
                </th>
                <th className="whitespace-nowrap">
                  <MonthlyUpLine userid={item?._id} />
                </th>
                <th className="whitespace-nowrap">
                  <MonthlyDownLine id={item?._id} />
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
