"use client";
import { BASE_URL } from "@/constant/constant";
import useGetWebsiteData from "@/hooks/useGetWebsiteData/userGetWebsiteData";
import SaveFaq from "@/page/admin/SaveFaq/SaveFaq";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const Faq = () => {
  const [websiteData, refetch] = useGetWebsiteData();
  const [isOpen, setIsOpen] = useState(false);
  const { data: user } = useSession();

  const handleDelete = async (title) => {
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
          const existData = websiteData?.faq?.filter(
            (item) => item?.question !== title
          );
          console.log(existData);
          const url = `${BASE_URL}/admin/faq/${user?.user?._id}/${user?.user?.email}/${user?.user?.wallet}/faq`;
          const mainData = [...existData];
          const { data } = await axios.post(url, mainData);
          if (data?.status) {
            setIsOpen(false);
            refetch();
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <div className="mt-2 border-gray-700 border p-5">
      <h2 className="text-white text-2xl font-bold mb-2">Faq</h2>

      {websiteData?.faq?.length > 0 && (
        <>
          {websiteData?.faq?.map((item, index) => (
            <div
              key={index}
              tabIndex={0}
              className="collapse collapse-arrow border-b border-gray-500 rounded-none text-white mb-3 relative"
            >
              <div className="collapse-title  font-semibold text-green-600 hover:text-primary">
                {item.question}
              </div>
              <div className="collapse-content">
                <p>{item.answer}</p>
              </div>
              <MdDeleteForever
                onClick={() => handleDelete(item?.question)}
                className="text-white  absolute text-xl right-10 top-5 cursor-pointer"
              />
            </div>
          ))}
        </>
      )}

      <div>
        <div>
          {isOpen && (
            <SaveFaq
              setIsOpen={setIsOpen}
              refetch={refetch}
              faqData={websiteData?.faq}
            />
          )}
        </div>

        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-primary  text-md font-semibold border-none h-10 w-28 hover:bg-[#f2a74b] rounded-lg text-white"
          >
            Add Faq
          </button>
        )}
      </div>
    </div>
  );
};

export default Faq;
