import { API_PATH } from "../constants";
import instance from "./index";

const deleteClassRoomStudent = (id) =>
  instance.delete(API_PATH.CLASSROOMSTUDENT.DELETE(id));
const createClassRoomStudent = (body) =>
  instance.post(API_PATH.CLASSROOMSTUDENT.CREATE, body);
export default {
  deleteClassRoomStudent,
  createClassRoomStudent,
};
