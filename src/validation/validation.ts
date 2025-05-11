import * as yup from 'yup'

export const RegisterSchema = yup.object({
    username:yup.string().required("this name is required"),
    email:yup.string().required("this email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,"Email is invalid !"),
    password:yup.string().required("this password is required") .min(8,"Password must be between 8 to 16 characters")
}).required();
export const LoginSchema = yup.object({
    identifier:yup.string().required("this email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,"Email is invalid !"),
    password:yup.string().required("this password is required") .min(8,"Password must be between 8 to 16 characters")
}).required();
