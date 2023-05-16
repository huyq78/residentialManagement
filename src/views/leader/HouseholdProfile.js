import React, { useEffect, useState } from "react";

import { useHistory, useLocation } from "react-router-dom";
export default function HouseholdProfile() {
  const location = useLocation();
  const [household, setHousehold] = useState(null);
  const [isFetching, setFetching] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showProfile, setProfile] = useState(true);
  const [members, setMembers] = useState([]);
  const [inputText, setInputText] = useState({
    household_id: "",
    owner_id: "",
    areaCode: "",
    province: "",
    district: "",
    ward: "",
    no: "",
    date: "",
    reason: "",
  });
  const [inputDate, setInputDate] = useState(null);

  const householdId = location.state.state;

  let history = useHistory();
  useEffect(() => {
    fetchCitizen();
  }, [isFetching]);

  const handleChange = (event) =>
    setInputText({
      ...inputText,
      [event.target.name]: event.target.value,
    });

  const handleDate = (event) => setInputDate(event.target.value);
  const fetchCitizen = () => {
    fetch(`http://localhost:5000/household/profile/${householdId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setHousehold(data.data.household);
        let curr = new Date(data.data.household.move_in.date);
        var date = curr.toISOString().substring(0, 10);
        setInputDate(date);
        setFetching(true);
        console.log(inputDate);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:5000/household/update/${householdId}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        household_id: inputText.household_id,
        owner_id: inputText.owner_id,
        areaCode: inputText.areaCode,
        address: {
          province: inputText.province,
          district: inputText.district,
          ward: inputText.ward,
          no: inputText.no,
        },
        members: members,
        move_in: {
          date: inputDate,
          reason: inputText.reason,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(members);
        // window.location.reload(true);
        // code here //
        if (data.errors) {
          console.log(data.errors); /*displays error message*/
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchDelete = (id) => {
    fetch(
      `http://localhost:5000/household/remove_member?household_id=${householdId}&citizen_id=${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(id);
        // window.location.reload(true);
        // code here //
        if (data.errors) {
          console.log(data); /*displays error message*/
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
                Mã hộ
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="text"
                    >
                      Mã hộ
                    </label>
                    <input
                      type="number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="household_id"
                      value={inputText.household_id}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Địa chỉ
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="text"
                    >
                      Số nhà
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="no"
                      value={inputText.no}
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
                      Phường
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="ward"
                      value={inputText.ward}
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
                      Quận/Huyện
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="district"
                      value={inputText.district}
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
                      Thành phố
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="province"
                      value={inputText.province}
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
                      Mã khu vực
                    </label>
                    <input
                      type="number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="areaCode"
                      value={inputText.areaCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <hr className="mt-6 border-b-1 border-blueGray-300" />

              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Chuyển đến
              </h6>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="text"
                  >
                    Ngày
                  </label>
                  <input
                    type="date"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    name="date"
                    value={inputDate}
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
                    Lí do
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    name="reason"
                    value={inputText.reason}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleSubmit}
                >
                  Sửa
                </button>
              </div>
            </form>
          </div>
        </>
      ) : null}
      {household && showProfile ? (
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
                          history.replace("/leader/household/split", {state: household})
                        }}
                      >
                        Tách hộ
                      </button>
                      <h3 className="text-center text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                        {household.owner_id.name.firstName}{" "}
                        {household.owner_id.name.lastName}
                      </h3>
                      <div className="text-center text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                        Chủ hộ
                      </div>
                      <div className="mb-2 text-blueGray-600 mt-10">
                        {/* <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i> */}
                        Mã hộ: {household.household_id}
                      </div>
                      <div className="mb-2 text-blueGray-600">
                        Địa chỉ: {household.address.no},{" "}
                        {household.address.ward}, {household.address.district},{" "}
                        {household.address.province}
                      </div>
                      <div className="mb-2 text-blueGray-600">
                        Mã khu vực: {household.areaCode}
                      </div>
                      <div className="mb-2 text-blueGray-600">
                        Ngày chuyển đến:{" "}
                        {household.move_in.date.substring(0, 10)}
                      </div>
                      <div className="mb-2 text-blueGray-600">
                        Lí do chuyển đến: {household.move_in.reason}
                      </div>
                    </div>
                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-9/12 px-4">
                          <button
                            className="font-normal text-lightBlue-500"
                            onClick={() => {
                              setMembers(household.members);
                              setInputText({
                                household_id: household.household_id,
                                owner_id: household.owner_id._id,
                                areaCode: household.areaCode,
                                province: household.address.province,
                                district: household.address.district,
                                ward: household.address.ward,
                                no: household.address.no,
                                date: household.move_in.date,
                                reason: household.move_in.reason,
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
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                  <div className="block w-full overflow-x-auto">
                    {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse">
                      <thead>
                        <tr>
                          <td className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-l uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Tên
                          </td>
                          <td className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-l uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Mỗi quan hệ
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {household.members &&
                          household.members.map((member) => (
                            <tr key={member._id}>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-l whitespace-nowrap p-4 text-left">
                                {member.citizen_id.name.firstName} {member.citizen_id.name.lastName}
                              </td>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-l whitespace-nowrap p-4 text-left">
                                {/* {citizen.name.firstName} {citizen.name.lastName} */}
                                {member.relation}
                              </td>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                <button
                                  className="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={(e) => {
                                    fetchDelete(member.citizen_id._id);
                                    console.log(member.citizen_id._id);
                                    // window.location.reload(true);
                                  }}
                                >
                                  Xóa
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-9/12 px-4">
                          <button
                            className="font-normal text-lightBlue-500"
                            onClick={() => {
                              history.replace("/leader/household/add-member", {
                                state: householdId,
                              });
                            }}
                          >
                            Thêm thành viên
                          </button>
                        </div>
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
