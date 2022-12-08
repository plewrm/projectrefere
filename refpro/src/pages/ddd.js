// import React, { useEffect, useState } from "react"
// import ToastComponent from "components/Common/Toast"
// import * as Yup from "yup"
// import { useFormik } from "formik"
// import MetaTags from "react-meta-tags"
// import { useDispatch, useSelector } from "react-redux"
// import {
//   Card,
//   Col,
//   Container,
//   CardBody,
//   Label,
//   Button,
//   Form,
//   Input,
//   FormFeedback,
// } from "reactstrap"
// import Select from "react-select"
// import {
//   registerUser,
//   registerUserSuccessful,
//   registerUserFailed,
//   getGroup,
//   getRole,
//   getRoleType,
//   resetRoleType,
// } from "store/actions"

// //Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb"
// import { getCampaign } from "store/campaigns/actions"
// import { useHistory } from "react-router-dom"
// import { getCompanies } from "store/company/actions"

// const AddUser = () => {
//   const dispatch = useDispatch()
//   const history = useHistory()
//   const initialToastData = { toastHeading: "", toastContent: "" }
//   const [toastData, setToastData] = useState(initialToastData)
//   const [toastVisibility, setToastVisibility] = useState(false)
//   const [campsOptions, setCampsOptions] = useState([])

//   // Form validation
//   const validation = useFormik({
//     enableReinitialize: true,

//     initialValues: {
//       first_name: "",
//       last_name: "",
//       email: "",
//       group_id: "",
//       role_id: "",
//       campaign_id: [],
//       company_id: "",
//       company_role_id: "",
//     },
//     validationSchema: Yup.object({
//       first_name: Yup.string().required("Please Enter First Name"),
//       last_name: Yup.string().required("Please Enter Last Name"),
//       email: Yup.string()
//         .email("Please enter a valid email")
//         .required("Please Enter User Email"),
//       group_id: Yup.string().ensure().required("Please Select Group"),
//       role_id: Yup.string().ensure().required("Please Select Role"),
//       company_id: Yup.string().required("Please Select Company Name"),
//       company_role_id: Yup.string().required("Please Select Role Type"),
//       campaign_id: Yup.array().min(1, "Please Select At Least One Campaign"),
//     }),
//     onSubmit: values => {
//       console.log("On Submit=>", values)
//       const getCampaign_ids = values.campaign_id.map(x => x.value)
//       const user = {
//         ...values,
//         campaign_id: getCampaign_ids.toString(),
//       }
//       dispatch(registerUser(user))
//     },
//   })
//   const { user } = useSelector(state => ({
//     user: state.Account.user,
//   }))

//   const { group, role, roleType } = useSelector(state => state.Account)

//   const { registrationError } = useSelector(state => ({
//     registrationError: state.Account.registrationError,
//   }))

//   const { all_campaign } = useSelector(state => ({
//     all_campaign: state.Campaing.all_campaign,
//   }))

//   const { companies } = useSelector(state => ({
//     companies: state.Company.companies,
//   }))

//   useEffect(() => {
//     if (user) {
//       setToastData({
//         toastVisibility: true,
//         toastHeading: "Success",
//         toastContent: user?.message || "Success!",
//       })
//       showToast(true)
//       validation.resetForm()
//     }
//     if (registrationError) {
//       if (registrationError?.message) {
//         setToastData({
//           toastVisibility: true,
//           toastHeading: "Error",
//           toastContent: registrationError?.message || "Something went wrong!",
//         })
//         showToast()
//       }
//       validation.setErrors(registrationError?.error)
//     }
//   }, [user, registrationError])

//   useEffect(() => {
//     dispatch(getCampaign())
//     dispatch(getCompanies())
//   }, [])

//   useEffect(() => {
//     const cOptions = all_campaign?.data.map(x => {
//       const value = {
//         label: x.name,
//         value: x.id,
//       }
//       return value
//     })
//     setCampsOptions(cOptions)
//   }, [all_campaign])

//   useEffect(() => {
//     dispatch(getGroup())
//   }, [])

//   const showToast = () => {
//     setToastVisibility(true)
//     setTimeout(() => {
//       hideToastMsg()
//     }, 1000)
//   }

//   const hideToastMsg = () => {
//     setToastData(initialToastData)
//     setToastVisibility(false)
//     dispatch(registerUserSuccessful(null))
//     dispatch(registerUserFailed(null))
//     history.push("/admin/user")
//   }

//   const { group_id, role_id } = validation.values

//   useEffect(() => {
//     dispatch(resetRoleType())
//     group_id && dispatch(getRole(group_id))
//   }, [group_id])

