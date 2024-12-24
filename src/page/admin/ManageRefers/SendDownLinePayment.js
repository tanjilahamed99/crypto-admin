"use client";

import { BASE_URL } from "@/constant/constant";
import useGetWebsiteData from "@/hooks/useGetWebsiteData/userGetWebsiteData";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ethers } from "ethers";
import useGetAllUsers from "@/hooks/useGetAllUsers/useGetAllUsers";

const SendDownLinePayment = ({ userId, wallet, validate, totalPay, given }) => {
  const address = useAddress(); // Get user's wallet address
  const signer = useSigner(); // Get signer to send transactions
  const { data: user } = useSession();
  const [websiteData] = useGetWebsiteData();
  const [isLoading, setIsLoading] = useState(false);
  const date = Date();
  const [allUsers] = useGetAllUsers();
  const [downLine, setDownLine] = useState();

  const handleSendPayment = async () => {
    if (!address || !signer) {
      alert("Connect your wallet first!");
      return;
    }
    if (downLine <= 0) {
      alert("Need Down Line Refers");
      return;
    }
    if (downLine === given) {
      alert("Already given this reword");
      return;
    }

    setIsLoading(true);
    const fee = parseFloat(websiteData?.register?.fee); // Fee per user
    const percentage = parseFloat(websiteData?.register?.downLineReword); // Admin percentage
    // Calculate payment per user
    const userPayment = fee + (fee * percentage) / 100;
    // Calculate total payment for multiple users

    let fixedUsers = 0;
    if (given > 0) {
      fixedUsers = downLine - parseFloat(given);
    } else {
      fixedUsers = downLine;
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
            downLineMembers: downLine,
            totalDownLinePayment:
              parseFloat(totalPay) + parseFloat(totalPayment),
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

  useEffect(() => {
    if (allUsers?.length > 0) {
      // Step 1: Group users by who referred them
      const referralMap = {};
      allUsers.forEach((user) => {
        const referrer = user.referBy;
        if (!referralMap[referrer]) {
          referralMap[referrer] = [];
        }
        referralMap[referrer].push(user._id);
      });

      // Step 2: Recursive function to count and list referrals
      function getReferrals(userId) {
        const directReferrals = referralMap[userId] || [];
        let totalReferrals = [...directReferrals]; // Collect all direct referrals
        for (const referralId of directReferrals) {
          totalReferrals = totalReferrals.concat(getReferrals(referralId));
        }
        return totalReferrals;
      }

      // Step 3: Calculate referrals for the admin's referrals
      function getAdminReferralsAndSubReferrals(adminId) {
        const adminReferrals = referralMap[adminId] || [];
        const result = {};

        adminReferrals.forEach((referralId) => {
          const referralChain = getReferrals(referralId); // Get referrals for this user
          result[referralId] = {
            directReferrals: referralMap[referralId]?.length || 0,
            totalReferrals: referralChain.length,
            referralChain: referralChain,
          };
        });

        return result;
      }
      // Step 4: Calculate the total referrals sum
      function calculateTotalReferralsSum(adminId) {
        const adminReferralsData = getAdminReferralsAndSubReferrals(adminId);

        let totalSum = 0;
        for (const key in adminReferralsData) {
          totalSum += adminReferralsData[key].totalReferrals;
        }
        return totalSum;
      }

      // Example Usage
      const totalReferralsSum = calculateTotalReferralsSum(userId);

      setDownLine(totalReferralsSum);
    }
  }, [allUsers, userId]);

  return (
    <>
      <button
        className="font-semibold text-sm bg-primary text-white rounded-xl px-3 py-1 hover:bg-green-700"
        onClick={handleSendPayment}
      >
        Send DownLine Payment
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

export default SendDownLinePayment;
