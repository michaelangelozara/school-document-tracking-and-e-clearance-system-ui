import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login, { loginLoader } from "./pages/Login";
import Home from "./pages/Home";
import HomePageLayout from "./layouts/HomePageLayout";
import Profile, { profileLoader } from "./components/Profile";
import Account, { accountLoader } from "./components/Account";
import Landing from "./pages/Landing";
import UserPageLayout from "./layouts/UserPageLayout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/">
          <Route path="login" element={<Login />} loader={loginLoader} />
          <Route path="home" element={<HomePageLayout />}>
            <Route index element={<Home />}></Route>
          </Route>
          <Route path="user" element={<UserPageLayout />}>
            <Route
              path="profile"
              element={<Profile />}
              loader={profileLoader}
            />
            <Route
              path="account"
              element={<Account />}
              loader={accountLoader}
            />
          </Route>
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
