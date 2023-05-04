import { Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Student from "./scenes/student/index";
import CreateStudent from "./scenes/student/createStudent";
import EditStudent from "./scenes/student/editStudent";
import Subject from "./scenes/subject/index";
import EditSubject from "./scenes/subject/editSubject";
import CreateSubject from "./scenes/subject/createSubject";
import Signin from "./scenes/signin";
import Classroom from "./scenes/classroom/index";
import CreateClassroom from "./scenes/classroom/createClassroom";
import EditClassroom from "./scenes/classroom/editClassroom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Signup from "./scenes/signup";
import { Template } from "./scenes/global/Template";
import PrivateRoutes from "./utils/PrivateRoutes";
import { ROLES, ROUTE_PATH } from "./constants";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Teacher from "./scenes/teacher";
import EditTeacher from "./scenes/teacher/editTeacher";
import ChangePass from "./scenes/changepass";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import ManageStudent from "./scenes/classroom/manageStudent";
import AddStudent from "./scenes/classroom/addStudent";
import Group from "./scenes/group";
import CreateGroup from "./scenes/group/createGroup";
import AddGroupStudent from "./scenes/group/addStudent";
import EditGroupCondition from "./scenes/group/editCondition";
function App() {
  const [theme, colorMode] = useMode();
  const navigate = useNavigate();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Template />}>
                <Route
                  index
                  path={ROUTE_PATH.DASHBOARD}
                  element={<Dashboard />}
                />
                <Route
                  path={ROUTE_PATH.SUBJECT_LIST}
                  element={
                    <ProtectedRoutes roles={[ROLES.ADMIN]}>
                      <Subject />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path={ROUTE_PATH.EDIT_SUBJECT}
                  element={
                    <ProtectedRoutes roles={[ROLES.ADMIN]}>
                      <EditSubject />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path={ROUTE_PATH.CREATE_SUBJECT}
                  element={
                    <ProtectedRoutes roles={[ROLES.ADMIN]}>
                      <CreateSubject />
                    </ProtectedRoutes>
                  }
                />

                <Route
                  path={ROUTE_PATH.TEACHER_LIST}
                  element={
                    <ProtectedRoutes roles={[ROLES.ADMIN]}>
                      <Teacher />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path={ROUTE_PATH.STUDENT_LIST}
                  element={
                    <ProtectedRoutes roles={[ROLES.TEACHER]}>
                      <Student />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path={ROUTE_PATH.CREATE_STUDENT}
                  element={
                    <ProtectedRoutes roles={[ROLES.TEACHER]}>
                      <CreateStudent />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path={ROUTE_PATH.EDIT_STUDENT}
                  element={
                    <ProtectedRoutes roles={[ROLES.TEACHER]}>
                      <EditStudent />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path={ROUTE_PATH.CLASSROOM_LIST}
                  element={
                    <ProtectedRoutes roles={[ROLES.TEACHER]}>
                      <Classroom />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path={ROUTE_PATH.MANAGE_STUDENT}
                  element={
                    <ProtectedRoutes roles={[ROLES.TEACHER]}>
                      <ManageStudent />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path={ROUTE_PATH.CREATE_CLASSROOM}
                  element={
                    <ProtectedRoutes roles={[ROLES.TEACHER]}>
                      <CreateClassroom />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path={ROUTE_PATH.ADD_CLASSROOMSTUDENT}
                  element={
                    <ProtectedRoutes roles={[ROLES.TEACHER]}>
                      <AddStudent />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path={ROUTE_PATH.EDIT_CLASSROOM}
                  element={
                    <ProtectedRoutes roles={[ROLES.TEACHER]}>
                      <EditClassroom />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path={ROUTE_PATH.GROUP_LIST}
                  element={
                    <ProtectedRoutes roles={[ROLES.TEACHER]}>
                      <Group />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path={ROUTE_PATH.CREATE_GROUP}
                  element={
                    <ProtectedRoutes roles={[ROLES.TEACHER]}>
                      <CreateGroup />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path={ROUTE_PATH.ADD_GROUPSTUDENT}
                  element={
                    <ProtectedRoutes roles={[ROLES.TEACHER]}>
                      <AddGroupStudent />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path={ROUTE_PATH.GROUP_CONDITION}
                  element={
                    <ProtectedRoutes roles={[ROLES.TEACHER]}>
                      <EditGroupCondition />
                    </ProtectedRoutes>
                  }
                />
                {/* <Route
                  path={ROUTE_PATH.EDIT_TEACHER}
                  element={<EditTeacher />}
                /> */}
                <Route path={ROUTE_PATH.CHANGEPASS} element={<ChangePass />} />
              </Route>
            </Route>
            <Route path={ROUTE_PATH.SIGNIN} element={<Signin />} />
            <Route path={ROUTE_PATH.SIGNUP} element={<Signup />} />
          </Routes>
        </div>
      </ThemeProvider>
      <ToastContainer />
    </ColorModeContext.Provider>
  );
}

export default App;