//   useEffect(() => {
//     role_id && dispatch(getRoleType(role_id))
//   }, [role_id])
// console.log(validation)
//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <MetaTags>
//           <title>Add User | Senara</title>
//         </MetaTags>
//         <Container fluid={true}>
//           {toastVisibility && (
//             <ToastComponent
//               heading={toastData.toastHeading}
//               show={toastVisibility}
//               onCloseClick={hideToastMsg}
//               content={toastData.toastContent}
//             />
//           )}
//           <Breadcrumbs title="Users" breadcrumbItem="Add User" />

//           <Col lg={12}>
//             <Card>
//               <CardBody>
//                 {/* <CardTitle className="mb-4">Horizontal form layout</CardTitle> */}

//                 <Form
//                   onSubmit={e => {
//                     e.preventDefault()
//                     validation.handleSubmit()
//                     return false
//                   }}
//                 >
//                   <div className="row mb-4">
//                     <Label
//                       htmlFor="horizontal-firstname-Input"
//                       className="col-sm-3 col-form-label"
//                     >
//                       First Name
//                     </Label>
//                     <Col sm={9}>
//                       <Input
//                         name="first_name"
//                         type="text"
//                         className="form-control"
//                         id="horizontal-firstname-Input"
//                         placeholder="eg: senara"
//                         onChange={validation.handleChange}
//                         onBlur={validation.handleBlur}
//                         value={validation.values.first_name || ""}
//                         invalid={
//                           validation.touched?.first_name &&
//                           validation.errors?.first_name
//                             ? true
//                             : false
//                         }
//                       />
//                       {validation.touched?.first_name &&
//                       validation.errors?.first_name ? (
//                         <FormFeedback type="invalid">
//                           {validation.errors?.first_name}
//                         </FormFeedback>
//                       ) : null}
//                     </Col>
//                   </div>
//                   <div className="row mb-4">
//                     <Label
//                       htmlFor="horizontal-firstname-Inputs"
//                       className="col-sm-3 col-form-label"
//                     >
//                       Last Name
//                     </Label>
//                     <Col sm={9}>
//                       <Input
//                         name="last_name"
//                         type="text"
//                         className="form-control"
//                         id="horizontal-firstname-Inputs"
//                         placeholder="eg: senara"
//                         onChange={validation.handleChange}
//                         onBlur={validation.handleBlur}
//                         value={validation.values.last_name || ""}
//                         invalid={
//                           validation.touched?.last_name &&
//                           validation.errors?.last_name
//                             ? true
//                             : false
//                         }
//                       />
//                       {validation.touched?.last_name &&
//                       validation.errors?.last_name ? (
//                         <FormFeedback type="invalid">
//                           {validation.errors?.last_name}
//                         </FormFeedback>
//                       ) : null}
//                     </Col>
//                   </div>
//                   <div className="row mb-4">
//                     <Label
//                       htmlFor="horizontal-firstname-Input"
//                       className="col-sm-3 col-form-label"
//                     >
//                       Email
//                     </Label>
//                     <Col sm={9}>
//                       <Input
//                         name="email"
//                         className="form-control"
//                         placeholder="Enter email"
//                         type="text"
//                         onChange={validation.handleChange}
//                         onBlur={validation.handleBlur}
//                         value={validation.values.email || ""}
//                         invalid={
//                           validation.touched?.email && validation.errors?.email
//                             ? true
//                             : false
//                         }
//                       />
//                       {validation.touched?.email && validation.errors?.email ? (
//                         <FormFeedback type="invalid">
//                           {validation.errors?.email}
//                         </FormFeedback>
//                       ) : null}
//                     </Col>
//                   </div>
//                   <div className="row mb-4">
//                     <Label
//                       htmlFor="horizontal-firstname-Input"
//                       className="col-sm-3 col-form-label"
//                     >
//                       Company Name
//                     </Label>
//                     <Col sm={9}>
//                       <Input
//                         className="form-control placeholderselect"
//                         name="company_id"
//                         type="select"
//                         value={validation.values.company_id || ""}
//                         onChange={validation.handleChange}
//                         onBlur={validation.handleBlur}
//                         invalid={
//                           validation.touched?.company_id &&
//                           validation.errors?.company_id
//                             ? true
//                             : false
//                         }
//                       >
//                         <option value="" disabled>
//                           Select
//                         </option>
//                         {companies?.data.map(option => {
//                           return (
//                             <option key={option.id} value={option.id}>
//                               {option.name}
//                             </option>
//                           )
//                         })}
//                       </Input>
//                       {validation.touched?.company_id &&
//                       validation.errors?.company_id ? (
//                         <FormFeedback type="invalid">
//                           {validation.errors?.company_id}
//                         </FormFeedback>
//                       ) : null}
//                     </Col>
//                   </div>

