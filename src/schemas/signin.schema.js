import * as yup from 'yup';

export const SignInSchema = yup.object({
  email: yup.string().email(),
  password: yup.string().min(6)
});