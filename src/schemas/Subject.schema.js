import * as yup from "yup";
import { subjectRegExr } from "../constants";
export const SubjectSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nhập tên môn học")
    .min(2, "Tên quá ngắn")
    .max(30, "Tối đa 30 ký tự")
    .matches(subjectRegExr, "Viết hoa chữ cái đầu của từ đầu tiên, Không được nhập số đầu tiên, Không được nhập ký tự đặc biệt"),
});
