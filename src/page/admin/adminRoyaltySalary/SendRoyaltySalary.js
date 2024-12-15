"use client";

import { BASE_URL } from "@/constant/constant";
import useGetWebsiteData from "@/hooks/useGetWebsiteData/userGetWebsiteData";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import axios from "axios";
import { ethers } from "ethers";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Swal from "sweetalert2";

const SendRoyaltySalary = ({ isEthPayment, userId, price }) => {
  const address = useAddress(); // Get user's wallet address
  const signer = useSigner(); // Get signer to send transactions
  const { data: user } = useSession();
  const [websiteData] = useGetWebsiteData();
  const [isLoading, setIsLoading] = useState(false);
  const date = Date();

  const handleBuy = async () => {
    if (!address || !signer) {
      alert("Connect your wallet first!");
      return;
    }
    setIsLoading(true);
    try {
      if (isEthPayment) {
        // ETH Payment
        const tx = await signer.sendTransaction({
          to: websiteData?.wallets?.lottery,
          value: ethers.utils.parseEther(price),
        });
        await tx.wait();
        if (tx) {
          // history for dashboard
          let history = [];
          let totalRoyaltySalary = [];
          if (websiteData?.totalWithdrawal?.length > 0) {
            history = [
              {
                userId,
                history: tx,
                sender: user?.user?._id,
                wallet: address,
                amount: parseFloat(price),
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
                amount: parseFloat(price),
                date,
              },
            ];
          }
          if (websiteData?.totalRoyaltySalary?.length > 0) {
            totalRoyaltySalary = [
              {
                userId,
                history: tx,
                sender: user?.user?._id,
                wallet: address,
                amount: parseFloat(price),
                date,
              },
              ...websiteData?.totalRoyaltySalary,
            ];
          } else {
            totalRoyaltySalary = [
              {
                userId,
                history: tx,
                sender: user?.user?._id,
                wallet: address,
                amount: parseFloat(price),
                date,
              },
            ];
          }
          const mainHistory = {
            totalWithdrawal: history,
            totalRoyaltySalary
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
          }
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
        className="text-lg font-semibold bg-primary text-white rounded-xl px-3 py-1 hover:bg-green-700"
        onClick={handleBuy}
      >
        Send
      </button>
      {/* Loading Modal */}
      {isLoading && (
        <dialog id="loading_modal" className="modal" open>
          <div className="modal-box">
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

export default SendRoyaltySalary;
