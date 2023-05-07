import { API_PATH } from "../constants";
import instance from "./index";

const deleteGroupStudent = (id) =>
  instance.delete(API_PATH.GROUPSTUDENT.DELETE(id));
const createGroupStudent = (body) =>
  instance.post(API_PATH.GROUPSTUDENT.CREATE, body);
export default {
  deleteGroupStudent,
  createGroupStudent,
};
