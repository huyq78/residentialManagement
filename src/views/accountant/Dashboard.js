import React, { useEffect, useState } from "react";
import { CChart } from "@coreui/react-chartjs";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

export default function Dashboard() {
  // const [fee, setFee] = useState(null);
  // const [isFetching, setIsFetching] = useState(false);
  // const [label, setLabel] = useState([]);
  // const [statisticData, setStatisticData] = useState([]);
  // const date = new Date().getFullYear();
  // let list = [];
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = () => {
  //   fetch(`http://localhost:5000/transaction/statistic-fee?year=${date}`, {
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data.data.statistic)
  //       list = data.data.statistic;
  //       list.map((statistic) => {
  //         setLabel([...label, statistic.fee.name]);
  //         setStatisticData([...statisticData, statistic.total]);})
  //         console.log(label)
  //       setIsFetching(true);
  //     });
  // };

  // const data = {
  //   labels: label,
  //   datasets: [
  //     {
  //       label: label,
  //       data: statisticData,
  //     },
  //   ],
  // };
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        {/* <CChart type="doughnut" data={data} /> */}
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
    </>
  );
}
