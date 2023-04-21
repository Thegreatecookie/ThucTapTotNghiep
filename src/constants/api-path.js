export const API_PATH = {
  STUDENT: {
    GET: "/student",
    CREATE: "/student",
    IMPORT_EXCEL: "/student/import-by-excel",
    GET_ONE_BY_ID: (id) => `/student/${id}`,
    UPDATE: (id) => `/student/${id}`,
    DELETE: (id) => `/student/${id}`,
  },
  CLASSROOM: {
    GET: "/classroom",
    CREATE: "/classroom",
    GET_ONE_BY_ID: (id) => `/classroom/${id}`,
    UPDATE: (id) => `/classroom/${id}`,
    DELETE: (id) => `/classroom/${id}`,
  },
  SUBJECT: {
    GET: "/subject",
    CREATE: "/subject",
    GET_ONE_BY_ID: (id) => `/subject/${id}`,
    UPDATE: (id) => `/subject/${id}`,
    DELETE: (id) => `/subject/${id}`,
  },
  TEACHER: {
    GET: "/teacher",
    CREATE: "/teacher",
    GET_ONE_BY_ID: (id) => `/teacher/${id}`,
    UPDATE: (id) => `/teacher/${id}`,
    DELETE: (id) => `/teacher/${id}`,
  },
};
