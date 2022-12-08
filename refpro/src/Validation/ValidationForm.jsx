import * as yup from "yup";
const digit = /^\d+$/; // Only Digit are allowed for this field.
const alphaNumeric = /^[a-zA-Z0-9_]*$/; // Only alphabets and numeric are allowed for this field.
const alphaWithSpace = /^[aA-zZ\s]+$/; // Only alphabets are allowed for this field with "Space".
const alphaWithOutSpace = /^[A-Za-z]*$/; // Only alphabets are allowed for this field without "Space".
const alphaNumericWithSpace = /^[a-zA-Z0-9_\s]+$/; // Only alphabets  and numeric are allowed for this field with "Space".
const alphaNumericWithOutSpace = /^[a-zA-Z0-9_]*$/; // Only alphabets  and numeric are allowed for this field without "Space".
/*=========> Validation for Login Form ==========>*/

export const addNewCandidateValidation = yup.object({
  /*=========> Basic Information Validation ==========>*/
  salutation: yup
    .string()
    .required('Required'),
  first_name: yup
    .string()
    .required("Please Enter First Name")
    .matches(/^[A-Za-z]*$/, "Only alphabets are allowed for this field ")
    .max(20, "Must be less  than 20 characters"),
  middle_name: yup
    .string()
    .notRequired("Enter Middel Name")
    .matches(/^[A-Za-z]*$/, "Only alphabets are allowed for this field "),
  last_name: yup
    .string()
    .required("Please csdkjh kwhvw vweuivh vweuuv wkvbw cvwuiuewbv")
    .matches(/^[A-Za-z]*$/, "Only alphabets are allowed for this field "),
  email: yup
    .string()
    .email('Invalid email')
    .required('Required'),
  availability: yup.number().required("this field is required"),

  account_number: yup
    .number()
    .required('Required'),
  ifsc_code: yup
    .string()
    .required("IFSC Code Is Required")
    .test(
      "IFSC Code",
      "IFSC Code must be of length 11",
      (value) => value?.length === 11
    )
    .matches(
      /^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/,
      "First 4 characters must be alphabets and Zero(0) last 6 characters must be numbers"
    ),
  old_account_number: yup
    .number()
    .required('Required'),
  old_ifsc_code: yup
    .string()
    .required("IFSC Code Is Required")
    .test(
      "IFSC Code",
      "IFSC Code must be of length 11",
      (value) => value?.length === 11
    )
    .matches(
      /^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/,
      "First 4 characters must be alphabets and last 7 characters must be numbers"
    ),
  pan_number: yup
    .string()
    .required("PAN Number Is Required")
    .test(
      "Pan Number",
      "PAN Number must be of length 10",
      (value) => value?.length === 10
    )
    .matches(
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      "First 5 characters must be Capital alphabets, next 4 characters must be numbers and last 1 character must be Capital alphabet "
    ),
  phone: yup
    .string()
    .required("Phone Number must be of length 10")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"),
  emergency_contact: yup
    .string()
    .required("Phone Number must be of length 10")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"),
  adhaar_number: yup
    .number()
    .required("Aadhar Number Is Required"),
  // cv: yup
  //   .string()
  //   .required(),
  // pan_file: yup
  //   .string()
  //   .required(),
  // aadhar_file: yup
  //   .string()
  //   .required(),
  current_ctc: yup.number().required("this field is required"), 
  expected_ctc: yup.number().required("this field is required"), 
  // client_name: yup
  // .string()
  // .required('Required'),      
  // job_title: yup
  // .string()
  // .required('Required '),
});

export const addNewClientValidation = yup.object({
  /*=========> Basic Information Validation ==========>*/
 
  client_name: yup
  .string()
  .required('Required'),      
 
});

export const addNewJobValidation = yup.object({
  /*=========> Basic Information Validation ==========>*/
       
  job_title: yup
  .string()
  .required('Required '),
});


// import React, { useEffect, useState } from "react"
// import { Link } from "react-router-dom";
// import Navbar from "../navbar/Navbar";
// import Sidebar from "../sidebar/Sidebar";
// import { useNavigate } from "react-router-dom";
// import { post } from "axios";
// import classNames from "classnames";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import AxiosApi from "../../AxiosApi"
// import { addNewCandidateValidation } from '../../ValidationForm';

// import {
//   Button,
//   Row,
//   Modal,
// }
//   from 'react-bootstrap';
// import Form from 'react-bootstrap/Form';
// import '../../pages/Formik/stylesheets/formik1.css'





// const AddNewCandidate = () => {
//   const navigate = useNavigate();
//   const [active, setActive] = useState(1)
//   const handleClose = () => setShow(false);
//   const [show, setShow] = useState(false);
//   const handleShow = () => setShow(true);
//   const [showhide, setShowHide] = useState('');
//   const [country, setCountry]= useState([])
  
//   const {
//     register,
//     watch,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors },
//     formState,
//   } = useForm({
//     mode: "onTouched",
//     resolver: yupResolver(addNewCandidateValidation),
//   });
//   const initialState=
//     {
//       email: "",
//       phone: "",
//       role: "missing",
//       experience_years: "",
//       experience_months: "",
//       industry_id: "1",
//       cv: "",
//       cover_letter: "demo",
//       job_id: "",
//       remarks: "",
//       status: "1",
//       current_ctc: "",
//       expected_ctc: "",
//       notice_period: "",
//       open_to_relocate: "",
//       city_id: "2630",
//       country_id: "18",
//       country_calling_code_id: "39",
//       current_ctc_currency_id: "1",
//       expected_ctc_currency_id: "18",
//       first_name: "",
//       last_name: "",
//       other_industry: "",
//       salutation: "",
//       state_id: "2626",
//       submitted_datetime: "",
//       job_change_reason_id: "",
//       cv_displayname: "don't know",
//       exported: "1",
//       mail_response: "0",
//       mail_send: "0",
//       transaction_error: "don't know",
//       middle_name: "",
//       father_name: "missing",
//       gender: "",
//       permanent_address: "",
//       communication: "",
//       emergency_contact: "",
//       emergency_contact_name: "",
//       emergency_contact_relationship: "",
//       blood_group: "",
//       uan_number: "missing",
//       passport: "",
//       passport_validity: "",
//       adhaar_number: "",
//       pan_number: "",
//       education: "",
//       bank_name: "",
//       branch: "",
//       account_name: "",
//       account_number: "",
//       ifsc_code: "",
//       old_bank_name: "",
//       old_bank_branch: "",
//       old_account_name: "",
//       old_account_number: "",
//       old_ifsc_code: "",
//       prf_department: "",
//       prf_joining_date: "",
//       prf_group_health_insurance: "true",
//       prf_acenet_asset: "true",
//       prf_client_asset: "true",
//       prf_form_16: "true",
//       prf_covid_certificate: "true",
//       prf_bgv_certificate: "true",
//       prf_inititation_date: "",
//       prf_report_date: "",
//       prf_client_name: "",
//       prf_agency: "",
//       prf_submission_date: "",
//       type: "1111111111",
//       date_of_birth: "",
//       location: "",
//       medical_history: "",
//       linkedin: "",
//       documents_path: "demo",
//       documents_type: "",
//       designation: "",
//       source: "",
//       prf_exit_date: "2022-11-08T07:42:30.767Z",
//       description: "don't know",
//       category: "missing",
//       joining_salary: "",
//       legal_history: "missing",
//       esi_ip_number: "0000000",
//       aadhar_file: "",
//       pan_file: "",
//       passport_file: "",
//     }
//   const [formdata, setFormData]= useState(initialState)

