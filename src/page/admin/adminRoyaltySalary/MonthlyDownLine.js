"use client";

import useGetAllUsers from "@/hooks/useGetAllUsers/useGetAllUsers";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const MonthlyDownLine = ({ id }) => {
  const { data: user } = useSession();
  const [allUsers] = useGetAllUsers();
  const [monthlyReferrals, setMonthlyReferrals] = useState(0);

  useEffect(() => {
    if (allUsers?.length > 0) {
      // Step 1: Filter users by the current month
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      const usersJoinedThisMonth = allUsers.filter((user) => {
        const joinedDate = new Date(user.joined);
        return (
          joinedDate.getMonth() === currentMonth &&
          joinedDate.getFullYear() === currentYear
        );
      });

      // Step 2: Group users by who referred them
      const referralMap = {};
      usersJoinedThisMonth.forEach((user) => {
        const referrer = user.referBy;
        if (!referralMap[referrer]) {
          referralMap[referrer] = [];
        }
        referralMap[referrer].push(user._id);
      });

      // Step 3: Recursive function to count and list referrals
      function getReferrals(userId) {
        const directReferrals = referralMap[userId] || [];
        let totalReferrals = [...directReferrals]; // Collect all direct referrals
        for (const referralId of directReferrals) {
          totalReferrals = totalReferrals.concat(getReferrals(referralId));
        }
        return totalReferrals;
      }

      // Step 4: Calculate referrals for the admin's referrals
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

      // Step 5: Calculate the total referrals sum for the current month
      function calculateMonthlyReferralsSum(adminId) {
        const adminReferralsData = getAdminReferralsAndSubReferrals(adminId);

        let totalSum = 0;
        for (const key in adminReferralsData) {
          totalSum += adminReferralsData[key].totalReferrals;
        }
        return totalSum;
      }

      // Example Usage
      const totalMonthlyReferralsSum = calculateMonthlyReferralsSum(id);

      setMonthlyReferrals(totalMonthlyReferralsSum);
    }
  }, [allUsers, id]);

  return <div>{monthlyReferrals}</div>;
};

export default MonthlyDownLine;
