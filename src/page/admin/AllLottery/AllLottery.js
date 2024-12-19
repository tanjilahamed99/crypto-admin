"use client";

import { BASE_URL } from "@/constant/constant";
import useGetAllLottery from "@/hooks/useGetAllLottery/useGetAllLottery";
import axios from "axios";
import { useSession } from "next-auth/react";
import { RxCross1 } from "react-icons/rx";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";
import Image from "next/image";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import SendLotteryPayment from "./SendLotteryPayment";
import { AiOutlineDollarCircle } from "react-icons/ai";

const AllLottery = () => {
  const { data: user } = useSession() || {};
  const [allLottery, refetch] = useGetAllLottery();
  const [lotteryImg, setLotteryImg] = useState("");
  const [winners, setWinners] = useState([]);
  const [defaultId, setDefaultId] = useState("");

  const handleCreateLottery = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const image = form.image.value;
    const price = form.price.value;
    const quantity = form.quantity.value;

    const lotteryData = {
      title,
      image: lotteryImg,
      price: parseFloat(price),
      quantity,
      remaining: quantity,
      sell: 0,
    };

    const url = `${BASE_URL}/admin/lottery/${user?.user?._id}/${user?.user?.email}/${user?.user?.wallet}`;

    const { data } = await axios.post(url, lotteryData);

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

  const handleDelete = async (id) => {
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
        const { data } = await axios.delete(
          `${BASE_URL}/admin/lottery/${user?.user?._id}/${user?.user?.email}/${user?.user?.wallet}/${id}`
        );
        if (data?.result?.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          refetch();
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

  const getWinner = async (id) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/admin/lotteryDraw/${user?.user._id}/${user?.user?.email}/${user?.user?.wallet}/${id}`
      );
      if (data?.status) {
        document.getElementById("my_modal_3").showModal();
        setWinners([...data?.winners]);
        setDefaultId(id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    document.getElementById("my_modal_3").close();
    setWinners([]);
    setDefaultId("");
  };

  const handleSetWinners = async (id) => {
    try {
      const lotteryData = allLottery?.lottery?.find((item) => item?._id === id);

      // Calculate total prize pool
      const totalPrizePool = lotteryData.users.length * lotteryData.price;

      // Deduct 10% commission
      const prizeAfterCommission = totalPrizePool - totalPrizePool * 0.1;

      // Define placement percentages
      const placementPercentages = [40, 20, 15, 10, 5]; // Top 5 placements
      // Calculate rewards for top 5 placements
      const top5Rewards = placementPercentages.map(
        (percentage) => (prizeAfterCommission * percentage) / 100
      );

      // Remaining prize pool for all other users
      const remainingPrizePool =
        prizeAfterCommission -
        top5Rewards.reduce((sum, reward) => sum + reward, 0);

      // Calculate reward for remaining users
      const remainingUsers = lotteryData.users.length - 5;
      const rewardPerRemainingUser =
        remainingUsers > 0 ? remainingPrizePool / remainingUsers : 0;

      // Prepare updated winners with placements and rewards
      const updatedWinners = lotteryData.users.map((user, index) => {
        let reward = 0;

        if (index < 5) {
          // Top 5 users
          reward = top5Rewards[index];
        } else {
          // All other users
          reward = rewardPerRemainingUser;
        }

        return {
          userId: user.userId,
          wallet: user.wallet,
          placement: index + 1,
          reward,
        };
      });

      // Send updated winners data to the server
      const { data } = await axios.post(
        `${BASE_URL}/admin/setWinners/${user?.user._id}/${user?.user?.email}/${user?.user?.wallet}/${id}`,
        updatedWinners
      );

      console.log(data);
      if (data?.result.modifiedCount > 0) {
        document.getElementById("my_modal_3").close();
        refetch();
        Swal.fire({
          title: "Good job!",
          text: "Winner List setup Completed",
          icon: "success",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowWinners = ({ data, id }) => {
    setWinners([...data]);
    document.getElementById("my_modal_4").showModal();
    setDefaultId(id);
  };

  return (
    <div>
      <div className="flex justify-between items-center px-2">
        <h2 className="text-white text-2xl font-bold my-5">Lottery</h2>
        <button
          onClick={() => document.getElementById("my_modal_1").showModal()}
          className="bg-primary font-semibold border-none h-8 w-28 text-white hover:bg-[#f2a74b] rounded-lg"
        >
          Add Lottery
        </button>
      </div>

      {/* confirm lottery list */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-gray-600 text-white pt-0">
          <div className="modal-action">
            <form method="dialog">
              <button>
                <RxCross1 />
              </button>
            </form>
          </div>
          <div className="text-black space-y-3">
            <div>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr className="text-white">
                      <th className="whitespace-nowrap">No.</th>
                      <th className="whitespace-nowrap">User Id</th>
                      <th className="whitespace-nowrap">Wallet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {winners.map((item, idx) => (
                      <tr className="text-white mx-auto" key={idx}>
                        <th className="whitespace-nowrap">{idx + 1}</th>
                        <th className="whitespace-nowrap">{item?.userId}</th>
                        <th className="whitespace-nowrap">
                          {item?.wallet?.slice(0, 10)}...
                          {item?.wallet?.slice(12, 20)}
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={handleClose}
                className="bg-red-500 font-semibold border-none h-10 w-28 text-white hover:bg-red-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSetWinners(defaultId)}
                className="bg-primary font-semibold border-none h-10 w-28 text-white hover:bg-[#f2a74b] rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </dialog>
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
              <h2 className="text-white font-semibold  mb-1">Price</h2>
              <input
                name="price"
                placeholder="Ex: Price"
                required
                className="w-full pl-2 py-2 rounded-md"
              />
            </div>
            <div>
              <h2 className="text-white font-semibold  mb-1">Quantity</h2>
              <input
                type="number"
                name="quantity"
                placeholder="Ex: quantity"
                required
                className="w-full pl-2 py-2 rounded-md"
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

      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="modal-action">
            <form method="dialog">
              <button>
                <RxCross1 />
              </button>
            </form>
          </div>
          <div className="text-black space-y-3">
            <div>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr className="text-white">
                      <th className="whitespace-nowrap">Placement</th>
                      <th className="whitespace-nowrap">User Id</th>
                      <th className="whitespace-nowrap">Wallet</th>
                      <th className="whitespace-nowrap">Reward</th>
                      <th className="whitespace-nowrap">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {winners.map((item, idx) => (
                      <tr className="text-white mx-auto" key={idx}>
                        <th className="whitespace-nowrap">{item?.placement}</th>
                        <th className="whitespace-nowrap">{item?.userId}</th>
                        <th className="whitespace-nowrap">
                          {item?.wallet?.slice(0, 10)}...
                          {item?.wallet?.slice(12, 20)}
                        </th>
                        <th className="whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <AiOutlineDollarCircle className="text-primary text-lg" />{" "}
                            {item?.reward?.toString().slice(0, 10)}
                          </div>
                        </th>
                        <th className="whitespace-nowrap">
                          <SendLotteryPayment
                            wallet={item?.wallet}
                            userId={item?.userId}
                            isEthPayment={true}
                            winners={winners}
                            id={defaultId}
                            refetchAll={refetch}
                            winnerData={item}
                            price={String(item?.reward?.toString().slice(0, 10))}
                          />
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </dialog>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-white">
              <th className="whitespace-nowrap">Image</th>
              <th className="whitespace-nowrap">Title</th>
              <th className="whitespace-nowrap">Price</th>
              <th className="whitespace-nowrap">Quantity</th>
              <th className="whitespace-nowrap">Sell</th>
              <th className="whitespace-nowrap">Action</th>
              <th className="whitespace-nowrap">Action</th>
              <th className="whitespace-nowrap">Draw</th>
              <th className="whitespace-nowrap">Winner List</th>
            </tr>
          </thead>
          <tbody>
            {allLottery?.lottery?.map((item, idx) => (
              <tr className="text-white mx-auto" key={idx}>
                <th className="whitespace-nowrap">
                  <Image
                    src={item?.image}
                    alt="image not found"
                    height={500}
                    width={500}
                    className="w-10 h-10 rounded-full"
                  />
                </th>
                <th className="whitespace-nowrap">{item?.title}</th>
                <th className="whitespace-nowrap">{item?.price}</th>
                <th className="whitespace-nowrap">{item?.quantity}</th>
                <th className="whitespace-nowrap">{item?.sell}</th>
                <th className="whitespace-nowrap">
                  <Link
                    href={`/admin/dashboard/allLottery/editLottery?id=${item?._id}`}
                  >
                    <CiEdit className=" text-2xl cursor-pointer" />
                  </Link>
                </th>
                <th className="whitespace-nowrap">
                  <MdDeleteForever
                    className=" text-2xl text-red-500 cursor-pointer"
                    onClick={() => handleDelete(item?._id)}
                  />
                </th>

                {item?.winners?.length > 0 ? (
                  <th className="whitespace-nowrap">
                    <button className="py-2 px-4 hover:bg-[#af7835] bg-primary text-white ">
                      Completed
                    </button>
                  </th>
                ) : (
                  <th className="whitespace-nowrap">
                    {item?.quantity <= 0 && (
                      <button
                        onClick={() => getWinner(item?._id)}
                        className="py-2 px-4 hover:bg-[#af7835] bg-primary text-white "
                      >
                        Draw
                      </button>
                    )}
                  </th>
                )}

                <th className="whitespace-nowrap">
                  {item?.winners?.length > 0 && (
                    <button
                      onClick={() =>
                        handleShowWinners({
                          data: item?.winners,
                          id: item?._id,
                        })
                      }
                      className="p-2 bg-green-600 hover:bg-green-800 text-white "
                    >
                      Winner List
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllLottery;
