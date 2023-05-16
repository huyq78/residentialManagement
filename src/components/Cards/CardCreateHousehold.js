import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import userInfo from "./CardTableAdmin";
// components

export default function CardCreateHousehold() {
  const [citizen, setCitizen] = useState(null);
  const [chooseOwner, setChooseOwner] = useState(true);
  const [form, setForm] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [owner, setOwner] = useState(null);
  let ownerId;
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
  let history = useHistory();
  const handleChange = (event) =>
    setInputText({
      ...inputText,
      [event.target.name]: event.target.value,
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/household/create", {
      method: "POST",
      headers: {
        Accept: "application/json, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        household_id: inputText.household_id,
        owner_id: owner._id,
        areaCode: inputText.areaCode,
        address: {
          province: inputText.province,
          district: inputText.district,
          ward: inputText.ward,
          no: inputText.no,
        },
        members: [
          {
            citizen_id: owner._id,
            relation: "Chủ hộ",
          },
        ],
        move_in: {
          date: inputText.date,
          reason: inputText.reason,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        history.replace("/leader/household");
        // code here //
        if (data.errors) {
          alert(data.errors[0].message); /*displays error message*/
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCitizen();
  }, [isFetching]);

  const fetchCitizen = () => {
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
        setIsFetching(true);
        console.log(citizen);
      });
  };

  return (
    <>
      {chooseOwner ? (
        <>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="block w-full overflow-x-auto">
              {/* Projects table */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Chọn chủ hộ
                    </th>

                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  {citizen &&
                    citizen.map((citizen) => (
                      <tr key={citizen._id}>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-l whitespace-nowrap p-4 text-left">
                          {citizen.name.firstName} {citizen.name.lastName}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-l whitespace-nowrap p-4 text-left">
                          <button
                            className="text-teal-500 bg-transparent border border-solid border-teal-500 hover:bg-teal-500 hover:text-white active:bg-teal-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mt-3 mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => {
                              ownerId = citizen._id;
                              setOwner(citizen);
                              setChooseOwner(false);
                              setForm(true);
                              console.log(ownerId);
                            }}
                          >
                            Chọn
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : null}
      {form ? (
        <>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Chủ hộ: {owner.name.firstName} {owner.name.lastName}
                </h6>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Mã hộ
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
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
                      value={inputText.date}
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
                    Tạo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ):null}
      </>
  );
}
