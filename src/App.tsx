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
import UserPageLayout from "./layouts/UserPageLayout";
import withRoleCheck from "./auth/withRoleCheck";
import PageNotFound from "./pages/PageNotFound";
import Unauthorized from "./pages/Unauthorized";
import DepartmentModal from "./components/DepartmentModal";

function App() {
  const ProtectedHomePage = withRoleCheck(HomePageLayout);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/">
          <Route path="login" element={<Login />} loader={loginLoader} />
          <Route
            path="home"
            element={<ProtectedHomePage allowedRoles={["admin", "user"]} />}
          >
            <Route path="department" element={<DepartmentModal />} />
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
          <Route path="*" element={<PageNotFound />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
