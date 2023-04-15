import * as yup from "yup";

export const ClassRoomSchema = yup.object().shape({
  name: yup.string().required("required"),
  period: yup.string().required("required"),
  r_subject: yup.string().required("required"),
});
