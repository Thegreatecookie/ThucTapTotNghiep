import * as yup from "yup";
import { classroomnameRegExr } from "../constants/classroom-nameRegExr";
export const ClassRoomSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nhập tên lớp")
    .strict()
    .min(2, "Tên quá ngắn" )
    .max(30,"Tối đa 30 ký tự")
    .matches(
      classroomnameRegExr,
      "Chữ cái đầu in hoa, không được nhập ký tự đặc biệt"
    )
    .trim("Không được kết thúc bằng dấu cách"),
  period: yup.string().required("Chọn ca dạy"),
  r_subject: yup.string().required("Chọn môn học cho lớp"),
  // start:yup.date().required("Chọn ngày bắt đầu").max(yup.ref("end"),).min(Date.now()),
  // end:yup.date().required("Chọn ngày kết thúc").min(yup.ref("start")).max(Date.now()-)
});
