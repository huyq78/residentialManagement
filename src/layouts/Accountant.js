import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import Dashboard from "views/accountant/Dashboard.js";
import Fee from "views/accountant/Fee";
import Trasaction from "views/accountant/Transaction";
import SidebarAccountant from "components/Sidebar/SidebarAccountant";
import HouseholdTrasaction from "views/accountant/HouseholdTransaction";
import Donate from "views/accountant/Donate";

export default function Accountant() {
  return (
    <>
      <SidebarAccountant />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/accountant/dashboard" exact component={Dashboard} />
            <Route path="/accountant/fee" exact component={Fee} />
            <Route path="/accountant/transaction" exact component={Trasaction} />
            <Route path="/accountant/transaction-by-household" exact component={HouseholdTrasaction} />
            <Route path="/accountant/transaction-by-household/donate" exact component={Donate} />
            <Redirect from="/accountant" to="/accountant/dashboard" />
          </Switch>
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  );
}
