import { Outlet, useNavigate } from "react-router-dom";
import SectionCard from "../components/SectionCard";
import ProfileSummaryCard from "../components/ProfileSummaryCard";
import ClearanceCard from "../components/ClearanceCard";

// icons
import CLEARANCE_ICON from "../assets/icon/svg/section_card/clearance-icon-svgrepo-com.svg";
import LETTER_ICON from "../assets/icon/svg/section_card/letter-icon-svgrepo-com.svg";
import DEPARTMENT_ICON from "../assets/icon/svg/section_card/department-icon-svgrepo-com.svg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-wrap bg-background p-4 gap-[1rem]">
      {/* User info and Clearance Summary */}
      <div className="bg-white flex w-full h-[55%] p-2 gap-2 rounded">
        <ProfileSummaryCard />
        <ClearanceCard />
      </div>

      {/* Sections container */}
      <div className="bg-white w-full h-[45%] flex p-4 gap-1 overflow-x-scroll rounded">
        <SectionCard
          icon={CLEARANCE_ICON}
          title="Clearances"
          columns={["No.", "Name", "Short Name"]}
          data={[
            ["1", "Computer Science", "CS"],
            ["2", "Hotel Management", "HM"],
          ]}
          onClick={() => navigate("/home/departments")}
          allowedAuthorities={[]}
          userAuthorities={[]}
        />
        <SectionCard
          icon={LETTER_ICON}
          title="Letters"
          columns={["No.", "Name", "Short Name"]}
          data={[
            ["1", "Computer Science", "CS"],
            ["2", "Hotel Management", "HM"],
          ]}
          onClick={() => navigate("/home/departments")}
          allowedAuthorities={[]}
          userAuthorities={[]}
        />
        <SectionCard
          icon={DEPARTMENT_ICON}
          title="Departments"
          columns={["No.", "Name", "Short Name"]}
          data={[
            ["1", "Computer Science", "CS"],
            ["2", "Hotel Management", "HM"],
          ]}
          onClick={() => navigate("/home/departments")}
          allowedAuthorities={[]}
          userAuthorities={[]}
        />
        <SectionCard
          icon=""
          title="Courses"
          columns={["No.", "Name", "Short Name"]}
          data={[
            ["1", "Computer Science", "CS"],
            ["2", "Hotel Management", "HM"],
          ]}
          onClick={() => navigate("/home/departments")}
          allowedAuthorities={[]}
          userAuthorities={[]}
        />
        <SectionCard
          icon=""
          title="Clubs"
          columns={["No.", "Name", "Short Name"]}
          data={[
            ["1", "Computer Science", "CS"],
            ["2", "Hotel Management", "HM"],
          ]}
          onClick={() => navigate("/home/departments")}
          allowedAuthorities={[]}
          userAuthorities={[]}
        />
      </div>

      <Outlet />
    </div>
  );
};

export default Home;
