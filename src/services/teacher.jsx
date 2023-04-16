import { API_PATH } from "../constants";
import instance from "./index";

const getTeacher = (query) =>
  instance.get(API_PATH.TEACHER.GET, { params: query });
const getTeacherById = (id) => instance.get(API_PATH.TEACHER.GET_ONE_BY_ID(id));
const updateTeacher = (id, body) =>
  instance.put(API_PATH.TEACHER.UPDATE(id), body);
const createTeacher = (body) => instance.post(API_PATH.TEACHER.CREATE, body);
const deleteTeacher = (id) => instance.delete(API_PATH.TEACHER.DELETE(id));

export default {
  getTeacher,
  createTeacher,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};
