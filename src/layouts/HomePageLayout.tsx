import NavigationBar from "../components/shared/NavigationBar";
import Home from "../pages/Home";

const HomePageLayout = () => {
  return (
    <div className="flex flex-col">
      <NavigationBar />
      <Home />
    </div>
  );
};

export default HomePageLayout;
