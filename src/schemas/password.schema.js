import * as yup from "yup";
import { passwordRegExr } from "../constants";
export const PassWordSchema = yup.object().shape({
  password: yup.string().required("Nhập mật khẩu hiện tại"),
  newPassword: yup
    .string()
    .required("Nhập mật khẩu mới")
    .min(6, "Mật khẩu phải từ 6 ký tự trở lên")
    .matches(
      passwordRegExr,
      "Chữ cái đầu tiên in hoa, Không nhập ký tự đặc biệt, dấu cách"
    ),
  confirm_newPassword: yup
    .string()
    .required("Nhập lại mật khẩu mới để xác nhận")
    .matches(
      passwordRegExr,
      "Chữ cái đầu tiên in hoa, Không nhập ký tự đặc biệt, dấu cách"
    )
    .oneOf([yup.ref("newPassword"), null], "Mật khẩu mới không trùng"),
});
