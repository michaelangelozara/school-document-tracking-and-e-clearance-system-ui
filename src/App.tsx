import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login, { loginLoader } from "./pages/Login";
import HomePageLayout from "./layouts/HomePageLayout";
import ProfileInfoModal, {
  profileLoader,
} from "./components/modal/ProfileInfoModal";
import Account, { accountLoader } from "./components/Account";
import UserPageLayout from "./layouts/UserPageLayout";
import withRoleCheck from "./auth/withRoleCheck";
import PageNotFound from "./pages/PageNotFound";
import Unauthorized from "./pages/Unauthorized";
import DepartmentModal from "./components/modal/DepartmentModal";
import CourseModal from "./components/modal/CourseModal";
import ClearanceModal from "./components/modal/ClearanceModal";
import LetterModal from "./components/modal/LetterModal";

function App() {
  const ProtectedCourseModal = withRoleCheck(CourseModal);
  const ProtectedClearanceModal = withRoleCheck(ClearanceModal);
  const ProtectedLetterModal = withRoleCheck(LetterModal);
  const ProtectedDepartmentModal = withRoleCheck(DepartmentModal);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route path="home" element={<HomePageLayout />}>
            <Route
              path="clearances"
              element={<ProtectedClearanceModal allowedAuthorities={[]} />}
            />
            <Route
              path="letters"
              element={<ProtectedLetterModal allowedAuthorities={[]} />}
            />
            <Route
              path="departments"
              element={
                <ProtectedDepartmentModal
                  allowedAuthorities={["SUPER_ADMIN", "ADMIN"]}
                />
              }
            />
            <Route
              path="courses"
              element={
                <ProtectedCourseModal
                  allowedAuthorities={["SUPER_ADMIN", "ADMIN"]}
                />
              }
            />
          </Route>
          <Route path="user" element={<UserPageLayout />}>
            <Route
              path="profile"
              element={<ProfileInfoModal />}
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
