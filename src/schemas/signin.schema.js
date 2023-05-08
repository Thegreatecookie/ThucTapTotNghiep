import * as yup from 'yup';
import { passwordRegExr } from '../constants';
export const SignInSchema = yup.object({
  email: yup.string().required("Nhập email").email("Đuôi email không hợp lệ"),
  password: yup.string().required("Nhập mật khẩu").matches(passwordRegExr,"Chữ cái đầu tiên in hoa, Không nhập ký tự đặc biệt, dấu cách")
});