import { API_PATH } from "../constants";
import instance from "./index";

const getNotification = (query) =>
  instance.get(API_PATH.NOTIFICATION.GET, { params: query });
const gettNotificationById = (id) => instance.get(API_PATH.NOTIFICATION.GET_ONE_BY_ID(id));

export default {
    getNotification,
    gettNotificationById,
};