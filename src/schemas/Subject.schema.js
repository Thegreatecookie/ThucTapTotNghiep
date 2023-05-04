import * as yup from "yup";
import { subjectRegExr } from "../constants";
export const SubjectSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nhập tên môn học")
    .matches(subjectRegExr, "Không được nhập ký tự đặc biệt"),
});
