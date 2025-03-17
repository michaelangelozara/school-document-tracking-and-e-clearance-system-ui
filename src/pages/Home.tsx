import React from "react";

import HomeCard from "../components/HomeCard";
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-w-[375px] overflow-y-scroll flex flex-1 flex-wrap bg-background p-4 space-x-3 space-y-3">
      {/* <span className="font-bold text-4xl">Home</span> */}
      <HomeCard
        title="Users"
        columns={["ID", "Lastname", "Firstname"]}
        data={[
          ["1", "Smith", "John Doe"],
          ["2", "De Leon", "Jane Smith"],
        ]}
        onClick={() => navigate("/home/department")}
      />
      <HomeCard
        title="Departments"
        columns={["ID", "Name", "Head"]}
        data={[
          ["1", "IT", "John Doe"],
          ["2", "Business", "Jane Smith"],
        ]}
        onClick={() => navigate("/home/department")}
      />
      <HomeCard
        title="Courses"
        columns={["ID", "Name", "Code"]}
        data={[
          ["1", "BSCS", "CS-123"],
          ["2", "BSCpE", "CE-321"],
        ]}
        onClick={() => navigate("/home/department")}
      />
      <HomeCard
        title="Clubs"
        columns={["ID", "Name", "Code"]}
        data={[
          ["1", "PISITS", "tect-123"],
          ["2", "BLC", "book-1234"],
        ]}
        onClick={() => navigate("/home/department")}
      />

      <Outlet />
    </div>
  );
};

export default Home;
