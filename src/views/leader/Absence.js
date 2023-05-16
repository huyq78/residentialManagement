import React, { useState, useEffect } from "react";

// components
import { useLocation } from "react-router-dom";

export default function Absence() {
  const location = useLocation();
  const [absence, setAbsence] = useState(null);
  const [isFetching, setFetching] = useState(false);

  const absenceId = location.state.state;
  useEffect(() => {
    fetchAbsence();
  }, [isFetching]);
  const fetchAbsence = () => {
    fetch(`http://localhost:5000/absence/get/${absenceId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAbsence(data.data.list);
        setFetching(true);
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
        <section className="relative py-16 bg-blueGray-200">
      <div className="container mx-auto px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
          <div className="px-6">
            <div className=" mt-20 ">
              <h3 className="text-center text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                {/* {absence.citizen_id.name.firstName} {absence.citizen_id.name.name.lastName} */}
              </h3>
              <div className="mb-2 text-blueGray-600 mt-10">
                {/* <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i> */}
                Nơi ở: {absence.place}
              </div>
              <div className="mb-2 text-blueGray-600">
                Mã: {absence.code}
              </div>
              <div className="mb-2 text-blueGray-600">
                Từ ngày: {absence.date.from.substring(0,10)}
              </div>
              <div className="mb-2 text-blueGray-600">
                Đến ngày: {absence.date.to.substring(0,10)}
              </div>
              <div className="mb-2 text-blueGray-600">
                Lí do: {absence.reason}
              </div>
            </div>
            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-9/12 px-4">
                  <button
                    className="font-normal text-lightBlue-500"
                    onClick={() => {
                      // setInputText(citizen);
                      // setInputCard({
                      //   cardId: citizen.card_id.card_id,
                      //   location: citizen.card_id.location,
                      // });
                      // setShowModal(true);
                      // setProfile(false);
                    }}
                  >
                    Cập nhật
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
        </div>
      </div>
    </>
  );
}