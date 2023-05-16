import React, { useEffect, useState } from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CardStats from "components/Cards/CardStats";
import { CChart } from "@coreui/react-chartjs";
import { da } from "date-fns/locale";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [male, setMale] = useState(null);
  const [female, setFemale] = useState(null);
  const [other, setOther] = useState(null);
  const [citizen, setCitizen] = useState(null);
  const [household, setHousehold] = useState(null);
  useEffect(() => {
    fetchCitizen();
    fetchHousehold();
    fetchCitizenList();
  }, []);

  const fetchCitizen = () => {
    fetch("http://localhost:5000/citizen/statistic", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMale(data.data.maleTotal);
        setFemale(data.data.femaleTotal);
        setOther(data.data.otherTotal);
      });
  };

  const fetchCitizenList = () => {
    fetch("http://localhost:5000/citizen/list", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCitizen(data.data.list);
        console.log(data);
      });
  };

  const fetchHousehold = () => {
    fetch("http://localhost:5000/household/statistic", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setHousehold(data.data.total.toString());
      });
  };

  const data = {
    labels: ["Nữ", "Nam", "Khác"],
    datasets: [
      {
        label: ["Nữ", "Nam", "Khác"],
        data: [female, male, other],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
      },
    ],
  };
  return (
    <>
      <div className="flex flex-wrap justify-center">
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4 py-4">
          <CardStats
            statSubtitle="Nam"
            statTitle={'' + male}
            statArrow="up"
            statPercentColor="text-emerald-500"
            statIconName="far fa-chart-bar"
            statIconColor="bg-red-500"
          />
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4 py-4">
          <CardStats
            statSubtitle="Nữ"
            statTitle={'' + female}
            statArrow="up"
            statPercentColor="text-emerald-500"
            statIconName="far fa-chart-bar"
            statIconColor="bg-red-500"
          />
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4 py-4">
          <CardStats
            statSubtitle="Khác"
            statTitle={'' +other}
            statArrow="up"
            statPercentColor="text-emerald-500"
            statIconName="far fa-chart-bar"
            statIconColor="bg-red-500"
          />
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4 py-4">
          <CardStats
            statSubtitle="Số hộ khẩu"
            statTitle={'' + household}
            statArrow="up"
            statPercentColor="text-emerald-500"
            statIconName="far fa-chart-bar"
            statIconColor="bg-red-500"
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-1/4 xl:w-4/12 mb-12 mt-12 xl:mb-0 px-4">
          <CChart type="doughnut" data={data} />
        </div>
        <div className="w-full xl:w-8/12 mt-12 px-4 h-full">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    Danh sách công dân
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <Link
                    to={"/leader/citizen"}
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Xem tất cả
                  </Link>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              {/* Projects table */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Tên
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Giới tính
                    </th>
                  </tr>
                </thead>
                <tbody>
                {citizen &&
                  citizen.map((citizen) => (
                    <tr key={citizen._id}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-l whitespace-nowrap p-4">
                        {citizen.name.firstName} {citizen.name.lastName}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {citizen.gender === "MALE" ? (
                          <p>Nam</p>
                        ) : citizen.gender === "FEMALE" ? (
                          <p>Nữ</p>
                        ) : (
                          <p>Khác</p>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
