"use client";

import { BASE_URL } from "@/constant/constant";
import useGetSingleProgramsDataById from "@/hooks/useProPrograms/UseGetSingleProgram";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

const EditProgram = ({ searchParams }) => {
  const id = searchParams?.id;
  const [program, refetch] = useGetSingleProgramsDataById({ id });
  const { data: user } = useSession();
  const router = useRouter();
  const [lotteryImg, setLotteryImg] = useState(program?.program?.image || "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const price = form.price.value;
    const title = form.title.value;

    const newSlotData = {
      price,
      title,
      image: lotteryImg,
    };

    try {
      const url = `${BASE_URL}/admin/proprogram/${user?.user?._id}/${user?.user?.email}/${user?.user?.wallet}/${id}`;
      const { data } = await axios.put(url, newSlotData);
      if (data?.result?.modifiedCount > 0) {
        Swal.fire({
          title: "Good job!",
          text: "Update complete",
          icon: "success",
        });
        refetch();
        router.push("/admin/dashboard/proProgram");
      }
    } catch (err) {
      console.log(err);
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
    <div className="w-full md:w-[70%] lg:w-[50%] mx-auto md:my-40 border border-gray-500 p-5 ">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Update Pro Program
      </h2>
      <form onSubmit={handleUpdate} className="text-black space-y-3">
        <div>
          <h2 className="text-white font-semibold  mb-1">Title</h2>
          <input
            name="title"
            placeholder="Ex: title"
            required
            className="w-full pl-2 py-2 rounded-md"
            defaultValue={program?.program?.title}
          />
        </div>
        <div>
          <h2 className="text-white font-semibold  mb-1">Price</h2>
          <input
            name="price"
            placeholder="Ex: Price"
            required
            className="w-full pl-2 py-2 rounded-md"
            defaultValue={program?.program?.price}
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
              <label htmlFor="type3-2" className="flex w-full max-w-[170px]">
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
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProgram;
