import NavigationBar from "../components/NavigationBar";
import { useAuth } from "../context/AuthContext";
import Home from "../pages/Home";

const HomePageLayout = () => {
  const { isTokenChecking, token } = useAuth();

  if (isTokenChecking) {
    return <div>Loading ...</div>;
  }

  if (!token) {
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
