import * as yup from "yup";

export const RoleSchema = yup.object().shape({
  role: yup.string().required("Chọn vai trò cho sinh viên"),
});
