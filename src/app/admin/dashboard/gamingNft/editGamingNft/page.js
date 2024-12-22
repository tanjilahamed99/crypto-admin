"use client";
import { BASE_URL } from "@/constant/constant";
import useGetSingleGamingNftById from "@/hooks/useGamingNft/useGetSingleNftById";
import useSingleLotteryDataById from "@/hooks/useGetAllLottery/useSingleLotteryData";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
const EditGamingNft = ({ searchParams }) => {
  const id = searchParams?.id;
  const { data: user } = useSession();
  const [gamingNft] = useGetSingleGamingNftById({ id });
  const router = useRouter();

  const handleUpdateGamingNft = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const image = form.image.value;
    const price = form.price.value;
    const quantity = form.quantity.value;

    const gamingNftData = {
      title,
      image: image,
      price,
      quantity,
      remaining: quantity,
      sell: 0,
    };

    const url = `${BASE_URL}/admin/gamingNft/${user?.user?._id}/${user?.user?.email}/${user?.user?.wallet}/${id}`;
    const { data } = await axios.put(url, gamingNftData);
    console.log(data);
    if (data?.result?.modifiedCount > 0) {
      Swal.fire({
        title: "Good job!",
        text: "Update completed",
        icon: "success",
      });
      router.push("/admin/dashboard/gamingNft");
    }
  };
  return (
    <div className="mt-10">
      {" "}
      <form
        onSubmit={handleUpdateGamingNft}
        className="text-black space-y-5 w-full md:w-[70%] mx-auto lg:w-[60%]"
      >
        <div>
          <h2 className="text-white font-semibold  mb-1">Title</h2>
          <input
            type="text"
            name="title"
            placeholder="Ex: Title"
            required
            className="w-full pl-2 py-2 rounded-md text-black bg-white"
            defaultValue={gamingNft?.title}
          />
        </div>
        <div>
          <h2 className="text-white font-semibold  mb-1">Price</h2>
          <input
            type="number"
            name="price"
            placeholder="Ex: Price"
            required
            className="w-full pl-2 py-2 rounded-md text-black bg-white"
            defaultValue={gamingNft?.price}
          />
        </div>
        <div>
          <h2 className="text-white font-semibold  mb-1">Quantity</h2>
          <input
            type="number"
            name="quantity"
            placeholder="Ex: quantity"
            required
            className="w-full pl-2 py-2 rounded-md text-black bg-white"
            defaultValue={gamingNft?.quantity}
          />
        </div>
        <div>
          <h2 className="text-white font-semibold  mb-1">Image Link</h2>
          <div className="">
            <input
              name="image"
              type="text"
              placeholder="Ex: http.."
              required
              className="w-full pl-2 py-2 rounded-md text-black bg-white"
              defaultValue={gamingNft?.image}
            />
          </div>
        </div>

        <button className="bg-primary font-semibold border-none h-10 w-28 text-white hover:bg-[#f2a74b] rounded-lg">
          update
        </button>
      </form>
    </div>
  );
};

export default EditGamingNft;
