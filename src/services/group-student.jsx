import { API_PATH } from "../constants";
import instance from "./index";

const deleteGroupStudent = (id) =>
  instance.delete(API_PATH.GROUPSTUDENT.DELETE(id));
const createGroupStudent = (body) =>
  instance.post(API_PATH.GROUPSTUDENT.CREATE, body);
const getGroupStudentById = (id) =>
  instance.get(API_PATH.GROUPSTUDENT.GET_ONE_BY_ID(id));
const updateGroupStudent = (id, body) =>
  instance.put(API_PATH.GROUPSTUDENT.UPDATE(id), body);
export default {
  deleteGroupStudent,
  createGroupStudent,
  getGroupStudentById,
  updateGroupStudent,
};
