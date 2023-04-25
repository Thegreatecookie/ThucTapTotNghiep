import * as yup from "yup";

export const GroupSchema = yup.object().shape({
    name: yup.string().required("required"),
    // r_classroom: yup.string().required("required"),
    // r_subject: yup.string().required("required"),
    // r_teacher: yup.string().required("required")
});