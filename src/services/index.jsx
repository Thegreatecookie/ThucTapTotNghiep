import axios from "axios";

const URL = process.env.REACT_APP_SERVICE_HOST;

const instance = axios.create({
  baseURL: URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
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

export default instance;
