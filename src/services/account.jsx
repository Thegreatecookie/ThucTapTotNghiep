import { API_PATH } from "../constants";
import instance from "./index";

const login = (body) => instance.post(API_PATH.ACCOUNT.LOGIN, body);
const changePassword = (body) =>
  instance.post(API_PATH.ACCOUNT.CHANGEPASS, body);
export default {
  login,
  changePassword,
};
