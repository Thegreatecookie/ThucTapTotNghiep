import { API_PATH } from "../constants";
import instance from "./index";

const getGroup = (query) =>
  instance.get(API_PATH.GROUP.GET, { params: query });
const getGroupById = (id) => instance.get(API_PATH.GROUP.GET_ONE_BY_ID(id));
const updateGroup = (id, body) =>
  instance.put(API_PATH.GROUP.UPDATE(id), body);
const createGroup = (body) => instance.post(API_PATH.GROUP.CREATE, body);
const deleteGroup = (id) => instance.delete(API_PATH.GROUP.DELETE(id));

export default {
    getGroup,
    getGroupById,
    updateGroup,
    createGroup,
    deleteGroup,
};