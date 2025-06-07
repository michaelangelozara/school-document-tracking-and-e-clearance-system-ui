import { Outlet, useNavigate } from "react-router-dom";
import SectionCard from "../components/shared/SectionCard";
import ProfileSummaryCard from "../components/shared/ProfileSummaryCard";
import ClearanceCard from "../components/shared/ClearanceCard";

// icons
import CLEARANCE_ICON from "../assets/icon/svg/section_card/clearance-icon-svgrepo-com.svg";
import LETTER_ICON from "../assets/icon/svg/section_card/letter-icon-svgrepo-com.svg";
import DEPARTMENT_ICON from "../assets/icon/svg/section_card/department-icon-svgrepo-com.svg";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  return (
    <div className="w-full grid grid-rows-3 gap-3 bg-background p-2 lg:grid-rows-2 lg:grid-cols-3">
      {/* User info and Clearance Summary */}
      <ProfileSummaryCard userData={user} />
      <ClearanceCard />
      {/* Sections container */}
      <div className="bg-white w-full flex p-4 gap-1 overflow-x-scroll rounded lg:col-span-full">
        <SectionCard
          icon={CLEARANCE_ICON}
          title="Clearances"
          columns={["No.", "Name", "Short Name"]}
          data={[
            ["1", "Computer Science", "CS"],
            ["2", "Hotel Management", "HM"],
          ]}
          onClick={() => navigate("/home/clearances")}
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
          onClick={() => navigate("/home/letters")}
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
      </div>

      <Outlet />
    </div>
  );
};

export default Home;