//   // const [getValues, setGetValues] = useState(
//   //   // { stateName: '', isActice: 1 },
//   //   {
//   //   email: "",
//   //   phone: "",
//   //   role: "missing",
//   //   experience_years: "",
//   //   experience_months: "",
//   //   industry_id: "1",
//   //   cv: "",
//   //   cover_letter: "demo",
//   //   job_id: "",
//   //   remarks: "",
//   //   status: "1",
//   //   current_ctc: "",
//   //   expected_ctc: "",
//   //   notice_period: "",
//   //   open_to_relocate: "",
//   //   city_id: "2630",
//   //   country_id: "18",
//   //   country_calling_code_id: "39",
//   //   current_ctc_currency_id: "1",
//   //   expected_ctc_currency_id: "18",
//   //   first_name: "",
//   //   last_name: "",
//   //   other_industry: "",
//   //   salutation: "",
//   //   state_id: "2626",
//   //   submitted_datetime: "",
//   //   job_change_reason_id: "",
//   //   cv_displayname: "don't know",
//   //   exported: "1",
//   //   mail_response: "0",
//   //   mail_send: "0",
//   //   transaction_error: "don't know",
//   //   middle_name: "",
//   //   father_name: "missing",
//   //   gender: "",
//   //   permanent_address: "",
//   //   communication: "",
//   //   emergency_contact: "",
//   //   emergency_contact_name: "",
//   //   emergency_contact_relationship: "",
//   //   blood_group: "",
//   //   uan_number: "missing",
//   //   passport: "",
//   //   passport_validity: "",
//   //   adhaar_number: "",
//   //   pan_number: "",
//   //   education: "",
//   //   bank_name: "",
//   //   branch: "",
//   //   account_name: "",
//   //   account_number: "",
//   //   ifsc_code: "",
//   //   old_bank_name: "",
//   //   old_bank_branch: "",
//   //   old_account_name: "",
//   //   old_account_number: "",
//   //   old_ifsc_code: "",
//   //   prf_department: "",
//   //   prf_joining_date: "",
//   //   prf_group_health_insurance: "true",
//   //   prf_acenet_asset: "true",
//   //   prf_client_asset: "true",
//   //   prf_form_16: "true",
//   //   prf_covid_certificate: "true",
//   //   prf_bgv_certificate: "true",
//   //   prf_inititation_date: "",
//   //   prf_report_date: "",
//   //   prf_client_name: "",
//   //   prf_agency: "",
//   //   prf_submission_date: "",
//   //   type: "1111111111",
//   //   date_of_birth: "",
//   //   location: "",
//   //   medical_history: "",
//   //   linkedin: "",
//   //   documents_path: "demo",
//   //   documents_type: "",
//   //   designation: "",
//   //   source: "",
//   //   prf_exit_date: "2022-11-08T07:42:30.767Z",
//   //   description: "don't know",
//   //   category: "missing",
//   //   joining_salary: "",
//   //   legal_history: "missing",
//   //   esi_ip_number: "0000000",
//   //   aadhar_file: "",
//   //   pan_file: "",
//   //   passport_file: "",
//   // })

//   const filestore = (e) => {
//     console.log(e.target.files)
//     const files = e.target.files
//     const formData = new FormData();
//     formData.append('cv', files[0]);
//     async function ApiPostfetchData() {
//       const result = AxiosApi.post(
//         `docs/`,
//         formData,
//       )
//         .then(function (result) {
//           console.log(result);
//           if (result.data == "Success") {
//             alert(
//               "File Uploaded Success."
//             );
//           }
//           else {
//             alert(result.data);
//           }
//         });
//     }
//     ApiPostfetchData();
//   }

//   const panstore = (e) => {
//     console.log(e.target.files)
//     const files = e.target.files
//     const formData = new FormData();
//     formData.append('pan_file', files[0]);
//     async function ApiPostfetchData() {
//       const result = AxiosApi.post(
//         `blog/`,
//         formData,
//       )
//         .then(function (result) {
//           console.log(result);
//           if (result.data == "Success") {
//             alert(
//               "File Uploaded Success."
//             );
//           }
//           else {
//             alert(result.data);
//           }
//         });
//     }
//     ApiPostfetchData();
//   }

//   const aadharstore = (e) => {
//     console.log(e.target.files)
//     const files = e.target.files
//     const formData = new FormData();
//     formData.append('aadhar_file', files[0]);
//     async function ApiPostfetchData() {
//       const result = AxiosApi.post(
//         `blog/`,
//         formData,
//       )
//         .then(function (result) {
//           console.log(result);
//           if (result.data == "Success") {
//             alert(
//               "File Uploaded Success."
//             );
//           }
//           else {
//             alert(result.data);
//           }
//         });
//     }
//     ApiPostfetchData();
//   }
// // please check the code================ here handleChange

// const inputEvent = (event) => {
//   setFormData({...formdata, [event.target.name]:event.target.value})
// };
//   // const inputEvent = (event) => {
//   //   const { name, value } = event.target;
//   //   setGetValues((preValue) => {
//   //     return {
//   //       ...preValue,
//   //       [name]: value,
//   //     };
//   //   });
//   // };
//   const getTime = new Date();
//   const time = "T07:47:35.213Z"

//   // console.log(time);
//   useEffect(() => {
//     (
//       async () => {
//         console.log('start here')
//         ///const salutation_response = await fetch(salutationUrl);
//         //const salutation_data = await salutation_response.json();
//         //setSalutationData(salutation_data);

//       }
//     )();
//   },[]);

  

//   // const onReset = () => {
//   //   const confirmationButton = window.confirm(
//   //     "Do you really want to Reset this Form?"
//   //   );
//   //   if (confirmationButton === true) {
//   //     //window.location.reload();
//   //     reset();
//   //     setGetValues([])
//   //   }
//   // };

// // please check the code================ here handleSubmit

//   function onSubmit (event)  {
//     event.preventDefault();
//     fetch('https://6c08-106-215-94-122.ngrok.io/globalnetwork_candidate/', {
//   method: 'POST',
//   body: JSON.stringify({
//    formdata
//   }),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   },
// })
//   .then((response) => response.json())
//   // .then((json) => console.log(json));
//   .then(function (response) {
//             if (response.data == "Success") {
//               alert("You have been added the candidate Successfully...")
//               navigate("/NewCandidate");
//             }
//             // history.push("/NewCandidate");
//             console.log(response);
//           })
//           .catch(function (error) {
//             console.log(error);
//           });
//   };

//   // const onSubmit = (event) => {
//   //   event.preventDefault();
//   //   // const jsonPost = {
//   //   //   email: getValues.email,
//   //   //   phone: getValues.phone,
//   //   //   role: getValues.role,
//   //   //   experience_years: getValues.experience_years,
//   //   //   experience_months: getValues.experience_months,
//   //   //   industry_id: getValues.industry_id,
//   //   //   cv: getValues.cv,
//   //   //   pan_file: getValues.pan_file,
//   //   //   aadhar_file: getValues.aadhar_file,
//   //   //   passport_file: getValues.passport_file,
//   //   //   cover_letter: getValues.cover_letter,
//   //   //   // job_id: getValues.job_id ,
//   //   //   job_id:getValues.job_id,
//   //   //   remarks: getValues.remarks,
//   //   //   status: getValues.status,
//   //   //   current_ctc: getValues.current_ctc,
//   //   //   expected_ctc: getValues.expected_ctc,
//   //   //   notice_period: getValues.notice_period,
//   //   //   open_to_relocate: getValues.open_to_relocate,
//   //   //   // city_id: getValues.city_id ,

