import { API_PATH } from "../constants";
import instance from "./index";

const getByClassRoomID = (id) =>
  instance.get(API_PATH.GROUP.GET_BY_ID_CLASROOM(id));
const getGroupConditionByClassRoomID = (id) =>
  instance.get(API_PATH.GROUP.GET_CONDITION_GROUP(id));
const getStudentinGroup = (id) => instance.get(API_PATH.GROUP.ADD_STUDENT, id);
const addStudent = (body) => instance.post(API_PATH.GROUP.ADD_STUDENT, body);
const createGroup = (body) => instance.post(API_PATH.GROUP.CREATE, body);
const updateGroupCondition = (id, body) =>
  instance.put(API_PATH.GROUP.UPDATE_CONDITION_GROUP(id), body);
const deleteGroup = (id) => instance.delete(API_PATH.GROUP.DELETE_GROUP(id));
export default {
  getByClassRoomID,
  deleteGroup,
  getGroupConditionByClassRoomID,
  createGroup,
  addStudent,
  getStudentinGroup,
  updateGroupCondition,
};
