import Image from "next/image";
import { BiNetworkChart } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { LuCircleDollarSign } from "react-icons/lu";

const TopEarnersCard = ({ data }) => {
  return (
    <div className="bg-gray-500 bg-opacity-20 py-5">
      <Image
        className="w-20 mx-auto"
        src={data?.image || ""}
        alt="image not found"
        height={500}
        width={500}
      />
      <h2 className="text-white font-bold text-2xl text-center my-2">
        {data?.name}
      </h2>
      <h2 className="text-white font-bold text-2xl text-center bg-green-700  w-fit mx-auto p-2 rounded-full">
        {data?.userId.slice(0, 10)}
      </h2>
      <div className="space-y-2">
        <div>
          <div className="text-primary font-bold text-2xl text-center flex items-center justify-center gap-2">
            <LuCircleDollarSign />
            <h2 className="text-2xl md:text-3xl">{data?.profit}</h2>
          </div>
          <h2 className="text-center text-white font-bold">Total Profit</h2>
        </div>
        <div>
          <div className="text-primary font-bold text-2xl text-center flex items-center justify-center gap-2">
            <BsPeopleFill />
            <h2 className="text-2xl md:text-3xl">{data?.partner}</h2>
          </div>
          <h2 className="text-center text-white font-bold">Total Partner</h2>
        </div>
        <div>
          <div className="text-primary font-bold text-2xl text-center flex items-center justify-center gap-2">
            <BiNetworkChart />
            <h2 className="text-2xl md:text-3xl"> {data?.team}</h2>
          </div>
          <h2 className="text-center text-white font-bold">Total Team</h2>
        </div>
      </div>
    </div>
  );
};

export default TopEarnersCard;