//   //   //   // country_id: getValues.country_id ,
//   //   //   // country_calling_code_id: getValues.country_calling_code_id ,
//   //   //   // current_ctc_currency_id: getValues.current_ctc_currency_id ,
//   //   //   // expected_ctc_currency_id: getValues.expected_ctc_currency_id ,
//   //   //   city_id: getValues.city_id,
//   //   //   country_id: getValues.country_id,
//   //   //   country_calling_code_id: getValues.country_calling_code_id,
//   //   //   current_ctc_currency_id: getValues.current_ctc_currency_id,
//   //   //   expected_ctc_currency_id: getValues.expected_ctc_currency_id,
//   //   //   first_name: getValues.first_name,
//   //   //   last_name: getValues.last_name,
//   //   //   other_industry: getValues.other_industry,
//   //   //   salutation: getValues.salutation,
//   //   //   // state_id: getValues.state_id ,
//   //   //   state_id: getValues.state_id,
//   //   //   submitted_datetime: `${getValues.submitted_datetime}${time}`,
//   //   //   job_change_reason_id: getValues.job_change_reason_id,
//   //   //   cv_displayname: getValues.cv_displayname,
//   //   //   exported: getValues.exported,
//   //   //   mail_response: getValues.mail_response,
//   //   //   mail_send: getValues.mail_send,
//   //   //   transaction_error: getValues.transaction_error,
//   //   //   middle_name: getValues.middle_name,
//   //   //   father_name: getValues.father_name,
//   //   //   gender: getValues.gender,
//   //   //   permanent_address: getValues.permanent_address,
//   //   //   communication: getValues.communication,
//   //   //   emergency_contact: getValues.emergency_contact,
//   //   //   emergency_contact_name: getValues.emergency_contact_name,
//   //   //   emergency_contact_relationship: getValues.emergency_contact_relationship,
//   //   //   blood_group: getValues.blood_group,
//   //   //   uan_number: getValues.uan_number,
//   //   //   passport: getValues.passport,
//   //   //   passport_validity: `${getValues.passport_validity}${time}`,
//   //   //   adhaar_number: getValues.adhaar_number,
//   //   //   pan_number: getValues.pan_number,
//   //   //   education: getValues.education,
//   //   //   bank_name: getValues.bank_name,
//   //   //   branch: getValues.branch,
//   //   //   account_name: getValues.account_name,
//   //   //   account_number: getValues.account_number,
//   //   //   ifsc_code: getValues.ifsc_code,
//   //   //   old_bank_name: getValues.old_bank_name,
//   //   //   old_bank_branch: getValues.old_bank_branch,
//   //   //   old_account_name: getValues.old_account_name,
//   //   //   old_account_number: getValues.old_account_number,
//   //   //   old_ifsc_code: getValues.old_ifsc_code,
//   //   //   prf_department: getValues.prf_department,
//   //   //   prf_joining_date: `${getValues.prf_joining_date}${time}`,
//   //   //   prf_group_health_insurance: getValues.prf_group_health_insurance,
//   //   //   prf_acenet_asset: getValues.prf_acenet_asset,
//   //   //   prf_client_asset: getValues.prf_client_asset,
//   //   //   prf_form_16: getValues.prf_form_16,
//   //   //   prf_covid_certificate: getValues.prf_covid_certificate,
//   //   //   prf_bgv_certificate: getValues.prf_bgv_certificate,
//   //   //   prf_inititation_date: `${getValues.prf_inititation_date}${time}`,
//   //   //   prf_report_date: `${getValues.prf_report_date}${time}`,
//   //   //   prf_client_name: getValues.prf_client_name,
//   //   //   prf_agency: getValues.prf_agency,
//   //   //   prf_submission_date: `${getValues.prf_submission_date}${time}`,
//   //   //   type: getValues.type,
//   //   //   date_of_birth: getValues.date_of_birth,
//   //   //   location: getValues.location,
//   //   //   medical_history: getValues.medical_history,
//   //   //   linkedin: getValues.linkedin,
//   //   //   documents_path: getValues.documents_path,
//   //   //   documents_type: getValues.documents_type,
//   //   //   designation: getValues.designation,
//   //   //   source: getValues.source,
//   //   //   prf_exit_date: getValues.prf_exit_date,
//   //   //   description: getValues.description,
//   //   //   category: getValues.category,
//   //   //   joining_salary: getValues.joining_salary,
//   //   //   legal_history: getValues.legal_history,
//   //   //   esi_ip_number: getValues.esi_ip_number
//   //   // };
//   //   // const confirmationButton = window.confirm(
//   //   //   "Do you really want to Submit this Form?"
//   //   // );
//   //   // console.log("Form Values",jsonPost);
//   //   // if (confirmationButton === true) 
//   //   // {
//   //     async function ApiPostfetchData() {
//   //       // const result = AxiosApi.post(`/globalnetwork_candidate/`,jsonPost)
//   //       AxiosApi.axios.post(`globalnetwork_candidate/`,jsonPost)
//   //       .then(function (response) {
//   //         if (response.data == "Success") {
//   //           alert("You have been added the candidate Successfully...")
//   //         }
//   //         // history.push("/NewCandidate");
//   //         navigate("/NewCandidate");
//   //         console.log(response);
//   //       })
//   //       .catch(function (error) {
//   //         console.log(error);
//   //       });
//   //     }
//   //     ApiPostfetchData();
//   //   // }
//   // };

//   const handleshowhide = (event) => {
//     const getuser = event.target.value;
//     setShowHide(getuser);
//   }
//   return (
//     <React.Fragment>
//       <div className="new">
//         <Sidebar />
//         <div className="newContainer">
//           <Navbar />
//           <div className="bar">
//             <div className="top">
//               <h1>Add New Candidate</h1>
//             </div>
//             <Link to="/NewCandidate"
//               className="btn"
//               style={{ marginLeft: 545, color: "white", backgroundColor: "Blue" }}
//             >
//               Back
//             </Link>
//           </div>


//           <form
//             // className="forms-sample"
//             onSubmit={handleSubmit(onSubmit)}
//             // autoComplete="on"
//           >
//             {/*=========> Personal Details Component  ==========>*/}

//             <div>
//               <h4>Personal Details</h4>

//               <div className="row">
//                 <div className="col-md-12 grid-margin stretch-card">
//                   <div className="card">
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-md-2 col-form-label">
//                           Salutaton<span style={{ color: "red", fontSize: 15 }}>*</span>
//                         </label>
//                         <div className="col-md-2">
//                           <select
//                             className={classNames("form-control", {
//                               "is-invalid": errors.salutation,
//                             })}
//                             {...register("salutation", {
//                               value: formdata.salutation,
//                             })}
//                             onChange={inputEvent}
//                             name="salutation"
//                             value={formdata.salutation}
//                           >
//                             <option value="">--Select--</option>
//                             <option value="1"> MR.</option>
//                             <option value="2"> Mrs. </option>
//                             <option value="3"> Ms. </option>

