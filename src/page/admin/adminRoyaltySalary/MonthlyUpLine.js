"use client";

import { BASE_URL } from "@/constant/constant";
import axios from "axios";
import { useEffect, useState } from "react";

const MonthlyUpLine = ({ userid }) => {
  const [data, setData] = useState(null);
  const [thisMonthCount, setThisMonthCount] = useState(0);

  useEffect(() => {
    if (userid) {
      const fetchData = async () => {
        try {
          const response = await axios(`${BASE_URL}/myRefers/${userid}`);
          const fetchedData = response.data;
          setData(fetchedData);

          // Get the current month and year
          const currentMonth = new Date().getMonth();
          const currentYear = new Date().getFullYear();

          // Filter data based on joined month and year
          const filteredData = fetchedData.result.filter((item) => {
            const joinedDate = new Date(item.joined);
            return (
              joinedDate.getMonth() === currentMonth &&
              joinedDate.getFullYear() === currentYear
            );
          });

          // Set the filtered data count
          setThisMonthCount(filteredData.length);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [userid]);

  return (
    <div>
      <div>{thisMonthCount}</div>
    </div>
  );
};

export default MonthlyUpLine;
