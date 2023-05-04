import * as yup from "yup";
export const PassWordSchema = yup.object().shape({
  password: yup.string().required("Nhập mật khẩu hiện tại"),
  newPassword: yup
    .string()
    .required("Nhập mật khẩu mới")
    .min(6, "Mật khẩu phải từ 6 ký tự trở lên"),
  confirm_newPassword: yup
    .string()
    .required("Nhập lại mật khẩu mới để xác nhận")
    .oneOf([yup.ref("newPassword"), null], "Mật khẩu mới không trùng"),
});
