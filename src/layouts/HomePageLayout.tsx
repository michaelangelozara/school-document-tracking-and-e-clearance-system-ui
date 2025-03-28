import NavigationBar from "../components/NavigationBar";
import Home from "../pages/Home";

const HomePageLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <NavigationBar />
      <Home />
    </div>
  );
};

export default HomePageLayout;
