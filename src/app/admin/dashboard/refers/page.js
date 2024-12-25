"use client";
import DownLine from "@/components/DownLine/DownLine";
import RegistrationFunction from "@/components/RegistationFunction";
import UpLine from "@/components/UpLine/UpLine";
import { BASE_URL } from "@/constant/constant";
import useGetAllUsers from "@/hooks/useGetAllUsers/useGetAllUsers";
import SendDownLinePayment from "@/page/admin/ManageRefers/SendDownLinePayment";
import SendRefersPayment from "@/page/admin/ManageRefers/SendRefersPayment";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import Swal from "sweetalert2";

const Refers = () => {
  const { data: user } = useSession() || {};
  const [allUsers, refetch] = useGetAllUsers({
    adminId: user?.user?._id,
    adminEmail: user?.user?.email,
    wallet: user?.user?.wallet,
  });

  console.log(allUsers);

  const handleReferOff = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Off refer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Block it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.put(
            `${BASE_URL}/admin/blockUser/${user?.user?._id}/${user?.user?.email}/${user?.user?.wallet}/${id}`,
            { referStatus: false }
          );
          console.log(data);
          if (data?.status) {
            refetch();
            Swal.fire({
              title: "Success",
              text: "User refer Blocked Completed.",
              icon: "success",
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const handleReferOn = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to un block him",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Un Block",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.put(
            `${BASE_URL}/admin/blockUser/${user?.user?._id}/${user?.user?.email}/${user?.user?.wallet}/${id}`,
            { referStatus: true }
          );
          console.log(data);
          if (data?.status) {
            refetch();
            Swal.fire({
              title: "Success",
              text: "User Blocked Completed.",
              icon: "success",
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <div>
      <RegistrationFunction />
      <h2 className="text-white text-2xl font-bold my-5">
        Manage Refers Payment
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-white">
              <th className="whitespace-nowrap">No.</th>
              <th className="whitespace-nowrap">UserId</th>
              <th className="whitespace-nowrap">Wallet</th>
              <th className="whitespace-nowrap">Up Line</th>
              <th className="whitespace-nowrap">Down Line</th>
              <th className="whitespace-nowrap">Up Line Total Reward</th>
              <th className="whitespace-nowrap">Down Line Total Reward</th>
              <th className="whitespace-nowrap">Send UpLine Payment</th>
              <th className="whitespace-nowrap">Send DownLine Payment</th>
              <th className="whitespace-nowrap">Off Refer Cometion</th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.map((item, idx) => (
              <tr className="text-white mx-auto" key={idx}>
                <th className="whitespace-nowrap">{idx + 1}</th>
                <th className="whitespace-nowrap">
                  {item?._id?.slice(0, 5)}... {item?._id?.slice(19, 24)}
                </th>
                <th className="whitespace-nowrap">
                  {item?.wallet?.slice(0, 7)}... {item?.wallet?.slice(35)}
                </th>
                <th className="whitespace-nowrap">
                  <UpLine id={item?._id} />
                </th>
                <th className="whitespace-nowrap">
                  <DownLine id={item?._id} />
                </th>
                <th className="whitespace-nowrap">
                  {String(item?.refersReword?.totalPayment || 0).slice(0, 10)}
                </th>
                <th className="whitespace-nowrap">
                  {String(item?.refersReword?.totalDownLinePayment || 0).slice(
                    0,
                    10
                  )}
                </th>

                <th className="whitespace-nowrap">
                  {" "}
                  <SendRefersPayment
                    userId={item?._id}
                    wallet={item?.wallet}
                    given={item?.refersReword?.members || 0}
                    totalPay={item?.refersReword?.totalPayment || 0}
                    validate={refetch}
                    downLineMembers={item?.refersReword?.downLineMembers || 0}
                    totalDownLinePayment={
                      item?.refersReword?.totalDownLinePayment || 0
                    }
                    referStatus={item?.referStatus}
                  />
                </th>
                <th className="whitespace-nowrap">
                  <SendDownLinePayment
                    userId={item?._id}
                    wallet={item?.wallet}
                    given={item?.refersReword?.downLineMembers}
                    totalPay={item?.refersReword?.totalDownLinePayment || 0}
                    validate={refetch}
                    members={item?.refersReword?.members}
                    totalPayment={item?.refersReword?.totalPayment}
                    referStatus={item?.referStatus}
                  />
                </th>
                <th className="whitespace-nowrap">
                  {item?.referStatus ? (
                    <>
                      <button
                        onClick={() => handleReferOff(item?._id)}
                        className="bg-red-500 hover:bg-red-700 px-5 py-1 rounded-md "
                      >
                        Disable
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleReferOn(item?._id)}
                        className="bg-green-500 hover:bg-green-700 px-5 py-1 rounded-md "
                      >
                        Enable
                      </button>
                    </>
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

export default Refers;
