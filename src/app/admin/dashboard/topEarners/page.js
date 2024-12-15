"use client";

import TopEarnersCard from "@/components/TopEarnersCard";
import { BASE_URL } from "@/constant/constant";
import useGetWebsiteData from "@/hooks/useGetWebsiteData/userGetWebsiteData";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import Swal from "sweetalert2";

const TopEarners = () => {
  const [lotteryImg, setLotteryImg] = useState("");
  const [websiteData, refetch] = useGetWebsiteData();
  const { data: user } = useSession();

  const handleCreateLottery = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const userId = form.userId.value;
    const profit = form.profit.value;
    const partner = form.partner.value;
    const team = form.team.value;

    let topEarners = [];
    if (websiteData?.topEarners?.length > 0) {
      topEarners = [
        { name, userId, profit, partner, team, image: lotteryImg },
        ...websiteData?.topEarners,
      ];
    } else {
      topEarners = [{ name, userId, profit, partner, team, image: lotteryImg }];
    }

    const mainData = {
      topEarners,
    };

    const url = `${BASE_URL}/admin/faq/${user?.user?._id}/${user?.user?.email}/${user?.user?.wallet}/others`;
    const { data } = await axios.post(url, mainData);
    if (data?.status) {
      document.getElementById("my_modal_1").close();
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
      });
      refetch();
      form.reset();
    }
  };

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      // Send the image to ImgBB
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=9fa3cb8e4f8295683436ab614de928c1`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Get the image URL from the response
      const imageUrl = response.data.data.url;
      console.log("Image uploaded successfully:", imageUrl);

      // Save the image URL to state or use it as needed
      setLotteryImg(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      {" "}
      <div className="flex justify-between items-center px-2">
        <h2 className="text-white text-2xl font-bold my-5">Top Earners</h2>
        <button
          onClick={() => document.getElementById("my_modal_1").showModal()}
          className="bg-primary font-semibold border-none h-8 w-28 text-white hover:bg-[#f2a74b] rounded-lg"
        >
          Add Earners
        </button>
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
          <form onSubmit={handleCreateLottery} className="text-white space-y-3">
            <div>
              <h2 className="text-white font-semibold  mb-1">Name</h2>
              <input
                type="text"
                name="name"
                placeholder="Ex: Name"
                required
                className="w-full pl-2 py-2 rounded-md"
              />
            </div>
            <div>
              <h2 className="text-white font-semibold  mb-1">User Id</h2>
              <input
                name="userId"
                placeholder="Ex: User Id"
                required
                className="w-full pl-2 py-2 rounded-md"
              />
            </div>
            <div>
              <h2 className="text-white font-semibold  mb-1">Total Profit</h2>
              <input
                type="number"
                name="profit"
                placeholder="Ex: Profit"
                required
                className="w-full pl-2 py-2 rounded-md"
              />
            </div>
            <div>
              <h2 className="text-white font-semibold  mb-1">Total Partner</h2>
              <input
                type="number"
                name="partner"
                placeholder="Ex: partner"
                required
                className="w-full pl-2 py-2 rounded-md"
              />
            </div>
            <div>
              <h2 className="text-white font-semibold  mb-1">Total Team</h2>
              <input
                type="number"
                name="team"
                placeholder="Ex: team"
                required
                className="w-full pl-2 py-2 rounded-md"
              />
            </div>
            <div>
              <h2 className="text-white font-semibold  mb-1">Image Link</h2>
              <div className="flex flex-col md:flex-row justify-between gap-5">
                <input
                  name="image"
                  type="text"
                  placeholder="Ex: http.."
                  required
                  className="w-full pl-2 py-2  rounded-md"
                  defaultValue={lotteryImg}
                />
                <div>
                  <label
                    htmlFor="type3-2"
                    className="flex w-full max-w-[170px]"
                  >
                    <p className="w-max truncate rounded-full hover:shadow-[0px_0px_4px_0.5px] border-[3px] border-green-500 px-6 py-1.5 font-medium text-green-500 shadow-md">
                      {"CHOOSE FILE"}
                    </p>
                  </label>
                  <input
                    onChange={handleImageUpload}
                    className="hidden"
                    type="file"
                    name=""
                    id="type3-2"
                  />
                </div>
              </div>
            </div>

            <button className="bg-primary font-semibold border-none h-10 w-28 text-white hover:bg-[#f2a74b] rounded-lg">
              Create
            </button>
          </form>
        </div>
      </dialog>
      <div className="grid items-center gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {websiteData?.topEarners?.map((item, idx) => (
          <TopEarnersCard data={item} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default TopEarners;
