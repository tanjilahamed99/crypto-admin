"use client";
import useGetAdminInfo from "@/hooks/useGetAllUsers/useGetAdminInfo";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { MdDeleteSweep } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import Swal from "sweetalert2";
import { IoMdEye } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constant/constant";

const ManageUsers = () => {
  const { data: user } = useSession() || {};
  const [admins, validate] = useGetAdminInfo({
    adminId: user?.user?._id,
    adminEmail: user?.user?.email,
    wallet: user?.user?.wallet,
  });

  const [seen, setSeen] = useState(false);
  const date = Date();
  const [error, setError] = useState("");

  const handleDelete = (id) => {
    console.log(id);
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
          console.log(result);
          if (data?.status) {
            validate();
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

  const handleCreateNewAdmin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const wallet = form.wallet.value;

    setError("");

    const newAdmin = {
      username: name,
      email,
      password,
      wallet,
      joined: date,
      referBy: user?.user?._id,
      role: "admin",
    };

    try {
      const { data } = await axios.post(
        `${BASE_URL}/admin/createAdmin/${user?.user?._id}/${user?.user?.email}/${user?.user?.wallet}`,
        newAdmin
      );
      if (data?.status) {
        document.getElementById("my_modal_1").close();
        Swal.fire({
          title: "Created!",
          text: "New Admin Created",
          icon: "success",
        });
        validate();
        form?.reset();
      }
      if (!data?.status) {
        setError(data?.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-white text-2xl font-bold my-5">Manage Users</h2>
        <button
          onClick={() => document.getElementById("my_modal_1").showModal()}
          className="bg-primary px-5 py-2 rounded-md text-white font-semibold md:mr-5"
        >
          Add Admin
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-white">
              <th className="whitespace-nowrap">Name</th>
              <th className="whitespace-nowrap">email</th>
              <th className="whitespace-nowrap">Wallet</th>
              <th className="whitespace-nowrap">Role</th>
              <th className="whitespace-nowrap">Action</th>
              <th className="whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {admins?.result?.map((item, idx) => (
              <tr className="text-white mx-auto" key={idx}>
                <th className="whitespace-nowrap">{item?.username}</th>
                <th className="whitespace-nowrap">{item?.email}</th>
                <th className="whitespace-nowrap">
                  {item?.wallet}
                </th>
                <th className="whitespace-nowrap">{item?.role}</th>
                <th className="whitespace-nowrap">
                  <Link
                    href={`/admin/dashboard/manageUsers/updateAdmin?id=${item?._id}`}
                  >
                    <button>
                      <MdOutlineModeEdit className="text-green-700 text-3xl" />
                    </button>
                  </Link>
                </th>
                <th className="whitespace-nowrap">
                  <button onClick={() => handleDelete(item?._id)}>
                    <MdDeleteSweep className="text-red-500 text-3xl" />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-gray-600 text-white pt-0">
          <div className="modal-action">
            <form method="dialog">
              <button>
                <RxCross1 />
              </button>
            </form>
          </div>
          <form
            onSubmit={handleCreateNewAdmin}
            className="text-black space-y-3"
          >
            <div>
              <h2 className="text-white font-semibold  mb-1">Name</h2>
              <input
                type="name"
                name="name"
                placeholder="Ex: Jack"
                required
                className="w-full pl-2 py-2 rounded-md text-black bg-white"
              />
            </div>
            <div>
              <h2 className="text-white font-semibold  mb-1">Email</h2>
              <input
                name="email"
                placeholder="Ex: example@gmail.com"
                required
                className="w-full pl-2 py-2 rounded-md text-black bg-white"
                type="email"
              />
            </div>
            <div>
              <h2 className="text-white font-semibold  mb-1">Wallet</h2>
              <input
                name="wallet"
                placeholder="Ex: ox349"
                required
                className="w-full pl-2 py-2 rounded-md text-black bg-white"
              />
            </div>
            <div className="relative">
              <h2 className="text-white font-semibold  mb-1">Password</h2>
              <input
                type={`${seen ? "text" : "password"}`}
                name="password"
                placeholder="Ex: password"
                required
                className="w-full pl-2 py-2 rounded-md text-black bg-white"
              />
              <div className="absolute  text-xl right-3 top-10">
                {seen ? (
                  <IoMdEye onClick={() => setSeen(false)} />
                ) : (
                  <IoEyeOff onClick={() => setSeen(true)} />
                )}
              </div>
            </div>
            <button className="bg-primary font-semibold border-none h-10 w-28 text-white hover:bg-[#f2a74b] rounded-lg">
              Add
            </button>

            <h2 className="text-sm text-primary font-extrabold">{error}</h2>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageUsers;
