import instance from "./index";

const getStudent = (query) => instance.get("student", { params: query });
const createStudent = (path, body) => instance.post(path, body);

export default { getStudent, createStudent };
