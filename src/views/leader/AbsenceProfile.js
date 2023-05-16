import React from "react";

const AbsenceProfile = () => {
  return (
    <section className="relative py-16 bg-blueGray-200">
      <div className="container mx-auto px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
          <div className="px-6">
            <div className=" mt-20 ">
              <button
                className="text-white bg-lightBlue-500 border border-solid border-teal-500 hover:bg-teal-500 hover:text-white active:bg-teal-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  history.replace("/leader/create-absence", {
                    state: citizenId,
                  });
                }}
              >
                Tạm chú
              </button>
              <button
                className="text-white bg-lightBlue-500 border border-solid border-teal-500 hover:bg-teal-500 hover:text-white active:bg-teal-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  history.replace("/leader/create-stay", { state: citizenId });
                }}
              >
                Tạm vắng
              </button>
              <button
                className="text-white bg-lightBlue-500 border border-solid border-teal-500 hover:bg-teal-500 hover:text-white active:bg-teal-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  history.replace("/leader/create-death", { state: citizenId });
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
  );
};

export default AbsenceProfile;
