import React, { useState } from "react";

// components

import CardTable from "components/Cards/CardTableHouseHold";
import { useHistory, useLocation } from "react-router-dom";
import { tr } from "date-fns/locale";

export default function SplitHousehold() {
  const [members, setMembers] = useState([]);
  const [chooseMember, setChooseMember] = useState(true);
  const [chooseOwner, setChooseOwner] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const [choose, setChoose] = useState(false);
  const [memberAdded, setMemberAdded] = useState(null);
  const [householdId, setHouseholdId] = useState(null);
  const [relation, setRelation] = useState("");
  const [form, setForm] = useState(false);
  const [owner, setOwner] = useState(null);
  const location = useLocation();
  const history = useHistory();
  const household = location.state.state;
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

  const removeItem = (item) => {
    setMembers((prevState) =>
      prevState.filter((prevItem) => prevItem !== item)
    );
  };

  const handleChange = (event) =>
    setInputText({
      ...inputText,
      [event.target.name]: event.target.value,
    });

  const handleMembers = (event) => {
    setMembers([
      ...members,
      { name: event.target.name, id: event.target.value },
    ]);
  };

  const handleMemberAdd = (event) => {
    setMemberAdded({
      citizen_id: event.target.name,
      relation: event.target.value,
    });
  };
  const handleSubmit = () => {
    fetch("http://localhost:5000/household/create", {
      method: "POST",
      headers: {
        Accept: "application/json, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        household_id: inputText.household_id,
        owner_id: owner.id,
        areaCode: inputText.areaCode,
        address: {
          province: inputText.province,
          district: inputText.district,
          ward: inputText.ward,
          no: inputText.no,
        },
        members: [
          {
            citizen_id: owner.id,
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
        console.log(data.data.household._id);
        setHouseholdId(data.data.household._id);
        // history.replace("/leader/household");
        // code here //
        if (data.errors) {
          alert("Error Password or Username"); /*displays error message*/
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchDelete = (id) => {
    fetch(
      `http://localhost:5000/household/remove_member?household_id=${household._id}&citizen_id=${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.errors) {
          console.log(data); /*displays error message*/
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddMember = (id) => {
    fetch(`http://localhost:5000/household/add_member/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        citizen_id: memberAdded.id,
        relation: relation,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Thêm thành công");
        console.log(data);
        // window.location.reload(true);
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
      {chooseMember ? (
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-blueGray-500 text-xl font-bold">
                      Chọn thành viên
                    </h6>
                  </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form>
                    {household.members.map((member) => (
                      <div key={member.citizen_id._id}>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                            name={
                              member.citizen_id.name.firstName +
                              " " +
                              member.citizen_id.name.lastName
                            }
                            value={member.citizen_id._id}
                            onChange={handleMembers}
                          />
                          {member.citizen_id.name.firstName}{" "}
                          {member.citizen_id.name.lastName}
                        </label>
                      </div>
                    ))}
                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          setChooseMember(false);
                          setChooseOwner(true);
                          for (let i = 0; i < members.length; i++) {
                            fetchDelete(members[i].id);
                          }
                        }}
                      >
                        Chọn
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

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
                  {members &&
                    members.map((owner) => (
                      <tr key={owner.id}>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-l whitespace-nowrap p-4 text-left">
                          {owner.name}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-l whitespace-nowrap p-4 text-left">
                          <button
                            className="text-teal-500 bg-transparent border border-solid border-teal-500 hover:bg-teal-500 hover:text-white active:bg-teal-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mt-3 mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => {
                              setOwner(owner);
                              setChooseOwner(false);
                              setForm(true);
                              setAddMember(false);
                              removeItem(owner);
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
                  Chủ hộ: {owner.name}
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
                    onClick={() => {
                      handleSubmit();
                      setAddMember(true);
                      setForm(false);
                    }}
                  >
                    Tạo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : null}
      {addMember ? (
        <div className="flex flex-wrap">
          <div className="w-full lg:w-8/12 px-4">
            {choose ? (
              <>
                <div className="relative bg-white flex-auto px-4 lg:px-10 py-10 pt-25">
                  <form>
                    <div className=" w-full mb-3">
                      <label
                        className="block text-blueGray-600 text-l font-bold mb-2"
                        htmlFor="text"
                      >
                        {memberAdded.name}
                      </label>
                      <input
                        type="text"
                        className="border-2 px-3 py-3 placeholder-blueGray-400 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={relation}
                        placeholder="Mối quan hệ"
                        onChange={(e) => setRelation(e.target.value)}
                      />
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-600 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          handleAddMember(householdId);
                          setChoose(false);
                        }}
                      >
                        Thêm
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                  <div className="block w-full overflow-x-auto">
                    {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse">
                      <thead>
                        <tr>
                          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Chọn thành viên
                          </th>
                          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>
                          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {members &&
                          members.map((member) => (
                            <tr key={member.id}>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-l whitespace-nowrap p-4 text-left">
                                {member.name}
                              </td>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-l whitespace-nowrap p-4 text-left">
                                <button
                                  className="text-teal-500 bg-transparent border border-solid border-teal-500 hover:bg-teal-500 hover:text-white active:bg-teal-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mt-3 mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() => {
                                    setMemberAdded(member);
                                    setChoose(true);
                                    removeItem(member);
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
            )}
            <button
              className="text-teal-500 bg-transparent border border-solid border-teal-500 hover:bg-teal-500 hover:text-white active:bg-teal-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mt-3 mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                setAddMember(false);
                history.replace("/leader/household");
              }}
            >
              Hoàn thành
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
