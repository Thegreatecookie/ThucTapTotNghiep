import { API_PATH } from "../constants";
import instance from "./index";

const getSubject = (query) =>
  instance.get(API_PATH.SUBJECT.GET, { params: query });
const getSubjectById = (id) => instance.get(API_PATH.SUBJECT.GET_ONE_BY_ID(id));
const updateSubject = (id, body) =>
  instance.put(API_PATH.SUBJECT.UPDATE(id), body);
const createSubject = (body) => instance.post(API_PATH.SUBJECT.CREATE, body);
const deleteSubject = (id) => instance.delete(API_PATH.SUBJECT.DELETE(id));

export default {
  getSubject,
  createSubject,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
