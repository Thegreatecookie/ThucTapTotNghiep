import * as yup from "yup";
import { phoneRegExp } from "../constants";

export const CreateStudentSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  classRoom: yup.string().required("required"),
});
