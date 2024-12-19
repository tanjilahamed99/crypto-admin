"use client";

import { BASE_URL } from "@/constant/constant";
import useGetAllUpdates from "@/hooks/useGetAllUpdates/useGetAllUpdates";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import Swal from "sweetalert2";

const AdminAllUpdates = () => {
  const [allUpdates, refetch] = useGetAllUpdates();
  const [lotteryImg, setLotteryImg] = useState("");
  const { data: user } = useSession();
  const date = Date();

  const handleCreateUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const desc = form.desc.value;

    const updatesData = {
      title,
      image: lotteryImg,
      description: desc,
      date,
    };

    const url = `${BASE_URL}/admin/updates/${user?.user?._id}/${user?.user?.email}/${user?.user?.wallet}`;

    const { data } = await axios.post(url, updatesData);

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

  const deleteUpdate = (id) => {
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
            `${BASE_URL}/admin/deleteUpdate/${user?.user?._id}/${user?.user?.email}/${user?.user?.wallet}/${id}`
          );
          if (data?.result?.deletedCount > 0) {
            Swal.fire({
              title: "Deleted",
              text: "Delete completed",
              icon: "success",
            });
            refetch();
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center px-2">
        <h2 className="text-white text-2xl font-bold my-5">All Updates</h2>
        <button
          onClick={() => document.getElementById("my_modal_1").showModal()}
          className="bg-primary font-semibold border-none h-8 w-28 text-white hover:bg-[#f2a74b] rounded-lg"
        >
          Add Updates
        </button>
      </div>

      {/* create updates */}

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
          <form onSubmit={handleCreateUpdate} className="text-black space-y-3 ">
            <div>
              <h2 className="text-white font-semibold  mb-1">Title</h2>
              <input
                type="text"
                name="title"
                placeholder="Ex: Title"
                required
                className="w-full pl-2 py-2 rounded-md"
              />
            </div>
            <div>
              <h2 className="text-white font-semibold  mb-1">Description</h2>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Bio"
                name="desc"
              ></textarea>
            </div>
            <div>
              <h2 className="text-white font-semibold  mb-1">Image Link</h2>
              <div className="flex flex-col md:flex-row justify-between gap-5">
                <input
                  name="image"
                  type="text"
                  placeholder="Ex: http.."
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

      <div className="space-y-3">
        {allUpdates?.updates?.map((item, idx) => (
          <div
            key={idx}
            className="border border-gray-600 p-3 rounded-md space-y-3"
          >
            {item?.image && (
              <Image
                src={item?.image}
                alt="image not found"
                height={200}
                width={200}
                className="w-40 h-40"
              />
            )}

            <div className="md:flex items-start  justify-between">
              <h2 className="text-xl font-bold text-white">{item?.title}</h2>
              <h2 className="text-sm font-bold text-white">
                Date: {item?.date?.slice(0, 16)}
              </h2>
            </div>
            <h2 className="text-white">{item?.description}</h2>

            <button
              onClick={() => deleteUpdate(item?._id)}
              className="bg-red-500 text-white hover:bg-red-600 px-4 py-1 rounded-md"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAllUpdates;
