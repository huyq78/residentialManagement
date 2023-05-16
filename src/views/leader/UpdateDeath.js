import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

// components

export default function UpdateDeath() {
  const [inputText, setInputText] = useState({
    code: "",
    place: "",
    date:"",
    reason: "",
  });
  const location = useLocation();
  const history = useHistory();
  const death = location.state.state;

  useEffect(() => {
    let curr = new Date(death.date);
    var date = curr.toISOString().substring(0, 10);
    setInputText({
      code: death.code,
      place: death.place,
      date: date,
      reason: death.reason,
    });
  }, []);

  const handleChange = (event) =>
    setInputText({
      ...inputText,
      [event.target.name]: event.target.value,
    });

  const handleSubmit = (id) => {
    fetch(`http://localhost:5000/death/update/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        code: inputText.code,
        place: inputText.place,
        date: inputText.date,
        reason: inputText.reason,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        history.replace("/leader/citizen");
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
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <div className="rounded-t  mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">Tạm chú</h6>
            </div>
          </div>
          <form>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="text"
                  >
                    Mã
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    name="code"
                    value={inputText.code}
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
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    name="place"
                    value={inputText.place}
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
            </div>
            <div className="flex flex-wrap">
              <button
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={()=>handleSubmit(death._id)}
              >
                Tạo
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
