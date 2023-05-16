import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import Dashboard from "views/admin/Dashboard.js";
import Tables from "views/admin/Tables.js";
import Citizen from "views/leader/Citizen";
import Register from "views/auth/Register";
import UpdateUser from "views/admin/UpdateUser";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/update" exact component={UpdateUser} />
            <Route path="/admin/tables" exact component={Tables} />
            <Route path="/admin/citizen" exact component={Citizen} />
            <Route path="/admin/register" exact component={Register} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  );
}
