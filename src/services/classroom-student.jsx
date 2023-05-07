import { API_PATH } from "../constants";
import instance from "./index";

const deleteClassRoomStudent = (id) =>
  instance.delete(API_PATH.CLASSROOMSTUDENT.DELETE(id));
const createClassRoomStudent = (body) =>
  instance.post(API_PATH.CLASSROOMSTUDENT.CREATE, body);
const getClassRoomStudentById = (id) =>
  instance.get(API_PATH.CLASSROOMSTUDENT.GET_ONE_BY_ID(id));
const updateClassRoomStudent = (id, body) =>
  instance.put(API_PATH.CLASSROOMSTUDENT.UPDATE(id), body);
export default {
  deleteClassRoomStudent,
  createClassRoomStudent,
  getClassRoomStudentById,
  updateClassRoomStudent,
};
