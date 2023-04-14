export const API_PATH = {
  STUDENT: {
    GET: "/student",
    CREATE: "/student",
    GET_ONE_BY_ID: (id) => `/student/${id}`,
    UPDATE: (id) => `/student/${id}`,
    DELETE: (id) => `/student/${id}`,
  },
};
