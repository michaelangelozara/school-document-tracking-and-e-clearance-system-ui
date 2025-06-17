import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import HomePageLayout from "./layouts/HomePageLayout";
import Profile from "./pages/Profile";
import Account, { accountLoader } from "./components/Account";
import UserPageLayout from "./layouts/UserPageLayout";
import withRoleCheck from "./auth/withRoleCheck";
import PageNotFound from "./pages/PageNotFound";
import Unauthorized from "./pages/Unauthorized";
import DepartmentModal from "./components/home-modal/DepartmentModal";
import CourseModal from "./components/home-modal/CourseModal";
import ClearanceModal from "./components/home-modal/ClearanceModal";
import LetterModal from "./components/home-modal/LetterModal";
import MyClearanceModal from "./components/home-modal/MyClearanceModal";

import LetterLayout from "./layouts/LetterLayout";
import BudgetProposalApply from "./pages/letter/apply/BudgetProposalApply";
import CommunicationLetterApply from "./pages/letter/apply/CommunicationLetterApply";
import PermitToEnterApply from "./pages/letter/apply/PermitToEnterApply";
import SchoolFacilityApply from "./pages/letter/apply/SchoolFacilityApply";
import ImplementationLetterInCampusApply from "./pages/letter/apply/ImplementationLetterInCampusApply";
import ImplementationLetterOffCampusApply from "./pages/letter/apply/ImplementationLetterOffCampusApply";
import MessageModal from "./components/shared/MessageModal";
import CommunicatioLetterView from "./pages/letter/view/CommunicatioLetterView";
import BudgetProposalLetterView from "./pages/letter/view/BudgetProposalLetterView";
import PermitToEnterLetterView from "./pages/letter/view/PermitToEnterLetterView";
import SchoolFacilityLetterView from "./pages/letter/view/SchoolFacilityLetterView";
import ImplementationLetterInCampusView from "./pages/letter/view/ImplementationLetterInCampusView";
import ImplementationLetterOffCampusView from "./pages/letter/view/ImplementationLetterOffCampusView";
import BudgetProposalUpdate from "./pages/letter/update/BudgetProposalUpdate";
import CommunicationUpdate from "./pages/letter/update/CommunicationUpdate";
import ImplementationInCampusUpdate from "./pages/letter/update/ImplementationInCampusUpdate";
import ImplementationOffCampusUpdate from "./pages/letter/update/ImplementationOffCampusUpdate";
import PermitToEnterUpdate from "./pages/letter/update/PermitToEnterUpdate";

function App() {
  const ProtectedCourseModal = withRoleCheck(CourseModal);
  const ProtectedClearanceModal = withRoleCheck(ClearanceModal);
  const ProtectedLetterModal = withRoleCheck(LetterModal);
  const ProtectedDepartmentModal = withRoleCheck(DepartmentModal);

  const ProtectedLetterLayout = withRoleCheck(LetterLayout);
  const ProtectedHomePageLayout = withRoleCheck(HomePageLayout);
  const ProtectedProfilePageLayout = withRoleCheck(UserPageLayout);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route
            path="home"
            element={<ProtectedHomePageLayout allowedAuthorities={[]} />}
          >
            <Route path="my-clearance" element={<MyClearanceModal />} />
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
          <Route path="letters">
            <Route
              path="apply"
              element={
                <ProtectedLetterLayout allowedAuthorities={["STUDENT"]} />
              }
            >
              <Route path="budget-proposal" element={<BudgetProposalApply />} />
              <Route
                path="communication"
                element={<CommunicationLetterApply />}
              />
              <Route path="permit-to-enter" element={<PermitToEnterApply />} />
              <Route path="school-facility" element={<SchoolFacilityApply />} />
              <Route
                path="implementation-letter-in-campus"
                element={<ImplementationLetterInCampusApply />}
              />
              <Route
                path="implementation-letter-off-campus"
                element={<ImplementationLetterOffCampusApply />}
              />
            </Route>
            <Route
              path="view"
              element={<ProtectedLetterLayout allowedAuthorities={[]} />}
            >
              <Route
                path="communication/:id"
                element={<CommunicatioLetterView />}
              />
              <Route
                path="budget-proposal/:id"
                element={<BudgetProposalLetterView />}
              />
              <Route
                path="permit-to-enter/:id"
                element={<PermitToEnterLetterView />}
              />
              <Route
                path="school-facility/:id"
                element={<SchoolFacilityLetterView />}
              />
              <Route
                path="implementation-letter-in-campus/:id"
                element={<ImplementationLetterInCampusView />}
              />
              <Route
                path="implementation-letter-off-campus/:id"
                element={<ImplementationLetterOffCampusView />}
              />
            </Route>
            <Route
              path="update"
              element={
                <ProtectedLetterLayout allowedAuthorities={["STUDENT"]} />
              }
            >
              <Route
                path="communication/:id"
                element={<CommunicationUpdate />}
              />
              <Route
                path="budget-proposal/:id"
                element={<BudgetProposalUpdate />}
              />
              <Route
                path="permit-to-enter/:id"
                element={<PermitToEnterUpdate />}
              />
              <Route path="school-facility/:id" />
              <Route
                path="implementation-letter-in-campus/:id"
                element={<ImplementationInCampusUpdate />}
              />
              <Route
                path="implementation-letter-off-campus/:id"
                element={<ImplementationOffCampusUpdate />}
              />
            </Route>
          </Route>
          <Route
            path="user"
            element={<ProtectedProfilePageLayout allowedAuthorities={[]} />}
          >
            <Route path="profile" element={<Profile />} />
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

  return (
    <>
      <MessageModal /> {/* this is the global information modal */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
