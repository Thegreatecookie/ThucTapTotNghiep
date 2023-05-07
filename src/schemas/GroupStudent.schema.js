import * as yup from "yup";

export const GroupStudentSchema = yup.object().shape({
  role: yup.string().required("Chọn vai trò cho sinh viên"),
  r_student: yup.string().required("Chọn sinh viên thêm vào lớp"),
});
