"use client";
import { BASE_URL } from "@/constant/constant";
import useGetWebsiteData from "@/hooks/useGetWebsiteData/userGetWebsiteData";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Swal from "sweetalert2";

const WebsiteData = () => {
  const [websiteData, refetch] = useGetWebsiteData();
  const { data: user } = useSession();
  const [lotteryImg, setLotteryImg] = useState(
    websiteData?.dashboardImage || ""
  );

  const handleSetNewData = async (e) => {
    e.preventDefault();
    const form = e.target;
    const websiteName = form.webName.value;
    const websiteImage = form.webImage.value;
    const description = form.description.value;
    const telegram = form.telegram.value;
    const youtube = form.youtube.value;
    const instagram = form.instagram.value;
    const whatsup = form.whatsup.value;
    const facebook = form.facebook.value;
    const twitter = form.twitter.value;
    const support = form.support.value;

    const mainData = {
      websiteName,
      websiteImage,
      description,
      telegram,
      youtube,
      instagram,
      whatsup,
      facebook,
      twitter,
      support,
      dashboardImage: lotteryImg,
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
    <div className="">
      <div>
        <div className="flex justify-between items-center px-2">
          <h2 className="text-white text-2xl font-bold my-5">
            Website Information
          </h2>
        </div>

        <form
          onSubmit={handleSetNewData}
          className="border-gray-700 border p-5 space-y-10"
        >
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-1">Web Name</h3>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full bg-white text-black"
                name="webName"
                defaultValue={websiteData?.websiteName}
              />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Web Image</h3>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full bg-white text-black"
                name="webImage"
                defaultValue={websiteData?.websiteImage}
              />
            </div>
            <div className="col-span-2 w-full">
              <h3 className="text-white font-semibold mb-1">About</h3>
              <textarea
                className="textarea textarea-bordered w-full text-black bg-white"
                placeholder="About"
                name="description"
                defaultValue={websiteData?.description}
              ></textarea>
            </div>
          </div>
          <div>
            <h2 className="text-white text-xl font-bold mb-2">Social</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-white font-semibold mb-1">Support</h3>
                <input
                  type="text"
                  placeholder="telegram link"
                  className="input input-bordered w-full bg-white text-black "
                  name="support"
                  defaultValue={websiteData?.support}
                />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Telegram</h3>
                <input
                  type="text"
                  placeholder="telegram link"
                  className="input input-bordered w-full bg-white text-black "
                  name="telegram"
                  defaultValue={websiteData?.telegram}
                />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Youtube</h3>
                <input
                  type="text"
                  placeholder="Youtube link"
                  className="input input-bordered w-full bg-white text-black "
                  name="youtube"
                  defaultValue={websiteData?.youtube}
                />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Instagram</h3>
                <input
                  type="text"
                  placeholder="instragram link"
                  className="input input-bordered w-full bg-white text-black "
                  name="instagram"
                  defaultValue={websiteData?.instagram}
                />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Whatsup</h3>
                <input
                  type="text"
                  placeholder="Whatsup link"
                  className="input input-bordered w-full bg-white text-black "
                  name="whatsup"
                  defaultValue={websiteData?.whatsup}
                />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Facebook</h3>
                <input
                  type="text"
                  placeholder="Facebook link"
                  className="input input-bordered w-full bg-white text-black "
                  name="facebook"
                  defaultValue={websiteData?.facebook}
                />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Twitter</h3>
                <input
                  type="text"
                  placeholder="twitter link"
                  className="input input-bordered w-full bg-white text-black "
                  name="twitter"
                  defaultValue={websiteData?.twitter}
                />
              </div>
              <div>
                <h2 className="text-white font-semibold  mb-1">
                  Dashboard Image
                </h2>
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

export default WebsiteData;
