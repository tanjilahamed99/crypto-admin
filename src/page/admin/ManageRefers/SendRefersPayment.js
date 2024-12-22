"use client";

import { BASE_URL } from "@/constant/constant";
import useGetWebsiteData from "@/hooks/useGetWebsiteData/userGetWebsiteData";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Swal from "sweetalert2";
import { ethers } from "ethers";

const SendRefersPayment = ({ userId, wallet, validate, totalPay, given }) => {
  const address = useAddress(); // Get user's wallet address
  const signer = useSigner(); // Get signer to send transactions
  const { data: user } = useSession();
  const [websiteData] = useGetWebsiteData();
  const [isLoading, setIsLoading] = useState(false);
  const date = Date();

  const handleSendPayment = async () => {
    if (!address || !signer) {
      alert("Connect your wallet first!");
      return;
    }
    const { data } = await axios(`${BASE_URL}/myRefers/${userId}`);
    if (data?.result?.length <= 0) {
      alert("Need Refers For Reward");
      return;
    }
    if (data?.result?.length === given) {
      alert("Already given this reword");
      return;
    }

    setIsLoading(true);
    const fee = parseFloat(websiteData?.register?.fee); // Fee per user
    const percentage = parseFloat(websiteData?.register?.referReward); // Admin percentage
    // Calculate payment per user
    const userPayment = fee + (fee * percentage) / 100;
    // Calculate total payment for multiple users

    let fixedUsers = 0;
    if (given > 0) {
      fixedUsers = parseFloat(data?.result?.length) - parseFloat(given);
    } else {
      fixedUsers = parseFloat(data?.result?.length);
    }
    const totalPayment = String(fixedUsers * userPayment);

    try {
      // ETH Payment
      const tx = await signer.sendTransaction({
        to: wallet,
        value: ethers.utils.parseEther(String(totalPayment?.slice(0, 10))),
      });
      await tx.wait();
      if (tx) {
        const updateData = {
          refersReword: {
            members: parseFloat(given) + fixedUsers,
            totalPayment: parseFloat(totalPay) + totalPayment,
          },
        };

        const { data: updateRefersInfo } = await axios.put(
          `${BASE_URL}/updateUserInfo/${userId}/${wallet}`,
          updateData
        );
        // history for dashboard
        let history = [];
        if (websiteData?.totalWithdrawal?.length > 0) {
          history = [
            {
              userId,
              history: tx,
              sender: user?.user?._id,
              wallet: address,
              amount: parseFloat(totalPayment),
              date,
            },
            ...websiteData?.totalWithdrawal,
          ];
        } else {
          history = [
            {
              userId,
              history: tx,
              sender: user?.user?._id,
              wallet: address,
              amount: parseFloat(totalPayment),
              date,
            },
          ];
        }
        const mainHistory = {
          totalWithdrawal: history,
        };
        const { data: historyData } = await axios.post(
          `${BASE_URL}/history`,
          mainHistory
        );
        if (historyData?.status) {
          Swal.fire({
            title: "Good job!",
            text: "Payment Completed",
            icon: "success",
          });
          validate();
        }
      }
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="font-semibold text-sm bg-primary text-white rounded-xl px-3 py-1 hover:bg-green-700"
        onClick={handleSendPayment}
      >
        Send
      </button>
      {/* Loading Modal */}
      {isLoading && (
        <dialog id="loading_modal" className="modal" open>
          <div className="modal-box bg-white text-black">
            <span className="loading loading-spinner loading-lg flex justify-center mx-auto"></span>
            <h3 className="font-bold text-lg">Processing...</h3>
            <p className="py-4">
              Your transaction is being processed. Please wait...
            </p>
          </div>
        </dialog>
      )}
    </>
  );
};

export default SendRefersPayment;
