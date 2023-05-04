import { API_PATH } from "../constants";
import instance from "./index";

const changePassword = (body) =>
  instance.post(API_PATH.ACCOUNT.CHANGEPASS, body);
export default {
  changePassword,
};
