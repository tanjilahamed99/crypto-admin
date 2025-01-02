"use client";

import { FaUserClock } from "react-icons/fa6";
import useGetAllUsers from "@/hooks/useGetAllUsers/useGetAllUsers";
import { useSession } from "next-auth/react";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaWallet } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiBlock } from "react-icons/bi";
import useGetDashboardData from "@/hooks/useGetAllUsers/useDashboardData";
import { useEffect, useState } from "react";

const AdminDashBoard = () => {
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [todayDeposit, setTodayDeposit] = useState(0);
  const [totalWithdrawal, setTotalWithdrawal] = useState(0);
  const [todayWithdrawal, setTodayWithdrawal] = useState(0);

  const { data: user } = useSession() || {};
  const [allUsers] = useGetAllUsers({
    adminId: user?.user?._id,
    adminEmail: user?.user?.email,
    wallet: user?.user?.wallet,
  });
  const [dashboardData] = useGetDashboardData({
    adminId: user?.user?._id,
    adminEmail: user?.user?.email,
    wallet: user?.user?.wallet,
  });

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Filter the users who joined today
  const todayUsers = allUsers.filter((user) => {
    const joinedDate = new Date(user.joined).toISOString().split("T")[0];
    return joinedDate === today;
  });

  useEffect(() => {
    if (dashboardData?.dashboard?.totalDeposit?.length > 0) {
      // Calculate the total deposit
      const total = dashboardData.dashboard.totalDeposit.reduce(
        (sum, item) => sum + (item.amount || 0),
        0
      );
      setTotalDeposit(total);
      const todayDepositFunc = dashboardData?.dashboard?.totalDeposit?.filter(
        (item) => {
          if (!item?.date) return false; // Skip items without a date
          const todayDepo = new Date(item.date)?.toISOString()?.split("T")[0];
          return todayDepo === today;
        }
      );

      const todayDeposit = todayDepositFunc?.reduce(
        (sum, item) => sum + (item.amount || 0),
        0
      );
      setTodayDeposit(todayDeposit);
    }
    if (dashboardData?.dashboard?.totalWithdrawal?.length > 0) {
      // Calculate the total deposit
      const total = dashboardData.dashboard.totalWithdrawal.reduce(
        (sum, item) => sum + (item.amount || 0),
        0
      );
      setTotalWithdrawal(total);
      const todayDepositFunc =
        dashboardData?.dashboard?.totalWithdrawal?.filter((item) => {
          if (!item?.date) return false; // Skip items without a date
          const todayDepo = new Date(item.date)?.toISOString()?.split("T")[0];
          return todayDepo === today;
        });

      const todayDeposit = todayDepositFunc?.reduce(
        (sum, item) => sum + (item.amount || 0),
        0
      );
      setTodayWithdrawal(todayDeposit);
    }
  }, [dashboardData, today]);

  return (
    <div>
      <h2 className="text-white text-2xl font-bold my-5">Dashboard</h2>

      <div className="space-y-4">
        <div className="text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:pr-3">
          <div className="flex bg-blue-500 rounded-md h-[100px] items-center justify-between px-5">
            <FaUsers className="text-4xl" />
            <div className="text-right">
              <h2 className="font-bold">Total User</h2>
              <h2 className="font-bold text-2xl">{allUsers?.length}</h2>
            </div>
          </div>
          <div className="flex bg-green-500 rounded-md h-[100px] items-center justify-between px-5">
            <MdOutlineVerifiedUser className="text-4xl" />
            <div className="text-right">
              <h2 className="font-bold">Plan Active Memebsers</h2>
              <h2 className="font-bold text-2xl">
                {" "}
                {dashboardData?.dashboard?.totalProProgramUsers?.length || "0"}
              </h2>
            </div>
          </div>
          <div className="flex bg-sky-500 rounded-md h-[100px] items-center justify-between px-5">
            <FaUserClock className="text-4xl" />
            <div className="text-right">
              <h2 className="font-bold">Today Joined Users</h2>
              <h2 className="font-bold text-2xl">{todayUsers.length}</h2>
            </div>
          </div>
        </div>
        <div className="text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:pr-3">
          {/* today deposit */}
          <div className="flex bg-white text-black rounded-md h-[100px] items-center  gap-5 px-5">
            <div className="p-2 bg-green-600 text-white rounded-md">
              <FaCircleDollarToSlot className="text-4xl" />
            </div>
            <div className="">
              <h2 className="font-bold text-2xl flex items-center gap-1">
                <BsCurrencyDollar />
                {todayDeposit.toString().slice(0, 7) || "0.00"}
              </h2>
              <h2 className="font-bold">Today deposit</h2>
            </div>
          </div>
          {/* today withdrawal */}
          <div className="flex bg-white text-black rounded-md h-[100px] items-center  gap-5 px-5">
            <div className="p-2 border border-green-600 text-black rounded-md">
              <FaWallet className="text-4xl" />
            </div>
            <div className="">
              <h2 className="font-bold text-2xl flex items-center gap-1">
                <BsCurrencyDollar />
                {todayWithdrawal.toString().slice(0, 7) || "0.00"}
              </h2>
              <h2 className="font-bold">Today Withdrawal</h2>
            </div>
          </div>
          {/* total deposit */}
          <div className="flex bg-white text-black rounded-md h-[100px] items-center  gap-5 px-5">
            <div className="p-2 bg-green-600 text-white rounded-md">
              <FaCircleDollarToSlot className="text-4xl" />
            </div>
            <div className="">
              <h2 className="font-bold text-2xl flex items-center gap-1">
                <BsCurrencyDollar />
                {totalDeposit.toString().slice(0, 7) || "0.00"}
              </h2>
              <h2 className="font-bold">Total deposit</h2>
            </div>
          </div>
          {/* total withdrawal */}
          <div className="flex bg-white text-black rounded-md h-[100px] items-center  gap-5 px-5">
            <div className="p-2 border border-green-600 text-black rounded-md">
              <FaWallet className="text-4xl" />
            </div>
            <div className="">
              <h2 className="font-bold text-2xl flex items-center gap-1">
                <BsCurrencyDollar />
                {totalWithdrawal.toString().slice(0, 7) || "0.00"}
              </h2>
              <h2 className="font-bold">Total Withdrawal</h2>
            </div>
          </div>
          {/* reject */}
          <div className="flex bg-white text-black rounded-md h-[100px] items-center  gap-5 px-5">
            <div className="p-2 bg-orange-400 text-white rounded-md">
              <AiOutlineLoading3Quarters className="text-4xl" />
            </div>
            <div className="">
              <h2 className="font-bold text-2xl flex items-center gap-1">
                <BsCurrencyDollar />
                {/* {dashboardData?.dashboard?.totalDeposit || "0.00"} */}
                0.00
              </h2>
              <h2 className="font-bold">Pending deposit</h2>
            </div>
          </div>
          {/* reject */}
          <div className="flex bg-white text-black rounded-md h-[100px] items-center  gap-5 px-5">
            <div className="p-2 bg-orange-400 text-white rounded-md">
              <BiBlock className="text-4xl" />
            </div>
            <div className="">
              <h2 className="font-bold text-2xl flex items-center gap-1">
                <BsCurrencyDollar />
                {/* {dashboardData?.dashboard?.totalDeposit || "0.00"} */}
                0.00
              </h2>
              <h2 className="font-bold">Reject deposit</h2>
            </div>
          </div>
          {/*  total deposit charge */}
          <div className="flex bg-white text-black rounded-md h-[100px] items-center  gap-5 px-5">
            <div className="p-2 bg-orange-400 text-white rounded-md">
              <BsCurrencyDollar className="text-4xl" />
            </div>
            <div className="">
              <h2 className="font-bold text-2xl flex items-center gap-1">
                <BsCurrencyDollar />
                {dashboardData?.dashboard?.totalDepositCharge || "0.00"}
              </h2>
              <h2 className="font-bold">Deposit Charge</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