//                           </select>
//                           <small className="invalid-feedback">
//                             {errors.salutation?.message}
//                           </small>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           First Name
//                           <span style={{ color: "#FF0000" }}>
//                             <b>*</b>
//                           </span>
//                           :
//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             name="first_name"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.first_name,
//                             })}
//                             {...register("first_name", {
//                               value: formdata.first_name,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="Enter First Name"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.first_name?.message}
//                           </small>
//                         </div>

//                         <label className="col-sm-2 col-form-label">
//                           Middle Name :
//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             name="middle_name"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.middle_name,
//                             })}
//                             {...register("middle_name", {
//                               value: formdata.middle_name,
//                             })}
//                             onChange={inputEvent}
//                             value={formdata.middle_name}
//                             placeholder="Enter Middle Name"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.middle_name?.message}
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-sm-2 col-form-label">
//                           Last Name
//                           <span style={{ color: "#FF0000" }}>
//                             <b>*</b>
//                           </span>
//                           :
//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             className={classNames("form-control", {
//                               "is-invalid": errors.last_name,
//                             })}
//                             {...register("last_name", {
//                               value: formdata.last_name,
//                             })}
//                             onChange={inputEvent}
//                             name="last_name"
//                             value={formdata.last_name}
//                             placeholder="Enter Last Name"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.last_name?.message}
//                           </small>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           Email Id:
//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             name="email"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.email,
//                             })}
//                             {...register("email", {
//                               value: formdata.email,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="example@gmail.com"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.email?.message}
//                           </small>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           Job Id:
//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             name="job_id"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.job_id,
//                             })}
//                             {...register("job_id", {
//                               value: formdata.job_id,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="5643"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.job_id?.message}
//                           </small>
//                         </div>

//                       </div>
//                     </div>
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-sm-2 col-form-label">
//                           DOB
//                         </label>
//                         <div className="col-sm-2 ">
//                           <input
//                             type="date"
//                             name="date_of_birth"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.date_of_birth,
//                             })}
//                             {...register("date_of_birth", {
//                               value: formdata.date_of_birth,
//                             })}
//                             value={formdata.date_of_birth}
//                             onChange={inputEvent}
//                             placeholder="Enter First Name"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.date_of_birth?.message}
//                           </small>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           Gender
//                         </label>
//                         <div className="col-sm-2">
//                           <select
//                             className={classNames("form-control", {
//                               "is-invalid": errors.gender,
//                             })}
//                             {...register("gender", {
//                               value: formdata.gender,
//                             })}
//                             onChange={inputEvent}
//                             name="gender"
//                             value={formdata.gender}
//                           >
//                             <option value="">--Select--</option>
//                             <option value="male"> Male</option>
//                             <option value="female">Female</option>
//                             <option value="transgender">Transgender</option>

//                           </select>
//                           <small className="invalid-feedback">
//                             {errors.gender?.message}
//                           </small>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           Location
//                         </label>
//                         <div className="col-sm-2">
//                           <select
//                             className={classNames("form-control", {
//                               "is-invalid": errors.location,
//                             })}
//                             {...register("location", {
//                               value: formdata.location,
//                             })}
//                             onChange={inputEvent}
//                             name="location"
//                             value={formdata.location}
//                           >
//                             <option value="">--Select--</option>
//                             <option value="Gurugram"> Gurugram</option>
//                             <option value="Pune">Pune</option>


//                           </select>
//                           <small className="invalid-feedback">
//                             {errors.location?.message}
//                           </small>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <lable className="col-sm-2 col-form-label">
//                           Calling Code
//                         </lable>
//                         <div className="col-sm-2">
//                           <select
//                             className={classNames("form-control", {
//                               "is-invalid": errors.country_calling_code_id,
//                             })}
//                             {...register("country_calling_code_id", {
//                               value: formdata.country_calling_code_id,
//                             })}
//                             onChange={inputEvent}
//                             name="country_calling_code_id"
//                             value={formdata.country_calling_code_id}
//                           >
//                             <option value="">--Select--</option>
//                             <option value="91">91</option>
//                             <option value="92">92</option>
//                             <option value="92">93</option>

//                           </select>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           Phone
//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             name="phone"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.phone,
//                             })}
//                             {...register("phone", {
//                               value: formdata.phone,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="Enter Phone Number"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.phone?.message}
//                           </small>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-sm-2 col-form-label">Permanent Address</label>
//                         <div className="col-sm-10">
//                           <textarea
//                             className={classNames("form-control", {
//                               "is-invalid": errors.permanent_address,
//                             })}
//                             {...register("permanent_address", {
//                               value: formdata.permanent_address,
//                             })}
//                             type="text"
//                             name="permanent_address"
//                             value={formdata.permanent_address}
//                             onChange={inputEvent}
//                             placeholder=""
//                             id="permanent_address" />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-sm-2 col-form-label">Comunication Address</label>
//                         <div className="col-sm-10">
//                           <textarea
//                             className={classNames("form-control", {
//                               "is-invalid": errors.communication,
//                             })}
//                             {...register("communication", {
//                               value: formdata.communication,
//                             })}
//                             type="text"
//                             name="communication"
//                             value={formdata.communication}
//                             onChange={inputEvent}
//                             placeholder=""
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <lable className="col-sm-2 col-form-lable">
//                           Country
//                         </lable>
//                         <div className="col-sm-2">
//                           <select
//                             className={classNames("form-control", {
//                               "is-invalid": errors.country_id,
//                             })}
//                             {...register("country_id", {
//                               value: formdata.country_id,
//                             })}
//                             onChange={inputEvent}
//                             name="country_id"
//                             value={formdata.country_id}
//                           >
//                             <option value="">--Select--</option>
//                             <option value="1"> India</option>
//                             <option value="2">America</option>
//                             <option value="3">Japan</option>
//                           </select>
//                         </div>
//                         <lable className="col-sm-2 col-form-lable">
//                           State
//                         </lable>
//                         <div className="col-sm-2">
//                           <select
//                             className={classNames("form-control", {
//                               "is-invalid": errors.state_id,
//                             })}
//                             {...register("state_id", {
//                               value: formdata.state_id,
//                             })}
//                             onChange={inputEvent}
//                             name="state_id"
//                             value={formdata.state_id}
//                           >
//                             <option value="">--Select--</option>
//                             <option value="1"> Maharashtra</option>
//                             <option value="2">Andhra Pradesh</option>
//                             <option value="3">Zarkhand</option>
//                           </select>
//                         </div>

//                         <lable className="col-sm-2 col-form-lable">
//                           City
//                         </lable>
//                         <div className="col-sm-2">
//                           <select
//                             className={classNames("form-control", {
//                               "is-invalid": errors.city_id,
//                             })}
//                             {...register("city_id", {
//                               value: formdata.city_id,
//                             })}
//                             onChange={inputEvent}
//                             name="city_id"
//                             value={formdata.city_id}
//                           >
//                             <option value="">--Select--</option>
//                             <option value="0"> Pune</option>
//                             <option value="1">Nasik</option>
//                             <option value="3">Mumbai</option>
//                           </select>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-md-12 col-form-label">
//                           Emergency Contact
//                         </label>
//                       </div>
//                     </div>
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-sm-2 col-form-label">
//                           Name
//                           <span style={{ color: "#FF0000" }}>
//                             <b>*</b>
//                           </span>
//                           :
//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             className={classNames("form-control", {
//                               "is-invalid": errors.emergency_contact_name,
//                             })}
//                             {...register("emergency_contact_name", {
//                               value: formdata.emergency_contact_name,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="Enter the Name"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.emergency_contact_name?.message}
//                           </small>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           Relation

