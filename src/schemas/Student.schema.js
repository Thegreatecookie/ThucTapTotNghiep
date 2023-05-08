import * as yup from "yup";
import { phoneRegExr } from "../constants";
import { classRoomRegExr } from "../constants";
import { nameRegExr } from "../constants";
import { IDStudentRegExr } from "../constants";
export const StudentSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Nhập họ và tên lót")
    .min(2, "Tên quá ngắn")
    .max(30, "Tối đa 30 ký tự")
    .matches(
      nameRegExr,
      "Chữ cái đầu in hoa, không nhập số hoặc ký tự đặc biệt"
    )
    .trim("Không được kết thúc bằng dấu cách"),
  lastName: yup
    .string()
    .required("Nhập tên")
    .min(2, "Tên quá ngắn")
    .max(30, "Tối đa 30 ký tự")
    .matches(
      nameRegExr,
      "Chữ cái đầu in hoa, không nhập số hoặc ký tự đặc biệt"
    )
    .trim("Không được kết thúc bằng dấu cách"),
  email: yup.string().required("Nhập email").email("Đuôi email không hợp lệ"),
  phone: yup
    .string()
    .required("Nhập số điện thoại")
    .matches(phoneRegExr, "Số điện thoại không hợp lệ")
    .length(10, "Số điện thoại phải đúng 10 số"),
  classRoom: yup
    .string()
    .required("Nhập tên lớp")
    .strict()
    .uppercase("Chữ cái phải in hoa")
    .matches(
      classRoomRegExr,
      "Nhập tên lớp theo phương thức: D + 2 số + _TH + 2 số (VD: D18_TH10)"
    )
    .length(8, "Tên lớp không hợp lệ"),
  idStudent: yup
    .string()
    .required("Nhập MSSV")
    .strict()
    .uppercase("Chữ cái phải in hoa")
    .matches(
      IDStudentRegExr,
      "Nhập MSSV theo phương thức: DH + 8 số ( VD: DH51804825)"
    )
    .length(10, "MSSV không hợp lệ")
});