//                   {/* group */}
//                   <div className="row mb-4">
//                     <Label
//                       htmlFor="horizontal-firstname-Input"
//                       className="col-sm-3 col-form-label"
//                     >
//                       Group
//                     </Label>
//                     <Col sm={9}>
//                       <Input
//                         className="form-control placeholderselect"
//                         name="group_id"
//                         type="select"
//                         value={validation.values.group_id || ""}
//                         onChange={e => {
//                           validation.handleChange(e)
//                           validation.setFieldValue("role_id", "")
//                           validation.setFieldValue("company_role_id", "")
//                         }}
//                         onBlur={validation.handleBlur}
//                         invalid={
//                           validation.touched?.group_id &&
//                           validation.errors?.group_id
//                             ? true
//                             : false
//                         }
//                       >
//                         <option value="" disabled>
//                           Select
//                         </option>
//                         {group?.map(option => {
//                           return (
//                             <option key={option.id} value={option.id}>
//                               {option.name}
//                             </option>
//                           )
//                         })}
//                       </Input>
//                       {validation.touched?.group_id &&
//                       validation.errors?.group_id ? (
//                         <FormFeedback type="invalid">
//                           {validation.errors?.group_id}
//                         </FormFeedback>
//                       ) : null}
//                     </Col>
//                   </div>

//                   <div className="row mb-4">
//                     <Label
//                       htmlFor="horizontal-firstname-Input"
//                       className="col-sm-3 col-form-label"
//                     >
//                       Role
//                     </Label>
//                     <Col sm={9}>
//                       <Input
//                         className="form-control placeholderselect"
//                         name="role_id"
//                         type="select"
//                         value={validation.values.role_id || ""}
//                         onChange={e => {
//                           validation.handleChange(e)
//                           validation.setFieldValue("company_role_id", "")
//                         }}
//                         onBlur={validation.handleBlur}
//                         invalid={
//                           validation.touched?.role_id &&
//                           validation.errors?.role_id
//                             ? true
//                             : false
//                         }
//                       >
//                         <option value="" disabled>
//                           Select
//                         </option>
//                         {role?.map(option => {
//                           return (
//                             <option key={option.id} value={option.id}>
//                               {option.name}
//                             </option>
//                           )
//                         })}
//                       </Input>
//                       {validation.touched?.role_id &&
//                       validation.errors?.role_id ? (
//                         <FormFeedback type="invalid">
//                           {validation.errors?.role_id}
//                         </FormFeedback>
//                       ) : null}
//                     </Col>
//                   </div>

//                   <div className="row mb-4">
//                     <Label
//                       htmlFor="horizontal-firstname-Input"
//                       className="col-sm-3 col-form-label"
//                     >
//                       Role Type
//                     </Label>
//                     <Col sm={9}>
//                       <Input
//                         className="form-control placeholderselect"
//                         name="company_role_id"
//                         type="select"
//                         value={validation.values.company_role_id || ""}
//                         onChange={validation.handleChange}
//                         onBlur={validation.handleBlur}
//                         invalid={
//                           validation.touched?.company_role_id &&
//                           validation.errors?.company_role_id
//                             ? true
//                             : false
//                         }
//                       >
//                         <option value="" disabled>
//                           Select
//                         </option>
//                         {roleType?.map(option => {
//                           return (
//                             <option key={option.id} value={option.id}>
//                               {option.name}
//                             </option>
//                           )
//                         })}
//                       </Input>
//                       {validation.touched?.company_role_id &&
//                       validation.errors?.company_role_id ? (
//                         <FormFeedback type="invalid">
//                           {validation.errors?.company_role_id}
//                         </FormFeedback>
//                       ) : null}
//                     </Col>
//                   </div>

//                   <div className="row mb-4">
//                     <label className="col-sm-3 col-form-label">Campaigns</label>
//                     <Col sm={9}>
//                       <Select
//                         name="campaign_id"
//                         isMulti={true}
//                         isSearchable={false}
//                         onChange={e => {
//                           validation.setFieldValue("campaign_id", e)
//                         }}
//                         value={validation.values.campaign_id || ""}
//                         options={campsOptions}
//                         classNamePrefix="select2-selection"
//                       />
//                       {validation.touched?.campaign_id &&
//                       validation.errors?.campaign_id ? (
//                         <span className="campaig-errorMsg">
//                           {validation.errors?.campaign_id}
//                         </span>
//                       ) : null}
//                     </Col>
//                   </div>

//                   <div className="row justify-content-end">
//                     <Col sm={9}>
//                       <div>
//                         <Button type="submit" color="primary" className="w-md">
//                           Submit
//                         </Button>
//                       </div>
//                     </Col>
//                   </div>
//                 </Form>
//               </CardBody>
//             </Card>
//           </Col>
//         </Container>
//         {/* container-fluid */}
//       </div>
//     </React.Fragment>
//   )
// }

// export default AddUser