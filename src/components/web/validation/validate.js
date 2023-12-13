import * as yup from "yup";
 
  export const registerSchema= yup.object({
    userName:yup.string().required('userName is required').min(3,'must be at least 3 char').max(30,'must be equal or less than 30 char'),
    email:yup.string().required('email is required').email(),
    password:yup.string().required('password is required').min(3,'must be at least 3 char').max(30,'must be equal or less than 30 char'),
    

})

export const loginSchema= yup.object({
  email:yup.string().required('email is required').email(),
  password:yup.string().required('password is required').min(3,'must be at least 3 char').max(30,'must be equal or less than 30 char'),
  

})

export const sendCodeSchema= yup.object({
  email:yup.string().required('email is required').email()
  

})

export const forgotPasswordSchema= yup.object({
  email:yup.string().required('email is required').email(),
  password:yup.string().required('password is required').min(3,'must be at least 3 char').max(30,'must be equal or less than 30 char'),
  code:yup.string().required('code is required').length(4,'must be at least 4 char')

})