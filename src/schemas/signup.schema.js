import * as yup from "yup";
import { phoneRegExr } from "../constants";
import { nameRegExr } from "../constants";
export const SignUpSchema = yup.object({
  firstName: yup
    .string()
    .max(30, "Tối đa 30 ký tự")
    .required("Nhập họ và tên lót")
    .matches(
      nameRegExr,
      "Chữ cái đầu in hoa, không nhập số hoặc ký tự đặc biệt"
    ),
  lastName: yup
    .string()
    .max(30, "Tối đa 30 ký tự")
    .required("Nhập tên")
    .matches(
      nameRegExr,
      "Chữ cái đầu in hoa, không nhập số hoặc ký tự đặc biệt"
    ),
  phone: yup
    .string()
    .required("Nhập số điện thoại")
    .matches(phoneRegExr, "Số điện thoại không hợp lệ")
    .length(10, "Số điện thoại phải đúng 10 số"),
  email: yup.string().required("Nhập email").email("Đuôi email không hợp lệ"),
});
