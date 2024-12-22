"use client";
import RegistrationFunction from "@/components/RegistationFunction";
import UpLine from "@/components/UpLine/UpLine";
import useGetAllUsers from "@/hooks/useGetAllUsers/useGetAllUsers";
import SendRefersPayment from "@/page/admin/ManageRefers/SendRefersPayment";
import { useSession } from "next-auth/react";
import React from "react";

const Refers = () => {
  const { data: user } = useSession() || {};
  const [allUsers, refetch] = useGetAllUsers({
    adminId: user?.user?._id,
    adminEmail: user?.user?.email,
    wallet: user?.user?.wallet,
  });

  return (
    <div>
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
              <th className="whitespace-nowrap">Refers</th>
              <th className="whitespace-nowrap">Reward Members</th>
              <th className="whitespace-nowrap">Total Payment</th>
              <th className="whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.map((item, idx) => (
              <tr className="text-white mx-auto" key={idx}>
                <th className="whitespace-nowrap">{idx + 1}</th>
                <th className="whitespace-nowrap">
                  {item?._id?.slice(0, 5)}... {item?._id?.slice(19, 24)}
                </th>
                <th className="whitespace-nowrap">{item?.wallet}</th>
                <th className="whitespace-nowrap">
                  <UpLine id={item?._id} />
                </th>
                <th className="whitespace-nowrap">
                  {item?.refersReword?.members || 0}
                </th>
                <th className="whitespace-nowrap">
                  {item?.refersReword?.totalPayment || 0}
                </th>
                <th className="whitespace-nowrap">
                  <SendRefersPayment
                    userId={item?._id}
                    wallet={item?.wallet}
                    given={item?.refersReword?.members}
                    totalPay={item?.refersReword?.totalPayment}
                    validate={refetch}
                  />
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
