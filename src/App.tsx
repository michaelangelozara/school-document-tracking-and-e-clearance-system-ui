import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
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
import MyClearanceModal from "./components/modal/MyClearanceModal";

import LetterLayout from "./layouts/LetterLayout";
import BudgetProposal from "./pages/letter/BudgetProposal";
import CommunicationLetter from "./pages/letter/CommunicationLetter";
import PermitToEnter from "./pages/letter/PermitToEnter";
import SchoolFacility from "./pages/letter/SchoolFacility";
import ImplementationLetterInCampus from "./pages/letter/ImplementationLetterInCampus";
import ImplementationLetterOffCampus from "./pages/letter/ImplementationLetterOffCampus";
import MessageModal from "./components/MessageModal";
import CommunicatioLetterView from "./pages/letter/view/CommunicatioLetterView";
import BudgetProposalLetterView from "./pages/letter/view/BudgetProposalLetterView";
import PermitToEnterLetterView from "./pages/letter/view/PermitToEnterLetterView";

function App() {
  const ProtectedCourseModal = withRoleCheck(CourseModal);
  const ProtectedClearanceModal = withRoleCheck(ClearanceModal);
  const ProtectedLetterModal = withRoleCheck(LetterModal);
  const ProtectedDepartmentModal = withRoleCheck(DepartmentModal);

  const ProtectedLetterLayout = withRoleCheck(LetterLayout);
  const ProtectedHomePageLayout = withRoleCheck(HomePageLayout);

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
                <ProtectedLetterLayout
                  allowedAuthorities={["STUDENT", "SUPER_ADMIN"]}
                />
              }
            >
              <Route path="budget-proposal" element={<BudgetProposal />} />
              <Route path="communication" element={<CommunicationLetter />} />
              <Route path="permit-to-enter" element={<PermitToEnter />} />
              <Route path="school-facility" element={<SchoolFacility />} />
              <Route
                path="implementation-letter-in-campus"
                element={<ImplementationLetterInCampus />}
              />
              <Route
                path="implementation-letter-off-campus"
                element={<ImplementationLetterOffCampus />}
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
            </Route>
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

  return (
    <>
      <MessageModal /> {/* this is the global information modal */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
