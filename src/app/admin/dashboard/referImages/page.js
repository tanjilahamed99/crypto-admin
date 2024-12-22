"use client";
import { BASE_URL } from "@/constant/constant";
import useGetWebsiteData from "@/hooks/useGetWebsiteData/userGetWebsiteData";
import SaveFaq from "@/page/admin/SaveFaq/SaveFaq";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import Swal from "sweetalert2";

const ReferImages = () => {
  const [websiteData, refetch] = useGetWebsiteData();
  const [lotteryImg, setLotteryImg] = useState("");
  const { data: user } = useSession();

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let referImages = websiteData?.referImages?.filter(
            (item) => item !== id
          );
          const mainData = {
            referImages,
          };
          const url = `${BASE_URL}/admin/faq/${user?.user?._id}/${user?.user?.email}/${user?.user?.wallet}/others`;

          const { data } = await axios.post(url, mainData);
          console.log(data);
          if (data?.status) {
            refetch();
            document.getElementById("my_modal_1").close();
            Swal.fire({
              title: "Good job!",
              text: "Same data changed",
              icon: "success",
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
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

  const handle = async () => {
    if (!lotteryImg) {
      return;
    }

    let referImages = [];

    if (websiteData?.referImages?.length > 0) {
      referImages = [lotteryImg, ...websiteData?.referImages];
    } else {
      referImages = [lotteryImg];
    }

    const mainData = {
      referImages,
    };
    const url = `${BASE_URL}/admin/faq/${user?.user?._id}/${user?.user?.email}/${user?.user?.wallet}/others`;

    const { data } = await axios.post(url, mainData);
    console.log(data);
    if (data?.status) {
      setLotteryImg("");
      refetch();
      document.getElementById("my_modal_1").close();
      Swal.fire({
        title: "Good job!",
        text: "Same data changed",
        icon: "success",
      });
    }
  };

  return (
    <div className="md:mt-5">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-white text-2xl font-bold my-5">Refer Images</h2>
        <button
          onClick={() => document.getElementById("my_modal_1").showModal()}
          className="bg-primary font-semibold border-none h-8 w-28 text-white hover:bg-[#f2a74b] rounded-lg"
        >
          Add Lottery
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center lg:grid-cols-4 gap-5">
        {websiteData?.referImages?.map((item, idx) => (
          <div key={idx}>
            <Image
              src={item}
              height={500}
              width={500}
              alt="image not found"
              className="h-40 w-full"
            />

            <button
              onClick={() => handleDelete(item)}
              className="px-5 py-2 bg-red-600 hover:bg-red-700 mt-2 rounded-md mx-auto flex text-sm text-white"
            >
              Delete
            </button>
          </div>
        ))}
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
          <div className="text-white space-y-3">
            <div>
              <h2 className="text-white font-semibold  mb-1">Image Link</h2>
              <div className="flex flex-col md:flex-row justify-between gap-5">
                <input
                  name="image"
                  type="text"
                  placeholder="Ex: http.."
                  required
                  className="w-full pl-2 py-2  rounded-md text-black bg-white"
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
            <button
              onClick={handle}
              className="bg-primary font-semibold border-none h-10 w-28 text-white hover:bg-[#f2a74b] rounded-lg"
            >
              Create
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ReferImages;
