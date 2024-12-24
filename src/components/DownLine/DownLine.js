"use client";

import useGetAllUsers from "@/hooks/useGetAllUsers/useGetAllUsers";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const DownLine = ({ id }) => {
  const { data: user } = useSession();
  const [allUsers] = useGetAllUsers();
  const [downLine, setDownLine] = useState();

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
      const totalReferralsSum = calculateTotalReferralsSum(id);

      setDownLine(totalReferralsSum);
    }
  }, [allUsers, id]);

  return <div>{downLine}</div>;
};

export default DownLine;
