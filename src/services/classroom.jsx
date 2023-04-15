import { API_PATH } from "../constants";
import instance from "./index";

const getClassRoom = (query) =>
  instance.get(API_PATH.CLASSROOM.GET, { params: query });
const getClassRoomById = (id) =>
  instance.get(API_PATH.CLASSROOM.GET_ONE_BY_ID(id));
const updateClassRoom = (id, body) =>
  instance.put(API_PATH.CLASSROOM.UPDATE(id), body);
const createClassRoom = (body) =>
  instance.post(API_PATH.CLASSROOM.CREATE, body);
const deleteClassRoom = (id) => instance.delete(API_PATH.CLASSROOM.DELETE(id));

export default {
  getClassRoom,
  createClassRoom,
  getClassRoomById,
  updateClassRoom,
  deleteClassRoom,
};
