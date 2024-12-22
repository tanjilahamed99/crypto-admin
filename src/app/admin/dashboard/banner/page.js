"use client";

import UploadImage from "@/components/UploadImge/UploadImage";
import { BASE_URL } from "@/constant/constant";
import useGetWebsiteData from "@/hooks/useGetWebsiteData/userGetWebsiteData";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AdminBanner = () => {
  const [websiteData, refetch] = useGetWebsiteData();
  const { data: user } = useSession();
  const [mainImg, setMainImg] = useState("");
  const [roadMapImgOne, setRoadMapImgOne] = useState("");
  const [roadMapImgTwo, setRoadMapImgTwo] = useState("");

  const handleSetNewData = async () => {
    const mainData = {
      banner: {
        mainImage: mainImg,
      },
      roadMapImgOne,
      roadMapImgTwo,
    };
    const url = `${BASE_URL}/admin/faq/${user?.user?._id}/${user?.user?.email}/${user?.user?.wallet}/others`;

    const { data } = await axios.post(url, mainData);
    console.log(data);
    if (data?.status) {
      refetch();
      Swal.fire({
        title: "Good job!",
        text: "Same data changed",
        icon: "success",
      });
    }
  };

  useEffect(() => {
    if (websiteData?.banner?.mainImage) {
      setMainImg(websiteData?.banner?.mainImage);
    }
    if (websiteData?.roadMapImgOne) {
      setRoadMapImgOne(websiteData?.roadMapImgOne);
    }
    if (websiteData?.roadMapImgTwo) {
      setRoadMapImgTwo(websiteData?.roadMapImgTwo);
    }
  }, [websiteData]);

  return (
    <div>
      <div className="flex justify-between items-center px-2">
        <h2 className="text-white text-2xl font-bold my-5">Banner</h2>
      </div>
      <div className="border-gray-700 border p-5 space-y-10">
        <div className="space-y-2">
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-white font-semibold  mb-1">Main Image</h2>
              <UploadImage img={mainImg} name={"mainImg"} setImg={setMainImg} />
            </div>
            <div>
              <h2 className="text-white font-semibold  mb-1">
                Road Map Image-1
              </h2>
              <UploadImage
                img={roadMapImgOne}
                name={"roadMapImgOne"}
                setImg={setRoadMapImgOne}
              />
            </div>
            <div>
              <h2 className="text-white font-semibold  mb-1">
                Road Map Image-2
              </h2>
              <UploadImage
                img={roadMapImgTwo}
                name={"roadMapImgTwo"}
                setImg={setRoadMapImgTwo}
              />
            </div>
          </div>
          <button
            onClick={handleSetNewData}
            type="submit"
            className="bg-primary  text-md font-semibold border-none h-10 w-28 hover:bg-[#f2a74b] rounded-lg text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminBanner;
