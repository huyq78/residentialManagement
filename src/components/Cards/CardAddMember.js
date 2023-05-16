import { da } from "date-fns/locale";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

const CardAddMember = () => {
  const [members, setMembers] = useState(null);
  const [memberAdded, setMemberAdded] = useState(null);
  const [inputText, setInputText] = useState("");
  const [choose, setChoose] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const householdId = location.state.state;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:5000/citizen/list", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMembers(data.data.list);
      });
  };

  const handleChange = (event) => setInputText(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:5000/household/add_member/${householdId}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        citizen_id: memberAdded._id,
        relation: inputText,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Thêm thành công");
        history.replace("/leader/household");
        if (data.errors) {
          alert(data.errors[0].message); /*displays error message*/
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
          {choose ? (
            <>
              <div className="relative bg-white flex-auto px-4 lg:px-10 py-10 pt-25">
                <form >
                  <div className=" w-full mb-3">
                    <label
                      className="block text-blueGray-600 text-l font-bold mb-2"
                      htmlFor="text"
                    >
                      {memberAdded.name.firstName} {memberAdded.name.lastName}
                    </label>
                    <input
                      type="text"
                      className="border-2 px-3 py-3 placeholder-blueGray-400 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={inputText}
                      placeholder="Mối quan hệ"
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-600 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleSubmit}
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
                          <tr key={member._id}>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-l whitespace-nowrap p-4 text-left">
                              {member.name.firstName} {member.name.lastName}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-l whitespace-nowrap p-4 text-left">
                              <button
                                className="text-teal-500 bg-transparent border border-solid border-teal-500 hover:bg-teal-500 hover:text-white active:bg-teal-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mt-3 mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => {
                                    setMemberAdded(member);
                                    setChoose(true)}}
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
        </div>
      </div>
    </>
  );
};

export default CardAddMember;
