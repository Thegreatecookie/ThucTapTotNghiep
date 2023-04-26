import { API_PATH } from "../constants";
import instance from "./index";

const getPeriod = (query) =>
  instance.get(API_PATH.PERIOD.GET, { params: query });
const getPeriodById = (id) => instance.get(API_PATH.PERIOD.GET_ONE_BY_ID(id));
const createPeriod = (body) => instance.post(API_PATH.PERIOD.CREATE, body);
const deletePeriod = (id) => instance.delete(API_PATH.PERIOD.DELETE(id));

export default {
  getPeriod,
  createPeriod,
  getPeriodById,
  deletePeriod,
};
