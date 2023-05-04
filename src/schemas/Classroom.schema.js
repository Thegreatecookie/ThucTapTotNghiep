import * as yup from "yup";
import { nameRegExr } from "../constants";
export const ClassRoomSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nhập tên lớp")
    .strict()
    .matches(nameRegExr, "Chữ cái đầu in hoa, không nhập số hoặc ký tự đặc biệt"),
  period: yup.string().required("Chọn ca dạy"),
  r_subject: yup.string().required("Chọn môn học cho lớp"),
});
