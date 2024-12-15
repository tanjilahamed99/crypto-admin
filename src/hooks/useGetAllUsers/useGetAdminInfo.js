import { BASE_URL } from "@/constant/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetAdminInfo = ({ adminId, adminEmail, wallet }) => {
  const { data: admins = [], refetch: validate } = useQuery({
    queryKey: ["adminInfo"],
    queryFn: async () => {
      const res = await axios(
        `${BASE_URL}/admin/getAdminInfo/${adminId}/${adminEmail}/${wallet}`
      );
      return res.data;
    },
  });

  return [admins, validate];
};

export default useGetAdminInfo;
