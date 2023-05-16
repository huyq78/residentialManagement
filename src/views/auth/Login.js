import React, {useState} from "react";
import { Link, Redirect, Route, useHistory } from "react-router-dom";
import Admin from "layouts/Admin";
export default function Login() {
  const [inputText, setInputText] = useState({
    phone: "",
    password: "",
    role: "",
  });
  const handleChange = (event) =>
    setInputText({
      ...inputText,
      [event.target.name]: event.target.value,
    });
  let hisory = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: inputText.phone,
        password: inputText.password,
        role: inputText.role,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // code here //
        localStorage.setItem("token", data.data.access_token)
        if(inputText.role === "ADMIN")  hisory.replace("/admin");
        if(inputText.role === "ACCOUNTANT")  hisory.replace("/accountant");
        if(inputText.role === "LEADER") hisory.replace("/leader");
        if (data.errors) {
          alert("Error Password or Username"); /*displays error message*/
          console.log(inputText.phone, inputText.password);
        }
      })
      .catch((err) => {
        console.log(err);
      });
      
  };


  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in 
                  </h6>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="text"
                    >
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="phone"
                      value={inputText.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="password"
                    >
                      Mật khẩu
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="password"
                      value={inputText.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        name="role"
                        value="ADMIN"
                        onChange={handleChange}
                      />{" "}
                      Admin{" "}
                    </label>
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        name="role"
                        value="LEADER"
                        onChange={handleChange}
                      />{" "}
                      Leader{" "}
                    </label>
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        name="role"
                        value="ACCOUNTANT"
                        onChange={handleChange}
                      />{" "}
                      Accountant{" "}
                    </label>
                  </div>
                  <div className="text-center mt-6">
                    <button
                      // to="/admin/dashboard"
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    >
                      Đăng nhập
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
