"use client";

import useGetWebsiteData from "@/hooks/useGetWebsiteData/userGetWebsiteData";
import { MdDeleteForever } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { BASE_URL } from "@/constant/constant";
import { useSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";

const TestomonailData = () => {
  const [websiteData, refetch] = useGetWebsiteData();
  const { data: user } = useSession();

  const handleCreateVideo = async (e) => {
    e.preventDefault();
    const videoLink = e.target.video.value;

    const url = `${BASE_URL}/admin/faq/${user?.user?._id}/${user?.user?.email}/${user?.user?.wallet}/testimonial`;
    const mainData = [videoLink, ...websiteData?.testimonial];
    const { data } = await axios.post(url, mainData);
    if (data?.status) {
      refetch();
      document.getElementById("my_modal_10").close();
      e.target.reset();
    }
  };

  const handleDelete = (link) => {
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
        const url = `${BASE_URL}/admin/faq/${user?.user?._id}/${user?.user?.email}/${user?.user?.wallet}/testimonial`;
        const mainData = websiteData?.testimonial?.filter(
          (item) => item !== link
        );
        const { data } = await axios.post(url, mainData);
        if (data?.status) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center px-2">
        <h2 className="text-white text-2xl font-bold my-5">Testimonial Data</h2>
        <button
          onClick={() => document.getElementById("my_modal_10").showModal()}
          className="bg-primary font-semibold border-none h-8 w-28 text-white hover:bg-[#f2a74b] rounded-lg"
        >
          Add
        </button>
      </div>

      <dialog id="my_modal_10" className="modal">
        <div className="modal-box bg-gray-600 text-white pt-0">
          <div className="modal-action">
            <form method="dialog">
              <button>
                <RxCross1 />
              </button>
            </form>
          </div>
          <form onSubmit={handleCreateVideo} className="text-black space-y-3">
            <div>
              <h2 className="text-white font-semibold  mb-1">Video Link</h2>
              <input
                type="text"
                name="video"
                placeholder="Ex: https"
                required
                className="w-full pl-2 py-2 rounded-md text-black bg-white"
              />
            </div>
            <button className="bg-primary font-semibold border-none h-10 w-28 text-white hover:bg-[#f2a74b] rounded-lg">
              Create
            </button>
          </form>
        </div>
      </dialog>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-white">
              <th className="whitespace-nowrap">No.</th>
              <th className="whitespace-nowrap">Link</th>
              <th className="whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {websiteData?.testimonial?.map((item, idx) => (
              <tr className="text-white mx-auto" key={idx}>
                <th className="whitespace-nowrap">{idx + 1}</th>
                <th className="whitespace-nowrap">{item}</th>
                <th className="whitespace-nowrap">
                  <MdDeleteForever
                    className=" text-2xl text-red-500 cursor-pointer"
                    onClick={() => handleDelete(item)}
                  />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestomonailData;
