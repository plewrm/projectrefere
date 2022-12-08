import * as Yup from "yup";

export const signupSchema= Yup.object({
    countryName: Yup.string().min(2).max(10).required("Please enter Country Name"),
    first_name: Yup.string().min(2).max(10).required("Please enter Country Name"),
    email: Yup.string().email().required("Please enter your email"),
})