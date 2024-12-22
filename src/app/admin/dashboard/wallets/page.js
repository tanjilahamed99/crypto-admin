"use client";

import UploadImage from "@/components/UploadImge/UploadImage";
import { BASE_URL } from "@/constant/constant";
import useGetWebsiteData from "@/hooks/useGetWebsiteData/userGetWebsiteData";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Wallets = () => {
  const [websiteData, refetch] = useGetWebsiteData();
  const { data: user } = useSession();

  const handleSetNewData = async (e) => {
    e.preventDefault();
    const form = e.target;
    const lottery = form.lottery.value;
    const proProgram = form.proProgram.value;
    const royaltySalary = form.royaltySalary.value;
    const mainData = {
      wallets: { lottery, proProgram, royaltySalary },
    };
    const url = `${BASE_URL}/admin/faq/${user?.user?._id}/${user?.user?.email}/${user?.user?.wallet}/others`;

    const { data } = await axios.post(url, mainData);
    if (data?.status) {
      refetch();
      Swal.fire({
        title: "Good job!",
        text: "Same data changed",
        icon: "success",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center px-2">
        <h2 className="text-white text-2xl font-bold my-5">Wallets</h2>
      </div>
      <form
        onSubmit={handleSetNewData}
        className="border-gray-700 border p-5 space-y-10"
      >
        <div className="space-y-2">
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-white font-semibold  mb-1">Lottery Wallet</h2>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full text-black bg-white"
                name="lottery"
                defaultValue={websiteData?.wallets?.lottery}
              />
            </div>
            <div>
              <h2 className="text-white font-semibold  mb-1">
                Pro Program Wallet
              </h2>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full text-black bg-white"
                name="proProgram"
                defaultValue={websiteData?.wallets?.proProgram}
              />
            </div>
            <div>
              <h2 className="text-white font-semibold  mb-1">
                Royalty Salary Wallet
              </h2>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full text-black bg-white"
                name="royaltySalary"
                defaultValue={websiteData?.wallets?.royaltySalary}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary  text-md font-semibold border-none h-10 w-28 hover:bg-[#f2a74b] rounded-lg text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Wallets;
