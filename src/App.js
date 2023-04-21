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
import { ROUTE_PATH } from "./constants";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [theme, colorMode] = useMode();

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
                <Route path={ROUTE_PATH.STUDENT_LIST} element={<Student />} />
                <Route
                  path={ROUTE_PATH.CREATE_STUDENT}
                  element={<CreateStudent />}
                />
                <Route
                  path={ROUTE_PATH.EDIT_STUDENT}
                  element={<EditStudent />}
                />
                <Route path={ROUTE_PATH.SUBJECT_LIST} element={<Subject />} />
                <Route
                  path={ROUTE_PATH.EDIT_SUBJECT}
                  element={<EditSubject />}
                />
                <Route
                  path={ROUTE_PATH.CREATE_SUBJECT}
                  element={<CreateSubject />}
                />
                <Route
                  path={ROUTE_PATH.CLASSROOM_LIST}
                  element={<Classroom />}
                />
                <Route
                  path={ROUTE_PATH.CREATE_CLASSROOM}
                  element={<CreateClassroom />}
                />
                <Route
                  path={ROUTE_PATH.EDIT_CLASSROOM}
                  element={<EditClassroom />}
                />
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
