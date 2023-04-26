import { API_PATH } from "../constants";
import instance from "./index";

const getStudent = (query) =>
  instance.get(API_PATH.STUDENT.GET, { params: query });
const getStudentById = (id) => instance.get(API_PATH.STUDENT.GET_ONE_BY_ID(id));
const updateStudent = (id, body) =>
  instance.put(API_PATH.STUDENT.UPDATE(id), body);
const createStudent = (body) => instance.post(API_PATH.STUDENT.CREATE, body);
const deleteStudent = (id) => instance.delete(API_PATH.STUDENT.DELETE(id));
const importStudentsFromExcel = (body) =>
  instance.post(API_PATH.STUDENT.IMPORT_EXCEL, body, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export default {
  getStudent,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
  importStudentsFromExcel,
};