//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             name="emergency_contact_relationship"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.emergency_contact_relationship,
//                             })}
//                             {...register("emergency_contact_relationship", {
//                               value: formdata.emergency_contact_relationship,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="Enter Relation"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.emergency_contact_relationship?.message}
//                           </small>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           Phone

//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             name="emergency_contact"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.emergency_contact,
//                             })}
//                             {...register("emergency_contact", {
//                               value: formdata.emergency_contact,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="9847353775"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.emergency_contact?.message}
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-sm-12 col-form-label">
//                           Medical History
//                         </label>
//                       </div>
//                     </div>
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-sm-2 col-form-label">
//                           Blood Group
//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             className={classNames("form-control", {
//                               "is-invalid": errors.blood_group,
//                             })}
//                             {...register("blood_group", {
//                               value: formdata.blood_group,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="Enter Blood Group"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.blood_group?.message}
//                           </small>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           History/medical_history/Drugs
//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             name="medical_history"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.medical_history,
//                             })}
//                             {...register("medical_history", {
//                               value: formdata.medical_history,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="Enter History"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.medical_history?.message}
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-sm-2 col-form-label">
//                           Current CTC Currency
//                         </label>
//                         <div className="col-md-2">
//                           <select
//                             name="current_ctc_currency_id"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.current_ctc_currency_id,
//                             })}
//                             {...register("current_ctc_currency_id", {
//                               value: formdata.current_ctc_currency_id,
//                             })}
//                             onChange={inputEvent}
//                             value={formdata.current_ctc_currency_id}
//                           >
//                             <option value="">--Select--</option>
//                             <option value="0"> EURO</option>
//                             <option value="1">Dollar </option>
//                             <option value="3">XYZ </option>

//                           </select>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           Current CTC
//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             name="current_ctc"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.current_ctc,
//                             })}
//                             {...register("current_ctc", {
//                               value: formdata.current_ctc,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="Enter CTC"
//                             maxLength="20"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-sm-2 col-form-label">
//                           Expected CTC Currency
//                         </label>
//                         <div className="col-md-2">
//                           <select
//                             className={classNames("form-control", {
//                               "is-invalid": errors.expected_ctc_currency_id,
//                             })}
//                             {...register("expected_ctc_currency_id", {
//                               value: formdata.expected_ctc_currency_id,
//                             })}
//                             onChange={inputEvent}
//                             name="expected_ctc_currency_id"
//                             value={formdata.expected_ctc_currency_id}
//                           >
//                             <option value="">--Select--</option>
//                             <option value="0"> EURO</option>
//                             <option value="1">Dollar </option>
//                             <option value="3">XYZ </option>

//                           </select>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           Expected CTC
//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             className={classNames("form-control", {
//                               "is-invalid": errors.expected_ctc,
//                             })}
//                             {...register("expected_ctc", {
//                               value: formdata.expected_ctc,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="Enter CTC"
//                             maxLength="20"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-sm-2 col-form-label">
//                           Job Change Reason
//                         </label>
//                         <div className="col-md-2">
//                           <select
//                             className={classNames("form-control", {
//                               "is-invalid": errors.job_change_reason_id,
//                             })}
//                             {...register("job_change_reason_id", {
//                               value: formdata.job_change_reason_id,
//                             })}
//                             onChange={inputEvent}
//                             name="job_change_reason_id"
//                             value={formdata.job_change_reason_id}
//                           >
//                             <option value="">--Select--</option>
//                             <option value="0"> EURO</option>
//                             <option value="1">Dollar </option>
//                             <option value="3">XYZ </option>

//                           </select>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           Notice Period
//                         </label>
//                         <div className="col-md-2">
//                           <select
//                             className={classNames("form-control", {
//                               "is-invalid": errors.notice_period,
//                             })}
//                             {...register("notice_period", {
//                               value: formdata.notice_period,
//                             })}
//                             onChange={inputEvent}
//                             name="notice_period"
//                             value={formdata.notice_period}
//                           >
//                             <option value="">--Select--</option>
//                             <option value="0"> EURO</option>
//                             <option value="1">Dollar </option>
//                             <option value="3">XYZ </option>

//                           </select>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-sm-2 col-form-label">
//                           Total Exp Yrs
//                         </label>
//                         <div className="col-md-2">
//                           <select
//                             className={classNames("form-control", {
//                               "is-invalid": errors.experience_years,
//                             })}
//                             {...register("experience_years", {
//                               value: formdata.experience_years,
//                             })}
//                             onChange={inputEvent}
//                             name="experience_years"
//                             value={formdata.experience_years}
//                           >
//                             <option value="">--Select--</option>
//                             <option value="0"> 1</option>
//                             <option value="1">2 </option>
//                             <option value="2">3 </option>
//                             <option value="4">4 </option>
//                             <option value="5">5 </option>
//                             <option value="6">6 </option>

//                           </select>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           Total Exp Mon
//                         </label>
//                         <div className="col-md-2">
//                           <select
//                             className={classNames("form-control", {
//                               "is-invalid": errors.experience_months,
//                             })}
//                             {...register("experience_months", {
//                               value: formdata.experience_months,
//                             })}
//                             onChange={inputEvent}
//                             name="experience_months"
//                             value={formdata.experience_months}
//                           >
//                             <option value="">--Select--</option>
//                             <option value="0"> 1</option>
//                             <option value="1">2 </option>
//                             <option value="2">3 </option>
//                             <option value="3">4 </option>
//                             <option value="4">5 </option>
//                             <option value="5">6 </option>

//                           </select>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           Open to Relocate
//                         </label>
//                         <div className="col-md-2">
//                           <select
//                             className={classNames("form-control", {
//                               "is-invalid": errors.open_to_relocate,
//                             })}
//                             {...register("open_to_relocate", {
//                               value: formdata.open_to_relocate,
//                             })}
//                             onChange={inputEvent}
//                             name="open_to_relocate"
//                             value={formdata.open_to_relocate}
//                           >
//                             <option value="">--Select--</option>
//                             <option value="0"> Yes</option>
//                             <option value="1">No</option>
//                             <option value="3">After Pandamic </option>

//                           </select>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-sm-2 col-form-label">
//                           Industry
//                         </label>
//                         <div className="col-sm-2">
//                           <select
//                             className={classNames("form-control", {
//                               "is-invalid": errors.industry_id,
//                             })}
//                             {...register("industry_id", {
//                               value: formdata.industry_id,
//                             })}
//                             onChange={inputEvent}
//                             name="industry_id"
//                             value={formdata.industry_id}
//                           >
//                             <option value="">--Select--</option>
//                             <option value="0"> Infoces</option>
//                             <option value="1">Synecron</option>
//                             <option value="3">IBM</option>

//                           </select>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           Other Industry
//                         </label>
//                         <div className="col-sm-2 ">
//                           <input
//                             type="text"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.other_industry,
//                             })}
//                             {...register("other_industry", {
//                               value: formdata.other_industry,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="Enter Industry Name"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.other_industry?.message}
//                           </small>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           LinkedIn
//                         </label>
//                         <div className="col-sm-2 ">
//                           <input
//                             type="text"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.linkedin,
//                             })}
//                             {...register("linkedin", {
//                               value: formdata.linkedin,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="Enter Other Industry Name"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.linkedin?.message}
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">

