import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

const HomePageLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <NavigationBar />
      <Outlet />
    </div>
  );
};

export default HomePageLayout;
