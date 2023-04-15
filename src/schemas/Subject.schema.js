import * as yup from "yup";

export const SubjectSchema = yup.object().shape({
  name: yup.string().required("required"),
});
