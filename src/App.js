import { Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Notification from "./scenes/notification";
import Student from "./scenes/student/index";
import CreateStudent from "./scenes/student/createStudent";
import EditStudent from "./scenes/student/editStudent";
import Subject from "./scenes/subject/index";
import Signin from "./scenes/signin";
import Class from "./scenes/class";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Signup from "./scenes/signup";
import { Template } from "./scenes/global/Template";
import PrivateRoutes from "./utils/PrivateRoutes";
import Form from "./scenes/form";
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
              {/* <Route path="/dashboard" element={<Template><Dashboard /></Template>} /> */}
              {/* <Route path="/subject" element={<Template ><Subject /></Template>} /> */}
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
                  path={ROUTE_PATH.NOTIFICATION_LIST}
                  element={<Notification />}
                />
              </Route>
              {/* <Route path="/editstudent" element={<Template ><EditStudent /></Template>} /> */}
              {/* <Route path="/notification" element={<Template ><Notification /></Template>} /> */}
              {/* <Route path="/class" element={<Template ><Class /></Template>} /> */}
              {/* <Route path="/form" element={<Template ><Form /></Template>}/> */}
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