//                         <label className="col-sm-2 col-form-label">
//                           Submitted Date
//                         </label>
//                         <div className="col-sm-2 ">
//                           <input
//                             type="date"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.submitted_datetime,
//                             })}
//                             {...register("submitted_datetime", {
//                               value: formdata.submitted_datetime,
//                             })}
//                             onChange={inputEvent}
//                             placeholder=""
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.submitted_datetime?.message}
//                           </small>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           Source
//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             name="source"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.source,
//                             })}
//                             {...register("source", {
//                               value: formdata.source,
//                             })}
//                             onChange={inputEvent}
//                             placeholder=" Enter Source"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.source?.message}
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-sm-2 col-form-label">Remark</label>
//                         <div className="col-sm-10">
//                           <textarea
//                             className={classNames("form-control", {
//                               "is-invalid": errors.remarks,
//                             })}
//                             {...register("remarks", {
//                               value: formdata.remarks,
//                             })}
//                             type="text"
//                             name="remarks"
//                             // value={validation.values.permanent_address}
//                             onChange={inputEvent}
//                             placeholder=" remark here"
//                             id="remarks" />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-md-2 col-form-label">
//                           Documents
//                         </label>
//                       </div>
//                     </div>
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">

//                         <label className="col-sm-2 col-form-label">
//                           PAN Number<span style={{ color: "red", fontSize: 15 }}>*</span>
//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             name="pan_number"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.pan_number,
//                             })}
//                             {...register("pan_number", {
//                               value: formdata.pan_number,
//                             })}
//                             onChange={inputEvent}
//                             value={formdata.pan_number}
//                             placeholder="Enter PAN Number"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.pan_number?.message}
//                           </small>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           Upload<span style={{ color: "red", fontSize: 15 }}>*</span>
//                         </label>
//                         <div className="col-sm-4">
//                           <input
//                             type="file"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.pan_file,
//                             })}
//                             {...register("cv", {
//                               value: formdata.pan_file,
//                             })}
//                             // onChange={inputEvent}
//                             onChange={panstore}
//                             // value={formdata.pan_file}
//                             name="pan_file"
//                             id="pan_file" style={{ paddingTop: "0px" }} />
//                           <small className="invalid-feedback">
//                             {errors.pan_file?.message}
//                           </small>
//                         </div>

//                         <div className="card-body registrationCard">
//                           <div className="form-group row">
//                             <label className="col-sm-2 col-form-label">
//                               Aadhar Number<span style={{ color: "red", fontSize: 15 }}>*</span>
//                             </label>
//                             <div className="col-sm-2">
//                               <input
//                                 name="adhaar_number"
//                                 className={classNames("form-control", {
//                                   "is-invalid": errors.adhaar_number,
//                                 })}
//                                 {...register("adhaar_number", {
//                                   value: formdata.adhaar_number,
//                                 })}
//                                 onChange={inputEvent}
//                                 value={formdata.adhaar_number}
//                                 placeholder="Enter Aadhar Number"
//                                 maxLength="12"
//                               />
//                               <small className="invalid-feedback">
//                                 {errors.adhaar_number?.message}
//                               </small>
//                             </div>
//                             <label className="col-sm-2 col-form-label">
//                               Upload<span style={{ color: "red", fontSize: 15 }}>*</span>
//                             </label>
//                             <div className="col-sm-4">
//                               <input
//                                 type="file"
//                                 className={classNames("form-control", {
//                                   "is-invalid": errors.aadhar_file,
//                                 })}
//                                 {...register("cv", {
//                                   value: formdata.aadhar_file,
//                                 })}
//                                 // onChange={inputEvent}
//                                 onChange={aadharstore}
//                                 // value={formdata.cv}
//                                 name="aadhar_file"
//                                 id="aadhar_file" style={{ paddingTop: "0px" }} />
//                               <small className="invalid-feedback">
//                                 {errors.aadhar_file?.message}
//                               </small>
//                             </div>


//                           </div>
//                         </div>



//                         <div className="card-body registrationCard">
//                           <div className="form-group row">
//                             <label className="col-sm-2 col-form-label">
//                               Passport Number
//                             </label>
//                             <div className="col-sm-2">
//                               <input
//                                 type="text"
//                                 name="passport"
//                                 className={classNames("form-control", {
//                                   "is-invalid": errors.passport,
//                                 })}
//                                 {...register("passport", {
//                                   value: formdata.passport,
//                                 })}
//                                 onChange={inputEvent}
//                                 placeholder="9847353775"
//                                 maxLength="20"
//                               />
//                               <small className="invalid-feedback">
//                                 {errors.passport?.message}
//                               </small>
//                             </div>
//                             <label className="col-sm-2 col-form-label">
//                               Validity
//                             </label>
//                             <div className="col-sm-2 ">
//                               <input
//                                 type="date"
//                                 className={classNames("form-control", {
//                                   "is-invalid": errors.passport_validity,
//                                 })}
//                                 {...register("passport_validity", {
//                                   value: formdata.passport_validity,
//                                 })}
//                                 onChange={inputEvent}
//                                 placeholder=""
//                                 maxLength="20"
//                               />
//                               <small className="invalid-feedback">
//                                 {errors.passport_validity?.message}
//                               </small>
//                             </div>
//                             <label className="col-sm-1 col-form-label">
//                               Upload
//                             </label>
//                             <div className="col-sm-3">
//                               <input
//                                 type="file"
//                                 className="form-control"
//                                 onChange={inputEvent}
//                                 // value={formdata.cv}
//                                 name="passport_file"
//                                 id="passport_file" style={{ paddingTop: "0px" }} />
//                             </div>

//                           </div>
//                         </div>


