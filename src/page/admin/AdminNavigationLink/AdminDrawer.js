"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaBars,
  FaDatabase,
  FaGift,
  FaUserClock,
  FaUserTag,
} from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { IoHomeOutline } from "react-icons/io5";
import "./admindrawer.css";
import { MdOutlineManageAccounts, MdQuestionAnswer } from "react-icons/md";
import { GrGamepad } from "react-icons/gr";
import { MdOutlineMedicalInformation } from "react-icons/md";
import { SlMenu } from "react-icons/sl";
import { LuNewspaper } from "react-icons/lu";
import { FiImage } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";
import { FaCertificate } from "react-icons/fa";
import { SiFuturelearn } from "react-icons/si";
import { BiWallet } from "react-icons/bi";
import { AiOutlineDashboard } from "react-icons/ai";

const AdminDrawer = () => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById("my-drawer-4");
    if (drawerCheckbox) {
      drawerCheckbox.checked = false;
    }
  };

  const ulLinks = (
    <>
      <li className="border border-gray-600  rounded-md hover:bg-gray-700 p-2">
        <Link
          onClick={closeDrawer}
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
          className={`ml-2 mt-2 space-y-2 overflow-hidden transition-all duration-300 ${
            isSubMenuOpen ? "opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{ transitionProperty: "max-height, opacity" }}
        >
          <li className="border border-gray-600  rounded-md hover:bg-gray-800 p-2">
            <Link
              onClick={closeDrawer}
              href={"/admin/dashboard/websiteData"}
              className="flex items-center text-md font-semibold gap-3"
            >
              <FaDatabase className="text-2xl" /> Website Info
            </Link>
          </li>
          <li className="border border-gray-600  rounded-md hover:bg-gray-800 p-2">
            <Link
              onClick={closeDrawer}
              href={"/admin/dashboard/allUpdates"}
              className="flex items-center text-md font-semibold gap-3"
            >
              <LuNewspaper className="text-2xl" /> Updates
            </Link>
          </li>
          <li className="border border-gray-600  rounded-md hover:bg-gray-800 p-2">
            <Link
              onClick={closeDrawer}
              href={"/admin/dashboard/testimonialData"}
              className="flex items-center text-md font-semibold gap-3"
            >
              <MdOutlineMedicalInformation className="text-2xl" /> Testimonail
            </Link>
          </li>
          <li className="border border-gray-600  rounded-md hover:bg-gray-800 p-2">
            <Link
              onClick={closeDrawer}
              href={"/admin/dashboard/faqData"}
              className="flex items-center text-md font-semibold gap-3"
            >
              <MdQuestionAnswer className="text-2xl" /> Faq
            </Link>
          </li>
          <li className="border border-gray-600  rounded-md hover:bg-gray-800 p-2">
            <Link
              onClick={closeDrawer}
              href={"/admin/dashboard/banner"}
              className="flex items-center text-md font-semibold gap-3"
            >
              <FiImage className="text-2xl" /> Banner
            </Link>
          </li>
          <li className="border border-gray-600  rounded-md hover:bg-gray-800 p-2">
            <Link
              onClick={closeDrawer}
              href={"/admin/dashboard/royaltyTag"}
              className="flex items-center text-md font-semibold gap-3"
            >
              <FaUserTag className="text-2xl" /> Royalty Tag
            </Link>
          </li>
          <li className="border border-gray-600  rounded-md hover:bg-gray-800 p-2">
            <Link
              onClick={closeDrawer}
              href={"/admin/dashboard/certified "}
              className="flex items-center text-md font-semibold gap-3"
            >
              <FaCertificate className="text-2xl" /> Certified
            </Link>
          </li>
          <li className="border border-gray-600  rounded-md hover:bg-gray-800 p-2">
            <Link
              onClick={closeDrawer}
              href={"/admin/dashboard/wallets "}
              className="flex items-center text-md font-semibold gap-3"
            >
              <IoWalletOutline className="text-2xl" /> Wallets
            </Link>
          </li>
        </ul>
      </li>
      <li className="border border-gray-600  rounded-md hover:bg-gray-700 p-2">
        <Link
          onClick={closeDrawer}
          href={"/admin/dashboard/allUser"}
          className="flex items-center text-md font-semibold gap-3"
        >
          <FaUserClock className="text-2xl" /> All Users
        </Link>
      </li>
      <li className="border border-gray-600  rounded-md hover:bg-gray-700 p-2">
        <Link
          onClick={closeDrawer}
          href={"/admin/dashboard/allLottery"}
          className="flex items-center text-md font-semibold gap-3"
        >
          <FaGift className="text-2xl" /> All Lottery
        </Link>
      </li>
      <li className="border border-gray-600  rounded-md hover:bg-gray-700 p-2">
        <Link
          onClick={closeDrawer}
          href={"/admin/dashboard/topEarners"}
          className="flex items-center text-md font-semibold gap-3"
        >
          <SiFuturelearn className="text-2xl" /> Top Earners
        </Link>
      </li>
      <li className="border border-gray-600  rounded-md hover:bg-gray-700 p-2">
        <Link
          onClick={closeDrawer}
          href={"/admin/dashboard/royaltySalary"}
          className="flex items-center text-md font-semibold gap-3"
        >
          <BiWallet className="text-2xl" /> Royalty Salary
        </Link>
      </li>
      <li className="border border-gray-600  rounded-md hover:bg-gray-700 p-2">
        <Link
          onClick={closeDrawer}
          href={"/admin/dashboard/proProgram"}
          className="flex items-center text-md font-semibold gap-3"
        >
          <SlMenu className="text-2xl" /> Pro Program
        </Link>
      </li>
      <li className="border border-gray-600  rounded-md hover:bg-gray-700 p-2">
        <Link
          onClick={closeDrawer}
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
    <div className="drawer z-40">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer">
          <FaBars className="mx-auto text-base  md:text-xl bg-black hover:bg-gray-900  text-primary border border-primary h-6 w-8 md:h-10 md:w-12 rounded-lg" />
        </label>
      </div>
      <div className="drawer-side">
        {/* Apply custom CSS class for conditional blur */}
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay custom-backdrop-blur"
        ></label>
        <div className="menu bg-black min-h-full w-80 p-4 relative mt-10 rounded-lg border border-gray-500">
          {/* Close Button Positioned Higher */}
          <label
            htmlFor="my-drawer-4"
            className="absolute -top-7 text-white rounded-2xl left-2 cursor-pointer hover:font-extrabold"
            aria-label="close drawer"
          >
            <RxCross2 className="w-5 h-5 text-center hover:border hover:shadow-md rounded-full" />
          </label>
          {/* Sidebar content here */}
          <div className="text-white">
            <ul className=" flex flex-col gap-3">{ulLinks}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDrawer;
