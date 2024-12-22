"use client";

import UploadImage from "@/components/UploadImge/UploadImage";
import { BASE_URL } from "@/constant/constant";
import useGetWebsiteData from "@/hooks/useGetWebsiteData/userGetWebsiteData";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const RegisterInfo = () => {
  const [websiteData, refetch] = useGetWebsiteData();
  const { data: user } = useSession();

  const handleSetNewData = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fee = form.fee.value;
    const wallet = form.wallet.value;
    const referReward = form.referReward.value;
    const role1 = form.role1.value;
    const role2 = form.role2.value;
    const role3 = form.role3.value;
    const role4 = form.role4.value;
    const mainData = {
      register: {
        fee,
        wallet,
        ruleOne: role1,
        ruleTwo: role2,
        ruleThree: role3,
        ruleFour: role4,
        referReward,
      },
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
        <h2 className="text-white text-2xl font-bold my-5">
          Register Information
        </h2>
      </div>
      <form
        onSubmit={handleSetNewData}
        className="border-gray-700 border p-5 space-y-10"
      >
        <div className="space-y-2">
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-white font-semibold  mb-1">Fee</h2>
              <input
                placeholder="Type here"
                className="input input-bordered w-full bg-white text-black"
                name="fee"
                defaultValue={websiteData?.register?.fee}
              />
            </div>
            <div>
              <h2 className="text-white font-semibold  mb-1">Fee Wallet</h2>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full bg-white text-black"
                name="wallet"
                defaultValue={websiteData?.register?.wallet}
              />
            </div>
            <div>
              <h2 className="text-white font-semibold  mb-1">Refers Reward</h2>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full bg-white text-black"
                name="referReward"
                defaultValue={websiteData?.register?.referReward}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-white font-semibold  mb-1 text-2xl mt-10">
              Rules
            </h2>
            <div>
              <h2 className="text-white font-semibold  mb-1">Role - 1</h2>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full bg-white text-black"
                name="role1"
                defaultValue={websiteData?.register?.ruleOne}
              />
            </div>
            <div>
              <h2 className="text-white font-semibold  mb-1">Role - 2</h2>
              <input
                placeholder="Type here"
                className="input input-bordered w-full bg-white text-black"
                name="role2"
                defaultValue={websiteData?.register?.ruleTwo}
              />
            </div>
            <div>
              <h2 className="text-white font-semibold  mb-1">Role - 3</h2>
              <input
                placeholder="Type here"
                className="input input-bordered w-full bg-white text-black"
                name="role3"
                defaultValue={websiteData?.register?.ruleThree}
              />
            </div>
            <div>
              <h2 className="text-white font-semibold  mb-1">Role - 4</h2>
              <input
                placeholder="Type here"
                className="input input-bordered w-full bg-white text-black"
                name="role4"
                defaultValue={websiteData?.register?.ruleFour}
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

export default RegisterInfo;