//                       </div>
//                     </div>
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-md-12 col-form-label">
//                           New Salary Bank Detail
//                         </label>
//                       </div>
//                     </div>
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-sm-2 col-form-label">
//                           Bank Name
//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             className={classNames("form-control", {
//                               "is-invalid": errors.bank_name,
//                             })}
//                             {...register("bank_name", {
//                               value: formdata.bank_name,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="Enter Bank Name"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.bank_name?.message}
//                           </small>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           Branch Name
//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             className={classNames("form-control", {
//                               "is-invalid": errors.branch,
//                             })}
//                             {...register("branch", {
//                               value: formdata.branch,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="Enter branch Name"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.branch?.message}
//                           </small>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           Account Name
//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             name="account_name"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.account_name,
//                             })}
//                             {...register("account_name", {
//                               value: formdata.account_name,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="Enter Account Holder"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.account_name?.message}
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-sm-2 col-form-label">
//                           Account Number
//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             type="text"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.account_number,
//                             })}
//                             {...register("account_number", {
//                               value: formdata.account_number,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="9847353775"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.account_number?.message}
//                           </small>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           IFSC Code
//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             type="text"
//                             name="ifsc_code"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.ifsc_code,
//                             })}
//                             {...register("ifsc_code", {
//                               value: formdata.ifsc_code,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="HDFC3537751"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.ifsc_code?.message}
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-md-12 col-form-label">
//                           Old Bank Detail
//                         </label>
//                       </div>
//                     </div>
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-sm-2 col-form-label">
//                           Old Bank Name
//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             className={classNames("form-control", {
//                               "is-invalid": errors.old_bank_name,
//                             })}
//                             {...register("old_bank_name", {
//                               value: formdata.old_bank_name,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="Enter Bank Name"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.old_bank_name?.message}
//                           </small>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           Old Branch Name
//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             className={classNames("form-control", {
//                               "is-invalid": errors.old_bank_branch,
//                             })}
//                             {...register("old_bank_branch", {
//                               value: formdata.old_bank_branch,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="Enter Branch Name"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.old_bank_branch?.message}
//                           </small>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           Old Account name
//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             type="text"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.old_account_name,
//                             })}
//                             {...register("old_account_name", {
//                               value: formdata.old_account_name,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="Enter Account  Holder"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.old_account_name?.message}
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-sm-2 col-form-label">
//                           Old Account Number
//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             type="text"
//                             name="old_account_number"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.old_account_number,
//                             })}
//                             {...register("old_account_number", {
//                               value: formdata.old_account_number,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="9847353775"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.old_account_number?.message}
//                           </small>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           Old IFSC Code
//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             type="text"
//                             name="old_ifsc_code"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.old_ifsc_code,
//                             })}
//                             {...register("old_ifsc_code", {
//                               value: formdata.old_ifsc_code,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="9847353775"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.old_ifsc_code?.message}
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-sm-2 col-form-label">
//                           Resume:
//                           {/* Resume: <DriveFolderUploadIcon className="icon"/>  */}
//                         </label>
//                         <input
//                           type="file"
//                           className={classNames("form-control", {
//                             "is-invalid": errors.cv,
//                           })}
//                           {...register("cv", {
//                             value: formdata.cv,
//                           })}
//                           onChange={(e) => filestore(e)}
//                           // value={formdata.cv}
//                           name="cv"
//                           id="cv" style={{ paddingTop: "0px" }} />
//                       </div>&nbsp;&nbsp;&nbsp;
//                     </div>



//                   </div>
//                 </div>
//               </div>
//             </div>


//             {/*=========> Profile Summary Component  ==========>*/}

//             <div>
//               <h4>Profile Summary</h4>

//               <div className="row">
//                 <div className="col-md-12 grid-margin stretch-card">
//                   <div className="card">
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-sm-2 col-form-label">
//                           Designation
//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             className={classNames("form-control", {
//                               "is-invalid": errors.designation,
//                             })}
//                             {...register("designation", {
//                               value: formdata.designation,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="Enter the designation"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.designation?.message}
//                           </small>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           Department
//                         </label>
//                         <div className="col-sm-2">
//                           <select
//                             className={classNames("form-control", {
//                               "is-invalid": errors.prf_department,
//                             })}
//                             {...register("prf_department", {
//                               value: formdata.prf_department,
//                             })}
//                             onChange={inputEvent}
//                             name="prf_department"
//                             value={formdata.prf_department}
//                           >
//                             <option value="">--Select--</option>
//                             <option value="0"> Development</option>
//                             <option value="1">Management</option>
//                             <option value="3">R&D</option>

//                           </select>
//                           <small className="invalid-feedback">
//                             {errors.prf_department?.message}
//                           </small>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           Joining Date
//                         </label>
//                         <div className="col-sm-2 ">
//                           <input
//                             type="date"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.prf_joining_date,
//                             })}
//                             {...register("prf_joining_date", {
//                               value: formdata.prf_joining_date,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="Enter First Name"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.prf_joining_date?.message}
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <lable className="col-sm-2 col-form-lable">
//                           Group Health Insurance
//                         </lable>
//                         <div className="col-sm-2">
//                           <select
//                             className={classNames("form-control", {
//                               "is-invalid": errors.prf_group_health_insurance,
//                             })}
//                             {...register("prf_group_health_insurance", {
//                               value: formdata.prf_group_health_insurance,
//                             })}
//                             onChange={inputEvent}
//                             name="prf_group_health_insurance"
//                             value={formdata.prf_group_health_insurance}
//                           >
//                             <option value="">--Select--</option>
//                             <option value="0"> Yes</option>
//                             <option value="1">No</option>
//                           </select>
//                         </div>
//                         <lable className="col-sm-2 col-form-lable">
//                           AceNet Assets
//                         </lable>
//                         <div className="col-sm-2">
//                           <select
//                             className={classNames("form-control", {
//                               "is-invalid": errors.prf_acenet_asset,
//                             })}
//                             {...register("prf_acenet_asset", {
//                               value: formdata.prf_acenet_asset,
//                             })}
//                             onChange={inputEvent}
//                             name="prf_acenet_asset"
//                             value={formdata.prf_acenet_asset}
//                           >
//                             <option value="">--Select--</option>
//                             <option value="0"> Yes</option>
//                             <option value="1">No</option>

//                           </select>
//                         </div>

//                         <lable className="col-sm-2 col-form-lable">
//                           Client Assets
//                         </lable>
//                         <div className="col-sm-2">
//                           <select
//                             className={classNames("form-control", {
//                               "is-invalid": errors.prf_client_asset,
//                             })}
//                             {...register("prf_client_asset", {
//                               value: formdata.prf_client_asset,
//                             })}
//                             onChange={inputEvent}
//                             name="prf_client_asset"
//                             value={formdata.prf_client_asset}
//                           >
//                             <option value="">--Select--</option>
//                             <option value="0"> Yes</option>
//                             <option value="1">No</option>
//                           </select>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-sm-2 col-form-label">
//                           Client Name
//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             className={classNames("form-control", {
//                               "is-invalid": errors.prf_client_name,
//                             })}
//                             {...register("prf_client_name", {
//                               value: formdata.prf_client_name,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="Enter the Name"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.prf_client_name?.message}
//                           </small>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           Initiation Date
//                         </label>
//                         <div className="col-sm-2 ">
//                           <input
//                             type="date"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.prf_inititation_date,
//                             })}
//                             {...register("prf_inititation_date", {
//                               value: formdata.prf_inititation_date,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="Enter First Name"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.prf_inititation_date?.message}
//                           </small>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           Report Date
//                         </label>
//                         <div className="col-sm-2 ">
//                           <input
//                             type="date"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.prf_report_date,
//                             })}
//                             {...register("prf_report_date", {
//                               value: formdata.prf_report_date,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="Enter First Name"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.prf_report_date?.message}
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-sm-2 col-form-label">
//                           Agency Name
//                         </label>
//                         <div className="col-sm-2">
//                           <input
//                             className={classNames("form-control", {
//                               "is-invalid": errors.prf_agency,
//                             })}
//                             {...register("prf_agency", {
//                               value: formdata.prf_agency,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="Enter the Agency Name"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.prf_agency?.message}
//                           </small>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           Submission Date
//                         </label>
//                         <div className="col-sm-2 ">
//                           <input
//                             type="date"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.prf_submission_date,
//                             })}
//                             {...register("prf_submission_date", {
//                               value: formdata.prf_submission_date,
//                             })}
//                             onChange={inputEvent}
//                             placeholder="Enter First Name"
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.prf_submission_date?.message}
//                           </small>
//                         </div>
//                         <label className="col-sm-2 col-form-label">
//                           Exit Date
//                         </label>
//                         <div className="col-sm-2 ">
//                           <input
//                             type="date"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.prf_exit_date,
//                             })}
//                             {...register("prf_submission_date", {
//                               value: formdata.prf_exit_date,
//                             })}
//                             onChange={inputEvent}
//                             placeholder=""
//                             maxLength="20"
//                           />
//                           <small className="invalid-feedback">
//                             {errors.prf_exit_date?.message}
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <lable className="col-sm-2 col-form-lable">
//                           Form 16(FY 22-23)
//                         </lable>
//                         <div className="col-sm-2">
//                           <select
//                             className={classNames("form-control", {
//                               "is-invalid": errors.prf_form_16,
//                             })}
//                             {...register("prf_form_16", {
//                               value: formdata.prf_form_16,
//                             })}
//                             onChange={inputEvent}
//                             name="prf_form_16"
//                             value={formdata.prf_form_16}
//                           >
//                             <option value="">--Select--</option>
//                             <option value="0"> Yes</option>
//                             <option value="1">No</option>
//                           </select>
//                         </div>
//                         <lable className="col-sm-2 col-form-lable">
//                           Covid Certificate
//                         </lable>
//                         <div className="col-sm-2">
//                           <select
//                             className={classNames("form-control", {
//                               "is-invalid": errors.prf_covid_certificate,
//                             })}
//                             {...register("prf_covid_certificate", {
//                               value: formdata.prf_covid_certificate,
//                             })}
//                             onChange={inputEvent}
//                             name="prf_covid_certificate"
//                             value={formdata.prf_covid_certificate}
//                           >
//                             <option value="">--Select--</option>
//                             <option value="0"> Yes</option>
//                             <option value="1">No</option>

