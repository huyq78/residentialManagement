import React from "react";

// components

import CardTable from "components/Cards/CardTable";

export default function Stay() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable />
        </div>
        {/* <div className="w-full mb-12 px-4">
          <CardTableAdmin color="dark" />
        </div> */}
      </div>
    </>
  );
}