import * as yup from "yup";
export const GroupConditionSchema = yup.object().shape({
  min: yup
    .number("Chỉ được nhập số")
    .required("Chọn tối thiểu bao nhiêu sinh viên 1 nhóm")
    .min(1, "Không thấp hơn 1")
    .max(yup.ref("max"), "Không cao hơn Max"),

  max: yup
    .number("Chỉ được nhập số")
    .required("Chọn tối đa bao nhiêu sinh viên 1 nhóm")
    .min(yup.ref("min"), "Không thấp hơn Min")
    .max(20, "Không quá 20"),
});
