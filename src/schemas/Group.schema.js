import * as yup from "yup";
import { groupRegExr } from "../constants";
export const GroupSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nhập tên nhóm")
    .max(8, "Mã số nhóm quá dài")
    .matches(
      groupRegExr,
      "Nhập theo phương thức: Nhóm + dấu cách + mã số nhóm. VD: Nhóm 30 "
    )
    .trim("Không được kết thúc bằng dấu cách"),
});
