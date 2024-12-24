"use client";

import { BASE_URL } from "@/constant/constant";
import useGetWebsiteData from "@/hooks/useGetWebsiteData/userGetWebsiteData";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Swal from "sweetalert2";
import { ethers } from "ethers";

const SendRefersPayment = ({
  userId,
  wallet,
  validate,
  totalPay,
  given,
  downLineMembers,
  totalDownLinePayment,
}) => {
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

    try {
      const { data } = await axios(`${BASE_URL}/myRefers/${userId}`);
      if (data?.result?.length <= 0) {
        alert("Need Refers For Reward");
        return;
      }

      if (data?.result?.length === given || data?.result?.length < given) {
        alert("Already given this reward");
        return;
      }

      const fee = parseFloat(websiteData?.register?.fee); // Fee per user
      const first =
        parseFloat(websiteData?.register?.levelOneReferReward) || 20;
      const second =
        parseFloat(websiteData?.register?.levelTwoReferReward) || 15;
      const third =
        parseFloat(websiteData?.register?.levelThreeReferReward) || 10;

      let fixedUsers = 0;
      if (given > 0) {
        fixedUsers = parseFloat(data?.result?.length) - parseFloat(given);
      } else {
        fixedUsers = parseFloat(data?.result?.length);
      }
      // Tiered structure for referral rewards using dynamic rates
      const tiers = [
        { max: 399, rate: first },
        { max: 599, rate: second },
        { max: 1000, rate: third },
      ];

      let totalReward = 0;
      let remainingUsers = fixedUsers;
      let currentGiven = given;

      // Calculate rewards tier-wise
      for (const tier of tiers) {
        const maxUsersInTier = Math.min(
          remainingUsers,
          tier.max - currentGiven
        );

        if (maxUsersInTier > 0) {
          totalReward += maxUsersInTier * fee * (tier.rate / 100);
          remainingUsers -= maxUsersInTier;
          currentGiven += maxUsersInTier;
        }

        if (remainingUsers <= 0) break; // Stop if all users are processed
      }

      if (totalReward <= 0) {
        alert("No reward calculated. Check the inputs.");
        return;
      }

      // Payment Logic
      const totalPayment = String(totalReward);

      setIsLoading(true);
      console.log(totalPay);

      // Uncomment to enable ETH payment
      const tx = await signer.sendTransaction({
        to: wallet,
        value: ethers.utils.parseEther(totalPayment.slice(0, 10)),
      });
      await tx.wait();

      if (tx) {
        const updateData = {
          refersReword: {
            totalPayment: parseFloat(totalPayment) + parseFloat(totalPay),
            members: parseFloat(given) + fixedUsers,
            downLineMembers,
            totalDownLinePayment,
          },
        };

        console.log(updateData);

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
          setIsLoading(false);
          validate();
        }
      }
    } catch (error) {
      console.error("Error in handleSendPayment:", error);
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
        Send UpLine Payment
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
