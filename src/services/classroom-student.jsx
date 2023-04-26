import { API_PATH } from "../constants";
import instance from "./index";

const deleteClassRoomStudent = (id) =>
  instance.delete(API_PATH.CLASSROOMSTUDENT.DELETE(id));

export default {
  deleteClassRoomStudent,
};
