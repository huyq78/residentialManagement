import React, { useEffect, useState } from "react";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import { Link, useHistory, useLocation } from "react-router-dom";
import format from "date-fns/format";
export default function CitizenProfile() {
  const location = useLocation();
  const [citizen, setCitizen] = useState(null);
  const [isFetching, setFetching] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showProfile, setProfile] = useState(true);
  const [inputText, setInputText] = useState(null);
  const [inputDate, setInputDate] = useState({
    dob: "",
    date: "",
    expiration: "",
  });
  const [historyDate, setHistoryDate] = useState({
    createAt: "",
    updateAt: "",
  });
  const [inputCard, setInputCard] = useState({
    cardId: "",
    location: "",
  });
  const citizenId = location.state.state;

  let history = useHistory();
  useEffect(() => {
    fetchCitizen();
  }, [isFetching]);

  const handleChange = (event) =>
    setInputText({
      ...inputText,
      [event.target.name]: event.target.value,
    });

  const handleDate = (event) =>
    setInputDate({ ...inputDate, [event.target.name]: event.target.value });
  const handleCard = (event) =>
    setInputCard({ ...inputCard, [event.target.name]: event.target.value });
  const fetchCitizen = () => {
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
        let curr = new Date(data.data.citizen.dob);
        var dob = curr.toISOString().substring(0, 10);
        curr = new Date(data.data.citizen.card_id.date);
        var date = curr.toISOString().substring(0, 10);
        curr = new Date(data.data.citizen.card_id.expiration);
        var expiration = curr.toISOString().substring(0, 10);
        curr = new Date(data.data.citizen.card_id.createdAt);
        var createAt = curr.toUTCString().substring(0, 10);
        curr = new Date(data.data.citizen.card_id.updatedAt);
        var updateAt = curr.toUTCString().substring(0, 10);
        setInputDate({ dob: dob, date: date, expiration: expiration });
        setHistoryDate({createAt: createAt, updateAt: updateAt})
        setFetching(true);
        console.log(inputDate);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:5000/citizen/update_profile/${citizenId}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        card_id: inputCard.cardId,
        location: inputCard.location,
        date: inputDate.date,
        expiration: inputDate.expiration,
        passport_id: inputText.passport_id,
        firstName: inputText.name.firstName,
        lastName: inputText.name.lastName,
        gender: inputText.gender,
        dob: inputDate.dob,
        birthPlace: inputText.birthPlace,
        hometown: inputText.hometown,
        residence: inputText.residence,
        accommodation: inputText.accommodation,
        religion: inputText.religion,
        ethic: inputText.ethic,
        profession: inputText.profession,
        workplace: inputText.workplace,
        education: inputText.education,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload(true);
        // code here //
        if (data.errors) {
          alert("Error Password or Username"); /*displays error message*/
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Thông tin
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="text"
                    >
                      Họ
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="name.firstName"
                      value={inputText.name.firstName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="text"
                    >
                      Tên
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="name.lastName"
                      value={inputText.name.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="text"
                    >
                      Giới tính
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="gender"
                      value={inputText.gender}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="text"
                    >
                      Ngày sinh
                    </label>
                    <input
                      type="date"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="dob"
                      value={inputDate.dob}
                      onChange={handleDate}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="text"
                    >
                      Quê quán
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="hometown"
                      value={inputText.hometown}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="text"
                    >
                      Nơi ở
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="accommodation"
                      value={inputText.accommodation}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="text"
                    >
                      Nơi sinh
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="birthPlace"
                      value={inputText.birthPlace}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="text"
                    >
                      Nơi cư trú
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="residence"
                      value={inputText.residence}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="text"
                    >
                      Tôn giáo
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="religion"
                      value={inputText.religion}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="text"
                    >
                      Dân tộc
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="ethic"
                      value={inputText.ethic}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="text"
                    >
                      Học vấn
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="education"
                      value={inputText.education}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <hr className="mt-6 border-b-1 border-blueGray-300" />

              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Nhận diện
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="text"
                    >
                      CMT/CCCD
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="cardId"
                      value={inputCard.cardId}
                      onChange={handleCard}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="text"
                    >
                      Địa điểm
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="location"
                      value={inputCard.location}
                      onChange={handleCard}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="text"
                    >
                      Ngày đăng kí
                    </label>
                    <input
                      type="date"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="date"
                      value={inputDate.date}
                      onChange={handleDate}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="text"
                    >
                      Hết hạn
                    </label>
                    <input
                      type="date"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="expiration"
                      value={inputDate.expiration}
                      onChange={handleDate}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="text"
                    >
                      Hộ chiếu
                    </label>
                    <input
                      type="number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="passport_id"
                      value={inputText.passport_id}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <hr className="mt-6 border-b-1 border-blueGray-300" />

              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Nghề nghiệp
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="text"
                    >
                      Nghề nghiệp
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="profession"
                      value={inputText.profession}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="text"
                    >
                      Nơi làm việc
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="workplace"
                      value={inputText.workplace}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleSubmit}
                >
                  Lưu
                </button>
                <button
                  className="bg-red-500 text-white active:bg-lightred-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setProfile(true);
                  }}
                >
                  Đóng
                </button>
              </div>
            </form>
          </div>
        </>
      ) : null}
      {citizen && showProfile ? (
        <>
          <main className="profile-page">
            <section className="relative block h-500-px">
              <div
                className="absolute top-0 w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
                }}
              >
                <span
                  id="blackOverlay"
                  className="w-full h-full absolute opacity-50 bg-black"
                ></span>
              </div>
              <div
                className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                style={{ transform: "translateZ(0)" }}
              >
                <svg
                  className="absolute bottom-0 overflow-hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="text-blueGray-200 fill-current"
                    points="2560 0 2560 100 0 100"
                  ></polygon>
                </svg>
              </div>
            </section>
            <section className="relative py-16 bg-blueGray-200">
              <div className="container mx-auto px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                  <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                        <div className="relative">
                          <img
                            alt="..."
                            src={
                              require("assets/img/team-2-800x800.jpg").default
                            }
                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                          />
                        </div>
                      </div>
                    </div>

                    <div className=" mt-20 ">
                      <button
                        className="text-white bg-lightBlue-500 border border-solid border-teal-500 hover:bg-teal-500 hover:text-white active:bg-teal-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          history.replace("/leader/create-absence", {state: citizenId});
                        }}
                      >
                        Tạm vắng
                      </button>
                      <button
                        className="text-white bg-lightBlue-500 border border-solid border-teal-500 hover:bg-teal-500 hover:text-white active:bg-teal-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          history.replace("/leader/create-stay", {state: citizenId});
                        }}
                      >
                        Tạm chú
                      </button>
                      <button
                        className="text-white bg-lightBlue-500 border border-solid border-teal-500 hover:bg-teal-500 hover:text-white active:bg-teal-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          history.replace("/leader/create-death", {state: citizenId});
                        }}
                      >
                        Mất
                      </button>
                      <h3 className="text-center text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                        {citizen.name.firstName} {citizen.name.lastName}
                      </h3>
                      <div className="text-center text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                        <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                        {citizen.gender}
                      </div>
                      <div className="mb-2 text-blueGray-600 mt-10">
                        {/* <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i> */}
                        Ngày sinh: {inputDate.dob}
                      </div>
                      <div className="mb-2 text-blueGray-600">
                        Hộ chiếu: {citizen.passport_id}
                      </div>
                      <div className="mb-2 text-blueGray-600">
                        Quê quán: {citizen.hometown}
                      </div>
                      <div className="mb-2 text-blueGray-600">
                        Nơi cư trú: {citizen.residence}
                      </div>
                      <div className="mb-2 text-blueGray-600">
                        Tôn giáo: {citizen.religion}
                      </div>
                      <div className="mb-2 text-blueGray-600">
                        Nghề nghiệp: {citizen.profession}
                      </div>
                      <div className="mb-2 text-blueGray-600">
                        Nơi làm việc: {citizen.workplace}
                      </div>
                      <div className="mb-2 text-blueGray-600">
                        Học vấn: {citizen.education}
                      </div>
                    </div>
                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-9/12 px-4">
                          <button
                            className="font-normal text-lightBlue-500"
                            onClick={() => {
                              setInputText(citizen);
                              setInputCard({
                                cardId: citizen.card_id.card_id,
                                location: citizen.card_id.location,
                              });
                              setShowModal(true);
                              setProfile(false);
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
            <section className="relative py-16 bg-blueGray-200">
              <div className="container mx-auto px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-4">
                  <div className="px-6">
                    <div className=" mt-10 ">
                    <div className="text-center text-sm leading-normal mt-0 mb-2  font-bold uppercase">
                        Lịch sử
                      </div>
                      <div className="mb-2 text-blueGray-600 mt-10">
                        {/* <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i> */}
                        Ngày tạo: {historyDate.createAt}
                      </div>
                      <div className="mb-2 text-blueGray-600">
                        Ngày cập nhật: {historyDate.updateAt}
                      </div>
                      </div>
                      </div>
                </div>
              </div>
            </section>
          </main>
        </>
      ) : null}
    </>
  );
}
