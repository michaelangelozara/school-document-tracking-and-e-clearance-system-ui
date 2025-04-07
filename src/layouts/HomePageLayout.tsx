import NavigationBar from "../components/NavigationBar";
import { useAuth } from "../context/AuthContext";
import Home from "../pages/Home";

const HomePageLayout = () => {
  const { token } = useAuth();

  if (token === null) {
    window.location.href = "/login";
    return;
  }

  return (
    <div className="flex flex-col">
      <NavigationBar />
      <Home />
    </div>
  );
};

export default HomePageLayout;
