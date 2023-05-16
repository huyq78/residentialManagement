import React, { useState, useEffect } from "react";

import { useHistory, useLocation } from "react-router-dom";

export default function Donate() {
  const [donation, setDonation] = useState(null);
  const [feeId, setFeeId] = useState(null);
  const [amount, setAmount] = useState(0);
  const [showDonation, setShowDonation] = useState(true);
  const history = useHistory();
  const location = useLocation();
  const householdId = location.state.state;
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`http://localhost:5000/fee/donation`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDonation(data.data.list);
      });
  };

  const handleSubmit = (id) => {
    fetch(`http://localhost:5000/transaction/donate/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        fee_id: feeId,
        amount: amount,
        stage: 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
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
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
        {showDonation ? (
        <>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="block w-full overflow-x-auto">
              {/* Projects table */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Chọn khoản đóng góp
                    </th>

                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  {donation &&
                    donation.map((donation) => (
                      <tr key={donation._id}>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-l whitespace-nowrap p-4 text-left">
                          {donation.name}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-l whitespace-nowrap p-4 text-left">
                          <button
                            className="text-teal-500 bg-transparent border border-solid border-teal-500 hover:bg-teal-500 hover:text-white active:bg-teal-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mt-3 mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => {
                              setShowDonation(false);
                              setFeeId(donation._id);
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
      ) : (
        <>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            {/* <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Chủ hộ: {owner.name.firstName} {owner.name.lastName}
                </h6>
              </div>
            </div> */}
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Số tiền muốn đóng
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="cost"
                        value={amount}
                        onChange={(e)=>setAmount(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <button
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                        handleSubmit(householdId);
                        history.replace("/accountant/transaction-by-household", householdId);
                    }}
                  >
                    Đóng góp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
        </div>
      </div>
    </>
  );
}
