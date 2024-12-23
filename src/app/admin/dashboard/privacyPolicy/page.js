"use client";
import { BASE_URL } from "@/constant/constant";
import useGetWebsiteData from "@/hooks/useGetWebsiteData/userGetWebsiteData";
import axios from "axios";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

const PrivacyPolicy = () => {
  const [websiteData, refetch] = useGetWebsiteData();
  const { data: user } = useSession();
  const handleSetNewData = async (e) => {
    e.preventDefault();
    const form = e.target;
    const privacyPolicy = form.privacyPolicy.value;
    const mainData = {
      privacyPolicy,
    };

    const url = `${BASE_URL}/admin/faq/${user?.user?._id}/${user?.user?.email}/${user?.user?.wallet}/others`;

    const { data } = await axios.post(url, mainData);
    if (data?.status) {
      refetch();
      Swal.fire({
        title: "Good job!",
        text: "Data Saved",
        icon: "success",
      });
    }
  };

  return (
    <div className="">
      <div>
        <div className="flex justify-between items-center px-2">
          <h2 className="text-white text-2xl font-bold my-5">Privacy Policy</h2>
        </div>

        <form
          onSubmit={handleSetNewData}
          className="border-gray-700 border p-5 space-y-10"
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 w-full">
              <textarea
                className="textarea textarea-bordered w-full text-black bg-white h-80"
                placeholder="Privacy Policy"
                name="privacyPolicy"
                defaultValue={websiteData?.privacyPolicy}
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary  text-md font-semibold border-none h-10 w-28 hover:bg-[#f2a74b] rounded-lg text-white"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
