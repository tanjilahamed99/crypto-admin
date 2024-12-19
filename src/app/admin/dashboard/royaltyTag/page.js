"use client";

import { BASE_URL } from "@/constant/constant";
import useGetWebsiteData from "@/hooks/useGetWebsiteData/userGetWebsiteData";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import Swal from "sweetalert2";

const RoyaltyTag = () => {
  const [websiteData, refetch] = useGetWebsiteData();
  const { data: user } = useSession();
  const [lotteryImg, setLotteryImg] = useState("");

  const handleCreateLottery = async (e) => {
    e.preventDefault();
    const form = e.target;
    let royaltyTag = [];

    if (websiteData?.royaltyTag?.length > 0) {
      royaltyTag = [lotteryImg, ...websiteData?.royaltyTag];
    } else {
      royaltyTag = [lotteryImg];
    }

    const royaltyTagData = {
      royaltyTag,
    };

    const url = `${BASE_URL}/admin/faq/${user?.user?._id}/${user?.user?.email}/${user?.user?.wallet}/others`;

    const { data } = await axios.post(url, royaltyTagData);

    if (data?.status) {
      document.getElementById("my_modal_1").close();
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
      });
      refetch();
      form.reset();
      setLotteryImg("");
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
        let royaltyTag = websiteData?.royaltyTag?.filter((item) => item !== id);
        const royaltyTagData = {
          royaltyTag,
        };
        const url = `${BASE_URL}/admin/faq/${user?.user?._id}/${user?.user?.email}/${user?.user?.wallet}/others`;
        const { data } = await axios.post(url, royaltyTagData);
        if (data?.status) {
          document.getElementById("my_modal_1").close();
          Swal.fire({
            title: "Deleted",
            text: "Deleted Completed",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center px-2">
        <h2 className="text-white text-2xl font-bold my-5">Royalty Tag</h2>
        <button
          onClick={() => document.getElementById("my_modal_1").showModal()}
          className="bg-primary font-semibold border-none h-8 w-28 text-white hover:bg-[#f2a74b] rounded-lg"
        >
          Add Tag
        </button>
      </div>

      {/* create lottery */}
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
        {websiteData?.royaltyTag?.map((item, idx) => (
          <div
            className="text-white mx-auto border border-gray-700 p-2 md:p-5 rounded-md"
            key={idx}
          >
            <div className="whitespace-nowrap space-y-3">
              <Image
                alt="'image not found"
                height={200}
                width={200}
                src={item}
                className="h-40 w-40"
              />
              <button
                onClick={() => handleDelete(item)}
                className="text-white bg-red-500 hover:bg-red-700 rounded-md px-4 py-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoyaltyTag;
