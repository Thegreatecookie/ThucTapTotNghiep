import axios from "axios";

const URL = process.env.REACT_APP_SERVICE_HOST;

const instance = axios.create({
  baseURL: URL,
});

instance.interceptors.response.use((response) => response.data);

export { default as StudentAPI } from "./student";

export default instance;
