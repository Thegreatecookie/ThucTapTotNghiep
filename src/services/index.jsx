import axios from "axios";

const URL = process.env.REACT_APP_SERVICE_HOST;

const instance = axios.create({
  baseURL: URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["authorization"] = token;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);
instance.interceptors.response.use((response) => response.data);

export { default as StudentAPI } from "./student";
export { default as ClassRoomAPI } from "./classroom";
export { default as SubjectAPI } from "./subject";
export { default as TeacherAPI } from "./teacher";
export { default as AccountAPI } from "./account";
export { default as ClassroomStudentAPI } from "./classroom-student";
export { default as PeriodAPI } from "./period";
export { default as GroupAPI } from "./group";
export { default as GroupStudentAPI } from "./group-student";
export default instance;
