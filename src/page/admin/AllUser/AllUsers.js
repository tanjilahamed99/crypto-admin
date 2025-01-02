"use client";
import { BASE_URL } from "@/constant/constant";
import useGetAllUsers from "@/hooks/useGetAllUsers/useGetAllUsers";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdBlock } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Swal from "sweetalert2";
const AllUsers = () => {
  const { data: user } = useSession() || {};
  const [allUsers, refetch] = useGetAllUsers({
    adminId: user?.user?._id,
    adminEmail: user?.user?.email,
    wallet: user?.user?.wallet,
  });
  const [filterText, setFilterText] = useState("");
  const [allUsersData, setAlUsersData] = useState([]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.delete(
            `${BASE_URL}/admin/deleteAdmin/${user?.user?._id}/${user?.user?.email}/${user?.user?.wallet}/${id}`
          );
          if (data?.status) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Admin has been deleted.",
              icon: "success",
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };
  const handleBlock = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to block him",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Block it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.put(
            `${BASE_URL}/admin/blockUser/${user?.user?._id}/${user?.user?.email}/${user?.user?.wallet}/${id}`,
            { block: true }
          );
          if (data?.status) {
            refetch();
            Swal.fire({
              title: "Success",
              text: "User Blocked Completed.",
              icon: "success",
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };
  const handleUnBlock = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to un block him",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Un Block",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.put(
            `${BASE_URL}/admin/blockUser/${user?.user?._id}/${user?.user?.email}/${user?.user?.wallet}/${id}`,
            { block: false }
          );
          if (data?.status) {
            refetch();
            Swal.fire({
              title: "Success",
              text: "User Blocked Completed.",
              icon: "success",
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

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
  }, [filterText, allUsers]);

  useEffect(() => {
    if (allUsers?.length > 0) {
      setAlUsersData(allUsers);
    }
  }, [allUsers]);

  return (
    <div>
      <h2 className="text-white text-2xl font-bold my-5">
        All Users Information
      </h2>

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
              <th className="whitespace-nowrap">Name</th>
              <th className="whitespace-nowrap">email</th>
              <th className="whitespace-nowrap">Wallet</th>
              <th className="whitespace-nowrap">Role</th>
              <th className="whitespace-nowrap">View</th>
              <th className="whitespace-nowrap">Delete</th>
              <th className="whitespace-nowrap">Black</th>
            </tr>
          </thead>
          <tbody>
            {allUsersData?.map((item, idx) => (
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
                    <button className="px-5 py-2 bg-primary rounded-md hover:bg-yellow-600">
                      View
                    </button>
                  </Link>
                </th>
                <th className="whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(item?._id)}
                    className="px-5 py-2 bg-red-600 rounded-md hover:bg-red-700"
                  >
                    <RiDeleteBin5Fill className="text-xl" />
                  </button>
                </th>
                <th className="whitespace-nowrap">
                  {item?.block ? (
                    <button
                      onClick={() => handleUnBlock(item?._id)}
                      className="px-5 py-2 bg-green-600 rounded-md "
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlock(item?._id)}
                      className="px-5 py-2 bg-red-600 rounded-md hover:bg-red-800"
                    >
                      Block
                    </button>
                  )}
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
