"use client";

import { BASE_URL } from "@/constant/constant";
import useGetUserData from "@/hooks/useGetUserCartDara/useGetUserData";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";
import Swal from "sweetalert2";

const UpdateAdminInfo = ({ searchParams }) => {
  const id = searchParams?.id;
  const { data: user } = useSession();
  const [userData] = useGetUserData({
    adminId: user?.user?._id,
    adminEmail: user?.user?.email,
    wallet: user?.user?.wallet,
    id,
  });
  const [seen, setSeen] = useState(false);
  const router = useRouter();

  const handleUpdateAdminData = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const wallet = form.wallet.value;
    const picture = form.picture.value;

    const updateData = { username: name, email, password, wallet, picture };
    try {
      const { data } = await axios.put(
        `${BASE_URL}/admin/updateAdmin/${user?.user?._id}/${user?.user?.email}/${user?.user?.wallet}/${id}`,
        updateData
      );
      if (data?.result?.modifiedCount > 0) {
        Swal.fire({
          title: "Completed!",
          text: "Update Completed",
          icon: "success",
        });
        router.push("/admin/dashboard/manageUsers");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2 className="text-white text-2xl font-bold my-5">
        Update Admin Information
      </h2>

      <form
        className="border-gray-600 border p-2 rounded-md md:p-4 space-y-3 grid items-center grid-cols-1 lg:grid-cols-2 gap-5"
        onSubmit={handleUpdateAdminData}
      >
        <div>
          <h2 className="text-white font-semibold  mb-1">Name</h2>
          <input
            type="name"
            name="name"
            placeholder="Ex: Jack"
            required
            className="w-full pl-2 py-2 rounded-md"
            defaultValue={userData?.userData?.username}
          />
        </div>
        <div>
          <h2 className="text-white font-semibold  mb-1">Email</h2>
          <input
            name="email"
            placeholder="Ex: example@gmail.com"
            required
            className="w-full pl-2 py-2 rounded-md"
            defaultValue={userData?.userData?.email}
            type="email"
          />
        </div>
        <div>
          <h2 className="text-white font-semibold  mb-1">Picture</h2>
          <input
            name="picture"
            placeholder="Ex: example@gmail.com"
            required
            className="w-full pl-2 py-2 rounded-md"
            defaultValue={userData?.userData?.picture}
          />
        </div>
        <div>
          <h2 className="text-white font-semibold  mb-1">Wallet</h2>
          <input
            name="wallet"
            placeholder="Ex: ox349"
            required
            className="w-full pl-2 py-2 rounded-md"
            defaultValue={userData?.userData?.wallet}
          />
        </div>
        <div className="relative">
          <h2 className="text-white font-semibold  mb-1">Password</h2>
          <input
            type={`${seen ? "text" : "password"}`}
            name="password"
            placeholder="Ex: password"
            required
            className="w-full pl-2 py-2 rounded-md"
            defaultValue={userData?.userData?.password}
          />
          <div className="absolute  text-xl right-3 top-10">
            {seen ? (
              <IoMdEye onClick={() => setSeen(false)} />
            ) : (
              <IoEyeOff onClick={() => setSeen(true)} />
            )}
          </div>
        </div>
        <button className="bg-primary lg:col-span-2 font-semibold border-none h-10 w-28 text-white hover:bg-[#f2a74b] rounded-lg">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateAdminInfo;
