"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { FaUserClock, FaUserPlus } from "react-icons/fa6";
import { FaGift, FaUserCog } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa6";
import { MdQuestionAnswer } from "react-icons/md";
import AdminDrawer from "./AdminDrawer";
import { GrGamepad } from "react-icons/gr";
import { MdOutlineMedicalInformation } from "react-icons/md";
import { SlMenu } from "react-icons/sl";
import { LuNewspaper } from "react-icons/lu";
import { FiImage } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";
import { FaCertificate } from "react-icons/fa";
import { FaUserTag } from "react-icons/fa";
import { SiFuturelearn } from "react-icons/si";
import { BiWallet } from "react-icons/bi";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineManageAccounts } from "react-icons/md";
import { PiTrademarkRegisteredLight } from "react-icons/pi";

const AdminNavigateLink = () => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const ulLinks = (
    <>
      <li className="border border-gray-600  rounded-md hover:bg-gray-700 p-2">
        <Link
          href={"/admin/dashboard"}
          className="flex items-center text-md font-semibold gap-3"
        >
          <AiOutlineDashboard className="text-2xl" /> Dashboard
        </Link>
      </li>
      {/* new dropdown */}
      <li className="border border-gray-600 rounded-md hover:bg-gray-700 p-2">
        <button
          onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
          className="flex items-center text-md font-semibold gap-3 w-full text-left"
        >
          <FaDatabase className="text-2xl" /> Website Data
        </button>

        {/* Submenu items with smooth transition */}
        <ul
          className={`ml-6 mt-2 space-y-2 overflow-hidden transition-all duration-300 ${
            isSubMenuOpen ? "opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{ transitionProperty: "max-height, opacity" }}
        >
          <li className="border border-gray-600  rounded-md hover:bg-gray-800 p-2">
            <Link
              href={"/admin/dashboard/websiteData"}
              className="flex items-center text-md font-semibold gap-3"
            >
              <FaDatabase className="text-2xl" /> Website Info
            </Link>
          </li>
          <li className="border border-gray-600  rounded-md hover:bg-gray-800 p-2">
            <Link
              href={"/admin/dashboard/allUpdates"}
              className="flex items-center text-md font-semibold gap-3"
            >
              <LuNewspaper className="text-2xl" /> Updates
            </Link>
          </li>
          <li className="border border-gray-600  rounded-md hover:bg-gray-800 p-2">
            <Link
              href={"/admin/dashboard/testimonialData"}
              className="flex items-center text-md font-semibold gap-3"
            >
              <MdOutlineMedicalInformation className="text-2xl" /> Testimonail
            </Link>
          </li>
          <li className="border border-gray-600  rounded-md hover:bg-gray-800 p-2">
            <Link
              href={"/admin/dashboard/faqData"}
              className="flex items-center text-md font-semibold gap-3"
            >
              <MdQuestionAnswer className="text-2xl" /> Faq
            </Link>
          </li>
          <li className="border border-gray-600  rounded-md hover:bg-gray-800 p-2">
            <Link
              href={"/admin/dashboard/banner"}
              className="flex items-center text-md font-semibold gap-3"
            >
              <FiImage className="text-2xl" /> Banner
            </Link>
          </li>
          <li className="border border-gray-600  rounded-md hover:bg-gray-800 p-2">
            <Link
              href={"/admin/dashboard/royaltyTag"}
              className="flex items-center text-md font-semibold gap-3"
            >
              <FaUserTag className="text-2xl" /> Royalty Tag
            </Link>
          </li>
          <li className="border border-gray-600  rounded-md hover:bg-gray-800 p-2">
            <Link
              href={"/admin/dashboard/certified "}
              className="flex items-center text-md font-semibold gap-3"
            >
              <FaCertificate className="text-2xl" /> Certified
            </Link>
          </li>
          <li className="border border-gray-600  rounded-md hover:bg-gray-800 p-2">
            <Link
              href={"/admin/dashboard/wallets "}
              className="flex items-center text-md font-semibold gap-3"
            >
              <IoWalletOutline className="text-2xl" /> Wallets
            </Link>
          </li>
          <li className="border border-gray-600  rounded-md hover:bg-gray-800 p-2">
            <Link
              href={"/admin/dashboard/registerInfo "}
              className="flex items-center text-md font-semibold gap-3"
            >
              <PiTrademarkRegisteredLight className="text-2xl" /> Register Info
            </Link>
          </li>
        </ul>
      </li>
      <li className="border border-gray-600  rounded-md hover:bg-gray-700 p-2">
        <Link
          href={"/admin/dashboard/allUser"}
          className="flex items-center text-md font-semibold gap-3"
        >
          <FaUserClock className="text-2xl" /> All Users
        </Link>
      </li>
      <li className="border border-gray-600  rounded-md hover:bg-gray-700 p-2">
        <Link
          href={"/admin/dashboard/allLottery"}
          className="flex items-center text-md font-semibold gap-3"
        >
          <FaGift className="text-2xl" /> All Lottery
        </Link>
      </li>
      <li className="border border-gray-600  rounded-md hover:bg-gray-700 p-2">
        <Link
          href={"/admin/dashboard/topEarners"}
          className="flex items-center text-md font-semibold gap-3"
        >
          <SiFuturelearn className="text-2xl" /> Top Earners
        </Link>
      </li>
      <li className="border border-gray-600  rounded-md hover:bg-gray-700 p-2">
        <Link
          href={"/admin/dashboard/royaltySalary"}
          className="flex items-center text-md font-semibold gap-3"
        >
          <BiWallet className="text-2xl" /> Royalty Salary
        </Link>
      </li>
      <li className="border border-gray-600  rounded-md hover:bg-gray-700 p-2">
        <Link
          href={"/admin/dashboard/proProgram"}
          className="flex items-center text-md font-semibold gap-3"
        >
          <SlMenu className="text-2xl" /> Pro Program
        </Link>
      </li>
      <li className="border border-gray-600  rounded-md hover:bg-gray-700 p-2">
        <Link
          href={"/admin/dashboard/gamingNft"}
          className="flex items-center text-md font-semibold gap-3"
        >
          <GrGamepad className="text-2xl" /> Gaming NFT
        </Link>
      </li>
      <li className="border border-gray-600  rounded-md hover:bg-gray-700 p-2">
        <Link
          href={"/admin/dashboard/manageUsers"}
          className="flex items-center text-md font-semibold gap-3"
        >
          <MdOutlineManageAccounts className="text-2xl" /> Manage Users
        </Link>
      </li>
    </>
  );

  return (
    <div className="bg-gray-800 text-white border-gray-900 border h-[]100vh]">
      <div className="flex md:hidden justify-between items-center p-4">
        <div className="md:hidden">
          <AdminDrawer />
        </div>
        <Link href={"/admin/dashboard"}>
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </Link>
      </div>
      <Link className="hidden md:inline" href={"/admin/dashboard"}>
        <h2 className="text-3xl font-bold p-4">Dashboard</h2>
      </Link>

      <ul className="hidden md:flex flex-col gap-4 p-5">{ulLinks}</ul>
    </div>
  );
};

export default AdminNavigateLink;
