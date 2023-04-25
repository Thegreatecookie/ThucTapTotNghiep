import * as yup from "yup";

export const PassWordSchema = yup.object().shape({
  password: yup.string().required("required"),
  newPassword: yup.string().required("required"),
});
