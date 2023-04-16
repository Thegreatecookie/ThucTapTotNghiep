import * as yup from "yup";
import { phoneRegExp } from "../constants";

export const SignUpSchema = yup.object({
  firstName: yup.string().min(2).required("required"),
  lastName: yup.string().min(2).required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  email: yup.string().email("invalid email").required("required"),
});