//                           </select>
//                         </div>

//                         <lable className="col-sm-2 col-form-lable">
//                           BGV Status
//                         </lable>
//                         <div className="col-sm-2">
//                           <select
//                             className={classNames("form-control", {
//                               "is-invalid": errors.prf_bgv_certificate,
//                             })}
//                             {...register("prf_bgv_certificate", {
//                               value: formdata.prf_bgv_certificate,
//                             })}
//                             onChange={inputEvent}
//                             name="prf_bgv_certificate"
//                             value={formdata.prf_bgv_certificate}
//                           >
//                             <option value="">--Select--</option>
//                             <option value="0"> Pending </option>
//                             <option value="1">Done</option>
//                             <option value="2">Not Done</option>
//                           </select>
//                         </div>
//                       </div>
//                     </div>
//                     {/* <div className="submitButton">
//                       <button
//                         type="submit"
//                         className="btn btn-outline-success btn-icon-text btn-sm"
//                       //disabled={!formState.isValid}
//                       >
//                         <i className="mdi mdi-file-check btn-icon-prepend"></i>
//                         Previous
//                       </button>
//                       <button
//                         type="button"
//                         className="btn btn-outline-danger btn-sm"
//                         style={{ marginLeft: "10px" }}
//                       // onClick={onReset}
//                       >
//                         <i className="mdi mdi-refresh"></i>
//                         Next
//                       </button>
//                     </div> */}

//                   </div>
//                 </div>
//               </div>
//             </div>


//             {/*=========> Educational Information Component  ==========>*/}

//             <div>
//               <h4>Education Details</h4>

//               <div className="row">
//                 <div className="col-md-12 grid-margin stretch-card">
//                   <div className="card">
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">

//                         <label className="col-sm-2 col-form-label">
//                           Education
//                         </label>
//                         <div className="col-sm-2 ">
//                           <input
//                             type="text"
//                             name="education"
//                             className="form-control"
//                             value={formdata.education}
//                             placeholder="BCA"
//                             onChange={inputEvent}
//                           />
//                           <small className="invalid-feedback">

//                           </small>
//                         </div>




//                       </div>
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <h4>Charges and Availability Details</h4>


//               <div className="row">
//                 <div className="col-md-12 grid-margin stretch-card">
//                   <div className="card">
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <label className="col-sm-2 col-form-label">
//                           Add Joining Salary
//                         </label>

//                         <div className="col-sm-2 ">
//                           <input
//                             type="text"
//                             name="joining_salary"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.joining_salary,
//                             })}
//                             {...register("joining_salary", {
//                               value: formdata.joining_salary,
//                             })}
//                             onChange={inputEvent}

//                             placeholder="60000"

//                           />
//                           <small className="invalid-feedback">
//                             {errors.joining_salary?.message}
//                           </small>
//                         </div>



//                       </div>
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/*=========>  Charges and Availability Component  ==========>*/}

//             {/* <div>
//               <h4>Charges and Availability</h4>

//               <div className="row">
//                 <div className="col-md-12 grid-margin stretch-card">
//                   <div className="card">
//                     <div className="card-body registrationCard">
//                       <div className="form-group row">
//                         <h1>Charges and Availability</h1>

//                         <Button
//                           variant="primary" onClick={handleShow}>
//                           Add Charges and Availability Detail
//                         </Button>

//                         <Modal
//                           show={show}
//                           onHide={handleClose}
//                           backdrop="static"
//                           keyboard={false}
//                         >
//                           <Modal.Header >
//                             <Modal.Title>Add Charges and Availability</Modal.Title>
//                           </Modal.Header>
//                           <Modal.Body>
//                             <form>
//                               <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                                 <Form.Label >Joining_Salary</Form.Label>
//                                 <Form.Control
//                                   type="text"
//                                   name="Joining_Salary"
//                                   className={classNames("form-control", {
//                                     "is-invalid": errors.Joining_Salary,
//                                   })}
//                                   {...register("Joining_Salary", {
//                                     value: getValues.Joining_Salary,
//                                   })}
//                                   placeholder="60000"
//                                   autoFocus
//                                 />
//                                 <small className="invalid-feedback">
//                                   {errors.Joining_Salary?.message}
//                                 </small>
//                               </Form.Group>

//                             </form>
//                           </Modal.Body>
//                           <Modal.Footer>
//                             <Button variant="secondary"
//                               onClick={handleClose}
//                             >
//                               Close
//                             </Button>
//                             <Button variant="primary">Save</Button>
//                           </Modal.Footer>
//                         </Modal>
//                         <div className="align-self-end ml-auto">

//                           <button
//                             type="submit"
//                             className="btn btn-outline-success btn-icon-text btn-sm"
//                           //disabled={!formState.isValid}
//                           >
//                             <i className="mdi mdi-file-check btn-icon-prepend"></i>
//                             Previous
//                           </button>
//                           <button
//                             type="button"
//                             className="btn btn-outline-danger btn-sm"
//                             style={{ marginLeft: "10px" }}
//                           // onClick={onReset}
//                           >
//                             <i className="mdi mdi-refresh"></i>
//                             Submit
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             </div> */}


//             {/*=========> Submit Button  ==========>*/}
//             <br></br>
//             <div className="submitButton">
//               <button
//                 type="submit"
//                 className="btn btn-outline-success btn-icon-text btn-sm"
//                 onClick={onSubmit}
//               >
//                 <i className="mdi mdi-file-check btn-icon-prepend"></i>
//                 Submit
//               </button>
//               {/* <button
//                 type="button"
//                 className="btn btn-outline-danger btn-sm"
//                 style={{ marginLeft: "10px" }}
//                 onClick={onReset}
//               >
//                 <i className="mdi mdi-refresh"></i>
//                 Next
//               </button> */}
//             </div>
//           </form>
//         </div>
//       </div>
//     </React.Fragment>
//   )
// }
// export default AddNewCandidate;



