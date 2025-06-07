import { Outlet } from "react-router-dom";
import NavigationBar from "../components/shared/NavigationBar";

const LetterLayout = () => {
  return (
    <div className="flex flex-col">
      <NavigationBar />
      <Outlet />
    </div>
  );
};

export default LetterLayout;
