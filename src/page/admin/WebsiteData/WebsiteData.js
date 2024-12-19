"use client";
import { BASE_URL } from "@/constant/constant";
import useGetWebsiteData from "@/hooks/useGetWebsiteData/userGetWebsiteData";
import axios from "axios";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

const WebsiteData = () => {
  const [websiteData, refetch] = useGetWebsiteData();
  const { data: user } = useSession();
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
                className="input input-bordered w-full"
                name="webName"
                defaultValue={websiteData?.websiteName}
              />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Web Image</h3>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                name="webImage"
                defaultValue={websiteData?.websiteImage}
              />
            </div>
            <div className="col-span-2 w-full">
              <h3 className="text-white font-semibold mb-1">About</h3>
              <textarea
                className="textarea textarea-bordered w-full"
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
                  className="input input-bordered w-full "
                  name="support"
                  defaultValue={websiteData?.support}
                />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Telegram</h3>
                <input
                  type="text"
                  placeholder="telegram link"
                  className="input input-bordered w-full "
                  name="telegram"
                  defaultValue={websiteData?.telegram}
                />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Youtube</h3>
                <input
                  type="text"
                  placeholder="Youtube link"
                  className="input input-bordered w-full "
                  name="youtube"
                  defaultValue={websiteData?.youtube}
                />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Instagram</h3>
                <input
                  type="text"
                  placeholder="instragram link"
                  className="input input-bordered w-full "
                  name="instagram"
                  defaultValue={websiteData?.instagram}
                />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Whatsup</h3>
                <input
                  type="text"
                  placeholder="Whatsup link"
                  className="input input-bordered w-full "
                  name="whatsup"
                  defaultValue={websiteData?.whatsup}
                />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Facebook</h3>
                <input
                  type="text"
                  placeholder="Facebook link"
                  className="input input-bordered w-full "
                  name="facebook"
                  defaultValue={websiteData?.facebook}
                />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Twitter</h3>
                <input
                  type="text"
                  placeholder="twitter link"
                  className="input input-bordered w-full "
                  name="twitter"
                  defaultValue={websiteData?.twitter}
                />
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
