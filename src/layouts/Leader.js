import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import SidebarLeader from "components/Sidebar/SidebarLeader.js";
import HeaderStats from "components/Headers/HeaderStats.js";

import Dashboard from "views/leader/Dashboard.js";
import Citizen from "views/leader/Citizen";
import Absence from "views/leader/Absence";
import Household from "views/leader/Household";
import CreateCitizen from "views/leader/CreateCitizen";
import Stay from "views/leader/Stay";
import Death from "views/leader/Death";
import CitizenProfile from "views/leader/CitizenProfile";
import HouseholdProfile from "views/leader/HouseholdProfile";
import CreateHousehold from "views/leader/CreateHousehold";
import CardAddMember from "components/Cards/CardAddMember";
import CreateAbsence from "views/leader/CreateAbsence";
import SplitHousehold from "views/leader/SplitHoushold";
import CreateStay from "views/leader/CreateStay";
import CreateDeath from "views/leader/CreateDeath";
import UpdateAbsence from "views/leader/UpdateAbsence";
import UpdateStay from "views/leader/UpdateStay";
import UpdateDeath from "views/leader/UpdateDeath";

export default function Leader() {
  return (
    <>
      <SidebarLeader />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/leader/dashboard" exact component={Dashboard} />
            <Route path="/leader/absence" exact component={Absence} />
            <Route path="/leader/absence/update" exact component={UpdateAbsence} />
            <Route path="/leader/create-citizen" exact component={CreateCitizen} />
            <Route path="/leader/household" exact component={Household} />
            <Route path="/leader/citizen" exact component={Citizen} />
            <Route path="/leader/stay" exact component={Stay} />
            <Route path="/leader/stay/update" exact component={UpdateStay} />
            <Route path="/leader/death" exact component={Death} />
            <Route path="/leader/death/update" exact component={UpdateDeath} />
            <Route path="/leader/citizen/profile" exact component={CitizenProfile} />
            <Route path="/leader/household/profile" exact component={HouseholdProfile} />
            <Route path="/leader/create-household" exact component={CreateHousehold} />
            <Route path="/leader/household/add-member" exact component={CardAddMember} />
            <Route path="/leader/household/split" exact component={SplitHousehold} />
            <Route path="/leader/create-absence" exact component={CreateAbsence} />
            <Route path="/leader/create-stay" exact component={CreateStay} />
            <Route path="/leader/create-death" exact component={CreateDeath} />
            <Redirect from="/leader" to="/leader/dashboard" />
          </Switch>
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  );
}
