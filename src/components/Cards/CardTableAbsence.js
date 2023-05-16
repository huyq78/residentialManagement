import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// // components

import TableDropdown from "components/Dropdowns/TableDropdown.js";
import { Link, useHistory } from "react-router-dom";
import CardUpdateUser from "./CardUpdateUser";
import { data } from "autoprefixer";

export default function CardTable({ color}) {
  const [showModal, setShowModal] = useState(false);
  const [absence, setAbsence] = useState(null);
  const [citizen, setCitizen] = useState(null);
  const [date, setDate] = useState({
    from: "",
    to: "",
  });
  let history = useHistory();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:5000/absence/list", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAbsence(data.data.list);
        let curr = new Date(data.data.list.date.from);
        var from = curr.toISOString().substring(0,10);
        curr = new Date(data.data.list.date.to);
        var to = curr.toISOString().substring(0,10);
        setDate({from: from, to: to});
      });
  };
  
  const fetchCitizen = (citizenId) => {
    fetch(`http://localhost:5000/citizen/profile/${citizenId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCitizen(data.data.citizen);
      })
      .catch((error) => console.log(error))
  };

  const fetchDelete = (id) => {
    fetch(`http://localhost:5000/household/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => console.log(res));
  };
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Danh sách tạm chú
              </h3>
            </div>
            <Link
            to="/leader/create-absence"
              className="text-lightBlue-500 bg-transparent border border-solid border-lightBlue-500 hover:bg-lightBlue-500 hover:text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              Tạo
            </Link>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Tên
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Từ ngày
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Đến ngày
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {absence &&
                absence.map((absence) => (
                  <tr key={absence._id} onChange={fetchCitizen(absence.citizen_id)}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-l whitespace-nowrap p-4">
                        {citizen._id}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-l whitespace-nowrap p-4">
                        {absence.date.from.substring(0,10)}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-l whitespace-nowrap p-4">
                        {absence.date.to.substring(0,10)}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                      <button
                        className="text-teal-500 bg-transparent border border-solid border-teal-500 hover:bg-teal-500 hover:text-white active:bg-teal-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          history.replace("/leader/household/profile", {state: absence._id})
                        }}
                      >
                        Xem
                      </button>
                      <button
                        className="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={(e) => {
                          fetchDelete(absence._id);
                          window.location.reload(true);
                        }}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
