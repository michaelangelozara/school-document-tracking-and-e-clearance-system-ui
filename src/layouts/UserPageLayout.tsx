import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../components/shared/NavigationBar";

const UserPageLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <NavigationBar />
      <Outlet />
    </div>
  );
};

export default UserPageLayout;
