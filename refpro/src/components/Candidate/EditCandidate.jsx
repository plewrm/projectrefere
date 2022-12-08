import React, { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AxiosApi from "../../AxiosApi"
import { addNewCandidateValidation } from '../../Validation/ValidationForm';

import {
  Button,
  Row,
  Modal,
}
  from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import '../../pages/Formik/stylesheets/formik1.css'

const EditCandidate = () => {
  const queryParams = new URLSearchParams(window.location.pathname);
  const id = queryParams.get('user');
  console.log("print Param", id)
  const time = "T07:47:35.213Z"
  const [active, setActive] = useState(1)
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [showhide, setShowHide] = useState('');
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    formState,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(addNewCandidateValidation),
  });
  const [allGetData, setAllGetData] = useState([])
const [getValues, setGetValues] = useState({
    alt_email: "",
    role: "",
    zip_code: "",
    headline: "",
    summary: "",
    currently_working: "",
    exp_details: "",
    organization: "",
    univercity: "",
    currently_enroled: "",
    edu_start_date: "",
    edu_end_date: "",
    details:"",
    certification: "",
    isu_authority: "",
    cer_exp: "",
    cer_issue_date: "",
    cer_expire_date: "",
    cer_details: "",
    availability: "",
    weekdays: "",
    weekends: "",
    con_rate_currency:"",
    con_rate:"",
    open_for_travel:"",

    salutation:"",
    first_name:"" ,
    last_name: "",
    phone: "",
    email: "",
    country_calling_code_id: "",
    emergency_contact: "",
    linkedin: "",
    permanent_address: "",
    country_id: "",
    state_id: "",
    city_id: "",
    experience_years: "",
    experience_months: "",
    cv: "",
    industry_id: "",
    other_industry: "",
    role: "",
    prf_joining_date: "",
    prf_exit_date: "",
    education: "",
    open_to_relocate: "",
    current_ctc_currency_id: "",
    current_ctc: "",
    expected_ctc_currency_id: "",
    expected_ctc: "",
    job_change_reason_id: "",
    notice_period: "",

    // cover_letter: "",
    // job_id: "",
    // remarks: "",
    // status: "",
    // submitted_datetime: "",
    // cv_displayname: "",
    // exported: "",
    // mail_response: "",
    // mail_send: "",
    // transaction_error: "",
    // middle_name: "",
    // father_name: "",
    // gender: "",
    // communication: "",
    // emergency_contact_name: "",
    // emergency_contact_relationship: "",
    // blood_group: "",
    // uan_number: "",
    // passport: "",
    // passport_validity: "",
    // adhaar_number: "",
    // pan_number: "",
    // bank_name: "",
    // branch: "",
    // account_name: "",
    // account_number: "",
    // ifsc_code: "",
    // old_bank_name: "",
    // old_bank_branch: "",
    // old_account_name: "",
    // old_account_number: "",
    // old_ifsc_code: "",
    // prf_department: "",
    // prf_group_health_insurance: "",
    // prf_acenet_asset: "",
    // prf_client_asset: "",
    // prf_form_16: "",
    // prf_covid_certificate: "",
    // prf_bgv_certificate: "",
    // prf_inititation_date: "",
    // prf_report_date: "",
    // prf_client_name: "",
    // prf_agency: "",
    // prf_submission_date: "",
    // type: "",
    // date_of_birth: "",
    // location: "",
    // medical_history: "",
    // documents_path: "",
    // documents_type: "",
    // designation: "",
    // source: "",
    // description: "",
    // category: "",
    // legal_history: "",
    // esi_ip_number: "",
    // aadhar_file: "",
    // pan_file: "",
    // passport_file: "",
  })

  const {email,phone,role,experience_years,experience_months,industry_id,cv,cover_letter,job_id,remarks,
status,current_ctc,expected_ctc,notice_period,open_to_relocate,city_id,country_id,country_calling_code_id,current_ctc_currency_id,expected_ctc_currency_id,first_name,last_name,other_industry,salutation,
state_id,submitted_datetime,job_change_reason_id,cv_displayname,exported,mail_response,mail_send,transaction_error,middle_name,father_name,gender,permanent_address,
communication,emergency_contact,emergency_contact_name,emergency_contact_relationship,blood_group,uan_number,passport,passport_validity,
adhaar_number,pan_number,education,bank_name,branch,account_name,account_number,ifsc_code,old_bank_name,old_bank_branch,old_account_name,old_account_number,old_ifsc_code,prf_department,prf_joining_date,
prf_group_health_insurance,prf_acenet_asset,prf_client_asset,prf_form_16,prf_covid_certificate,prf_bgv_certificate,prf_inititation_date,prf_report_date,prf_client_name,
prf_agency,prf_submission_date,type,date_of_birth,location,meical_history,linkedin,documents_path,documents_type,designation,source,prf_exit_date,description,category,joining_salary,legal_history,
esi_ip_number,aadhar_file,pan_file,passport_file, 
} = getValues;

const [uploadfile, setFiles] = useState([])
const filestore = (e) => {
  inputEvent(e)
  setFiles(e.target.files[0])
  const formData = new FormData();
  formData.append('cv', e.target.files[0]);
  fetch('http://localhost:3000/Data'+ id,{
    method: "PUT",
    body:formData
  }).then((resp)=>{
    resp.json().then((result)=>{
      console.log("result", result)
    })
  })
}
  const inputEvent = (event) => {
    const { name, value } = event.target;
    setGetValues((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  // const getTime = new Date();
  // console.log(time);
  const loadCandidate = async () => {
    const result = await AxiosApi.get('http://localhost:3000/Data/' + id);
    setGetValues(result.data);
  }
  useEffect(() => {
    loadCandidate()
  }, []);

  const onReset = () => {
    const confirmationButton = window.confirm(
      "Do you really want to Reset this Form?"
    );
    if (confirmationButton === true) {
      //window.location.reload();
      reset();
      setGetValues([])
    }
  };
  const onSubmit = (e) => {
    e.preventDefault()
    const jsonPost = {
      email: getValues.email === undefined ? "" : getValues.email,
      alt_email: getValues.alt_email,
      zip_code: getValues.zip_code,
      headline: getValues.headline,
      summary: getValues.summary,
      phone: getValues.phone,
      role: getValues.role,
      certification: getValues.certification,
      isu_authority: getValues.isu_authority,
      cer_exp: getValues.cer_exp,
      cer_issue_date: getValues.cer_issue_date,
      cer_expire_date: getValues.cer_expire_date,
      cer_details: getValues.cer_details,
      details:getValues.details,
      weekdays: getValues.weekdays,
      weekends: getValues.weekends,
      open_for_travel:getValues.open_for_travel,
      open_for_travel:getValues.open_for_travel,
      exp_details: getValues.exp_details,
      organization: getValues.organization,
      currently_working: getValues.currently_working,
      currently_enroled: getValues.currently_enroled,
      experience_years: getValues.experience_years,
      experience_months: getValues.experience_months,
      industry_id: getValues.industry_id,
      cv: getValues.cv,
      current_ctc: (getValues.current_ctc === undefined || getValues.current_ctc === "") ? "0" : getValues.current_ctc,
      expected_ctc: (getValues.expected_ctc === undefined || getValues.expected_ctc === "") ? "0" : getValues.expected_ctc,
      notice_period: getValues.notice_period,
      open_to_relocate: getValues.open_to_relocate,
      city_id: getValues.city_id,
      country_id: getValues.country_id,
      country_calling_code_id: getValues.country_calling_code_id,
      current_ctc_currency_id: getValues.current_ctc_currency_id,
      expected_ctc_currency_id: getValues.expected_ctc_currency_id,
      first_name: getValues.first_name,
      last_name: getValues.last_name,
      other_industry: getValues.other_industry,
      salutation: getValues.salutation,
      state_id: getValues.state_id,
      job_change_reason_id: getValues.job_change_reason_id,
      permanent_address: getValues.permanent_address,
      emergency_contact: (getValues.emergency_contact === undefined || getValues.emergency_contact === "") ? "0" : getValues.emergency_contact,
      education: getValues.education,
      univercity: getValues.univercity,
      prf_joining_date: getValues.prf_joining_date,
      edu_start_date: getValues.edu_start_date,
      edu_end_date: getValues.edu_end_date,
      linkedin: getValues.linkedin,
      prf_exit_date: getValues.prf_exit_date,
      availability: getValues.availability,
      con_rate_currency:getValues.con_rate_currency,
      con_rate:getValues.con_rate,
      // cover_letter: getValues.cover_letter,
      // job_id: getValues.job_id,
      // job_id:"12",
      // remarks: getValues.remarks,
      // status: getValues.status,
      // city_id:"2630",
      // country_id: "18",
      // country_calling_code_id: "39",
      // current_ctc_currency_id: "1",
      // expected_ctc_currency_id: "18",
      // state_id: "2626",
      // submitted_datetime: `${getValues.submitted_datetime}${time}`,
      // submitted_datetime: getValues.submitted_datetime,
      // cv_displayname: getValues.cv_displayname,
      // exported: getValues.exported,
      // mail_response: getValues.mail_response,
      // mail_send: getValues.mail_send,
      // transaction_error: getValues.transaction_error,
      // middle_name: getValues.middle_name,
      // father_name: getValues.father_name,
      // gender: getValues.gender,
      // communication: getValues.communication,
      // emergency_contact: getValues.emergency_contact,
      // emergency_contact_name: getValues.emergency_contact_name,
      // emergency_contact_relationship: getValues.emergency_contact_relationship,
      // blood_group: getValues.blood_group,
      // uan_number: getValues.uan_number,
      // passport: getValues.passport,
      // passport_validity: `${getValues.passport_validity}${time}`,
      // passport_validity: getValues.passport_validity,
      // adhaar_number: getValues.adhaar_number,
      // pan_number: getValues.pan_number,
      // bank_name: getValues.bank_name,
      // branch: getValues.branch,
      // account_name: getValues.account_name,
      // account_number: getValues.account_number,
      // ifsc_code: getValues.ifsc_code,
      // old_bank_name: getValues.old_bank_name,
      // old_bank_branch: getValues.old_bank_branch,
      // old_account_name: getValues.old_account_name,
      // old_account_number: getValues.old_account_number,
      // old_ifsc_code: (getValues.old_ifsc_code === undefined || getValues.old_ifsc_code === "") ? "0" : getValues.old_ifsc_code,
      // prf_department: getValues.prf_department,
      // prf_joining_date: `${getValues.prf_joining_date}${time}`,
      // prf_group_health_insurance: getValues.prf_group_health_insurance,
      // prf_acenet_asset: getValues.prf_acenet_asset,
      // prf_client_asset: getValues.prf_client_asset,
      // prf_form_16: getValues.prf_form_16,
      // prf_covid_certificate: getValues.prf_covid_certificate,
      // prf_bgv_certificate: getValues.prf_bgv_certificate,
      // prf_inititation_date: `${getValues.prf_inititation_date}${time}`,
      // prf_inititation_date: getValues.prf_inititation_date,
      // prf_report_date: `${getValues.prf_report_date}${time}`,
      // prf_report_date: getValues.prf_report_date,
      // prf_client_name: getValues.prf_client_name,
      // prf_agency: getValues.prf_agency,
      // prf_submission_date: `${getValues.prf_submission_date}${time}`,
      // prf_submission_date: getValues.prf_submission_date,
      // type: getValues.type,
      // date_of_birth: getValues.date_of_birth,
      // location: getValues.location,
      // medical_history: getValues.medical_history,
      // documents_path: getValues.documents_path,
      // documents_type: getValues.documents_type,
      // designation: getValues.designation,
      // source: getValues.source,
      // description: getValues.description,
      // category: getValues.category,
      // availability: (getValues.availability === undefined || getValues.availability === "") ? "0" : getValues.availability,
      // legal_history: getValues.legal_history,
      // esi_ip_number: getValues.esi_ip_number
    };
    const confirmationButton = window.confirm(
      "Do you really want to Submit this Form?"
    );
    if (confirmationButton === true) {
      // async function ApiPostfetchData() {
        AxiosApi.put(
          // `/globalnetwork_candidate/id`,
          `/Data/${id}`,
          jsonPost

        )
        .then(function (result) {
          console.log(result); // "Some User token"
          if (result.data == "Success") {
            alert(
              "Candidate have been Successfully Addeed."
            );
          }
          navigate("/NewCandidate")
          
        });
        
      // }
      // ApiPostfetchData();
    }
  };
  console.log("allGetData", allGetData)
  const handleshowhide = (event) => {
    const getuser = event.target.value;
    setShowHide(getuser);
  }
  return (
    <React.Fragment>
      <div className="new">
        <Sidebar />
        <div className="newContainer">
          <Navbar />
          <div className="bar">
            <div className="top">
              <h1>Edit Candidate</h1>
              {allGetData.email}
            </div>
            <Link to="/NewCandidate"
              className="btn"
              style={{ marginLeft: 545, color: "white", backgroundColor: "Blue" }}
            >
              Back
            </Link>
          </div>


          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            {/*=========> Personal Details Component  ==========>*/}

            <div>
              <h4>Personal Details</h4>

              <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        <label className="col-md-2 col-form-label">
                          Salutaton<span style={{ color: "red", fontSize: 15 }}>*</span>
                        </label>
                        <div className="col-md-2">
                          <select
                            className={classNames("form-control", {
                              "is-invalid": errors.salutation,
                            })}
                            {...register("salutation", {
                              value: getValues.salutation,
                            })}
                            onChange={inputEvent}
                            name="salutation"
                            value={getValues.salutation}
                          >
                            <option value="">--Select--</option>
                            <option value="1"> MR.</option>
                            <option value="2"> Mrs. </option>
                            <option value="3"> Ms. </option>

                          </select>
                          <small className="invalid-feedback">
                            {errors.salutation?.message}
                          </small>
                        </div>
                        <label className="col-sm-2 col-form-label">
                          First Name
                          <span style={{ color: "#FF0000" }}>
                            <b>*</b>
                          </span>
                          :
                        </label>
                        <div className="col-sm-2">
                          <input
                            name="first_name"
                            className={classNames("form-control", {
                              "is-invalid": errors.first_name,
                            })}
                            {...register("first_name", {
                              value: getValues.first_name,
                            })}
                            onChange={inputEvent}
                            placeholder="Enter First Name"
                            maxLength="20"
                            value={getValues.first_name}
                          />
                          <small className="invalid-feedback">
                            {errors.first_name?.message}
                          </small>
                        </div>
                        <label className="col-sm-2 col-form-label">
                          Last Name
                          <span style={{ color: "#FF0000" }}>
                            <b>*</b>
                          </span>
                          :
                        </label>
                        <div className="col-sm-2">
                          <input
                            className={classNames("form-control", {
                              "is-invalid": errors.last_name,
                            })}
                            {...register("last_name", {
                              value: getValues.last_name,
                            })}
                            onChange={inputEvent}
                            name="last_name"
                            placeholder="Enter Last Name"
                            maxLength="20"
                            value={getValues.last_name}
                          />
                          <small className="invalid-feedback">
                            {errors.last_name?.message}
                          </small>
                        </div>
                        {/* <label className="col-sm-2 col-form-label">
                          Middle Name :
                        </label>
                        <div className="col-sm-2">
                          <input
                            name="middle_name"
                            className={classNames("form-control", {
                              "is-invalid": errors.middle_name,
                            })}
                            {...register("middle_name", {
                              value: getValues.middle_name,
                            })}
                            onChange={inputEvent}
                            // value={getValues.middle_name}
                            placeholder="Enter Middle Name"
                            maxLength="20"
                          />
                          <small className="invalid-feedback">
                            {errors.middle_name?.message}
                          </small>
                        </div> */}
                      </div>
                    </div>
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        {/* here just move the lastname field up and remove here */}

                        <label className="col-sm-2 col-form-label">
                          Phone No
                        </label>
                        <div className="col-sm-2">
                          <input
                            // type="number"
                            name="emergency_contact"
                            className={classNames("form-control", {
                              "is-invalid": errors.emergency_contact,
                            })}
                            {...register("emergency_contact", {
                              value: getValues.emergency_contact,
                            })}
                            onChange={inputEvent}
                            placeholder="9847353775"
                            maxLength="10"
                            value={getValues.emergency_contact}

                          />
                          <small className="invalid-feedback">
                            {errors.emergency_contact?.message}
                          </small>
                        </div>
                        <label className="col-sm-2 col-form-label">
                          Email Id:
                        </label>
                        <div className="col-sm-2">
                          <input
                            name="email"
                            className={classNames("form-control", {
                              "is-invalid": errors.email,
                            })}
                            {...register("email", {
                              value: getValues.email,
                            })}
                            onChange={inputEvent}
                            placeholder="example@gmail.com"
                            maxLength="20"
                            value={getValues.email}
                          />
                          <small className="invalid-feedback">
                            {errors.email?.message}
                          </small>
                        </div>
                        {/* <label className="col-sm-2 col-form-label">
                          Father Name
                        </label>
                        <div className="col-sm-2">
                          <input
                            name="father_name"
                            className={classNames("form-control", {
                              "is-invalid": errors.father_name,
                            })}
                            {...register("father_name", {
                              value: getValues.father_name,
                            })}
                            onChange={inputEvent}
                            placeholder="5643"
                            maxLength="20"
                          />
                          <small className="invalid-feedback">
                            {errors.father_name?.message}
                          </small>
                        </div> */}

                      </div>
                    </div>
                    {/* <div className="card-body registrationCard">
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          DOB
                        </label>
                        <div className="col-sm-2 ">
                          <input
                            type="date"
                            name="date_of_birth"
                            className="form-control"
                            {...register("date_of_birth", {
                              value: getValues.date_of_birth,
                            })}
                            onChange={inputEvent}
                            placeholder=""
                          />
                        </div>
                        <label className="col-sm-2 col-form-label">
                          Gender
                        </label>
                        <div className="col-sm-2">
                          <select
                            className="form-control"
                            {...register("gender", {
                              value: getValues.gender,
                            })}
                            onChange={inputEvent}
                            name="gender"
                          >
                            <option value="">--Select--</option>
                            <option value="male"> Male</option>
                            <option value="female">Female</option>
                            <option value="transgender">Transgender</option>

                          </select>
                        </div>
                        <label className="col-sm-2 col-form-label">
                          Location
                        </label>
                        <div className="col-sm-2">
                          <select
                            className="form-control"
                            {...register("location", {
                              value: getValues.location,
                            })}
                            onChange={inputEvent}
                            name="location"
                          >
                            <option value="">--Select--</option>
                            <option value="Gurugram"> Gurugram</option>
                            <option value="Pune">Pune</option>


                          </select>
                        </div>
                      </div>
                    </div> */}

                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        <lable className="col-sm-2 col-form-label">
                          Calling Code
                        </lable>
                        <div className="col-sm-2">
                          <select
                            className="form-control"
                            // className={classNames("form-control", {
                            //   "is-invalid": errors.country_calling_code_id,
                            // })}
                            {...register("country_calling_code_id", {
                              value: getValues.country_calling_code_id,
                            })}
                            onChange={inputEvent}
                            name="country_calling_code_id"
                            value={getValues.country_calling_code_id}
                          >
                            <option value="">--Select--</option>
                            <option value="1">91</option>
                            <option value="2">92</option>
                            <option value="3">93</option>

                          </select>
                        </div>
                        <label className="col-sm-2 col-form-label">
                          Phone
                        </label>
                        <div className="col-sm-2">
                          <input
                            name="phone"
                            className={classNames("form-control", {
                              "is-invalid": errors.phone,
                            })}
                            {...register("phone", {
                              value: getValues.phone,
                            })}
                            onChange={inputEvent}
                            placeholder="Enter Phone Number"
                            maxLength="10"
                            value={getValues.phone}
                          />
                          <small className="invalid-feedback">
                            {errors.phone?.message}
                          </small>
                        </div>
                        {/* <label className="col-sm-2 col-form-label">
                          Job Id:
                        </label>
                        <div className="col-sm-2">
                          <input
                            name="job_id"
                            className="form-control"
                           
                            {...register("job_id", {
                              value: getValues.job_id,
                            })}
                            onChange={inputEvent}
                            placeholder="5643"
                            maxLength="20"
                          />
                          
                        </div> */}
                        <label className="col-sm-2 col-form-label">
                          Alternate Email
                        </label>
                        <div className="col-sm-2">
                          <input
                            name="alt_email"
                            className={classNames("form-control", {
                              "is-invalid": errors.email,
                            })}
                            {...register("alt_email", {
                              value: getValues.alt_email,
                            })}
                            onChange={inputEvent}
                            placeholder="example@gmail.com"
                            value={getValues.email}

                          />
                          <small className="invalid-feedback">
                            {errors.email?.message}
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          LinkedIn
                        </label>
                        <div className="col-sm-10 ">
                          <input
                            type="text"
                            className="form-control"
                            // className={classNames("form-control", {
                            //   "is-invalid": errors.linkedin,
                            // })}
                            {...register("linkedin", {
                              value: getValues.linkedin,
                            })}
                            onChange={inputEvent}
                            placeholder="Enter your linkedin profile here"
                            maxLength="20"
                            value={getValues.linkedin}

                          />
                          {/* <small className="invalid-feedback">
                            {errors.linkedin?.message}
                          </small> */}
                        </div>
                      </div>
                    </div>
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        {/* <label className="col-sm-2 col-form-label">Permanent Address</label> */}
                        <label className="col-sm-2 col-form-label">Mailing Address</label>
                        <div className="col-sm-10">
                          <textarea
                            className="form-control"
                            // className={classNames("form-control", {
                            //   "is-invalid": errors.permanent_address,
                            // })}
                            {...register("permanent_address", {
                              value: getValues.permanent_address,
                            })}
                            type="text"
                            name="permanent_address"
                            value={getValues.permanent_address}
                            onChange={inputEvent}
                            placeholder=""
                            id="permanent_address" />
                        </div>
                      </div>
                    </div>

                    {/* <div className="card-body registrationCard">
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Comunication Address</label>
                        <div className="col-sm-10">
                          <textarea
                            className="form-control"
                            {...register("communication", {
                              value: getValues.communication,
                            })}
                            type="text"
                            name="communication"
                            onChange={inputEvent}
                            placeholder=""
                          />
                        </div>
                      </div>
                    </div> */}

                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        <lable className="col-sm-2 col-form-lable">
                          Country
                        </lable>
                        <div className="col-sm-2">
                          <select
                            className="form-control"
                            // className={classNames("form-control", {
                            //   "is-invalid": errors.country_id,
                            // })}
                            {...register("country_id", {
                              value: getValues.country_id,
                            })}
                            onChange={inputEvent}
                            name="country_id"
                            value={getValues.country_id}
                          >
                            <option value="">--Select--</option>
                            <option value="0"> India</option>
                            <option value="1">America</option>
                            <option value="2">Japan</option>
                          </select>
                        </div>
                        <lable className="col-sm-2 col-form-lable">
                          State
                        </lable>
                        <div className="col-sm-2">
                          <select
                            className="form-control"
                            // className={classNames("form-control", {
                            //   "is-invalid": errors.state_id,
                            // })}
                            {...register("state_id", {
                              value: getValues.state_id,
                            })}
                            onChange={inputEvent}
                            name="state_id"
                            value={getValues.state_id}
                          >
                            <option value="">--Select--</option>
                            <option value="1"> Maharashtra</option>
                            <option value="2">Andhra Pradesh</option>
                            <option value="3">Zarkhand</option>
                          </select>
                        </div>

                        <lable className="col-sm-2 col-form-lable">
                          City
                        </lable>
                        <div className="col-sm-2">
                          <select
                            className="form-control"
                            // className={classNames("form-control", {
                            //   "is-invalid": errors.city_id,
                            // })}
                            {...register("city_id", {
                              value: getValues.city_id,
                            })}
                            onChange={inputEvent}
                            name="city_id"
                            value={getValues.city_id}
                          >
                            <option value="">--Select--</option>
                            <option value="0"> Pune</option>
                            <option value="1">Nasik</option>
                            <option value="3">Mumbai</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Zip Code
                        </label>

                        <div className="col-sm-2">
                          <input
                            name="zip_code"
                            className="form-control"
                            // className={classNames("form-control", {
                            //   "is-invalid": errors.esi_ip_number,
                            // })}
                            {...register("zip_code", {
                              value: getValues.zip_code,
                            })}
                            onChange={inputEvent}
                            placeholder="5643"
                            maxLength="20"
                            value={getValues.zip_code}
                          />
                          {/* <small className="invalid-feedback">
                            {errors.esi_ip_number?.message}
                          </small> */}
                        </div>
                      </div>
                    </div>
                    {/* <div>
                      <div className="card-body registrationCard">
                        <div className="form-group row">
                          <label className="col-md-12 col-form-label">
                            Emergency Contact
                          </label>
                        </div>
                      </div>
                      <div className="card-body registrationCard">
                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label">
                            Name
                          </label>
                          <div className="col-sm-2">
                            <input
                              className="form-control"
                              {...register("emergency_contact_name", {
                                value: getValues.emergency_contact_name,
                              })}
                              onChange={inputEvent}
                              placeholder="Enter the Name"
                              maxLength="20"
                            />
                          </div>
                          <label className="col-sm-2 col-form-label">
                            Relation

                          </label>
                          <div className="col-sm-2">
                            <input
                              name="emergency_contact_relationship"
                              className="form-control"
                              {...register("emergency_contact_relationship", {
                                value: getValues.emergency_contact_relationship,
                              })}
                              onChange={inputEvent}
                              placeholder="Enter Relation"
                              maxLength="20"
                            />
                          </div>

                        </div>
                      </div>
                      <div className="card-body registrationCard">
                        <div className="form-group row">
                          <label className="col-sm-12 col-form-label">
                            Medical History
                          </label>
                        </div>
                      </div>
                      <div className="card-body registrationCard">
                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label">
                            Blood Group
                          </label>
                          <div className="col-sm-2">
                            <input
                              className="form-control"
                              {...register("blood_group", {
                                value: getValues.blood_group,
                              })}
                              onChange={inputEvent}
                              placeholder="Enter Blood Group"
                              maxLength="20"
                            />
                          </div>
                          <label className="col-sm-2 col-form-label">
                            History/medical_history/Drugs
                          </label>
                          <div className="col-sm-2">
                            <input
                              name="medical_history"
                              className="form-control"
                              {...register("medical_history", {
                                value: getValues.medical_history,
                              })}
                              onChange={inputEvent}
                              placeholder="Enter History"
                              maxLength="20"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="card-body registrationCard">
                        <div className="form-group row">
                      
                          <label className="col-sm-2 col-form-label">
                            Open to Relocate
                          </label>
                          <div className="col-md-2">
                            <select
                              className="form-control"
                              {...register("open_to_relocate", {
                                value: getValues.open_to_relocate,
                              })}
                              onChange={inputEvent}
                              name="open_to_relocate"
                            >
                              <option value="">--Select--</option>
                              <option value="0"> Yes</option>
                              <option value="1">No</option>
                              <option value="3">After Pandamic </option>

                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="card-body registrationCard">
                        <div className="form-group row">

                          <label className="col-sm-2 col-form-label">
                            Submitted Date
                          </label>
                          <div className="col-sm-2 ">
                            <input
                              type="date"
                              className="form-control"
                              name="submitted_datetime"
                              {...register("submitted_datetime", {
                                value: getValues.submitted_datetime,
                              })}
                              onChange={inputEvent}
                              placeholder=""
                            />
                          </div>
                          <label className="col-sm-2 col-form-label">
                            Source
                          </label>
                          <div className="col-sm-2">
                            <input
                              name="source"
                              className="form-control"
                              {...register("source", {
                                value: getValues.source,
                              })}
                              onChange={inputEvent}
                              placeholder=" Enter Source"
                              maxLength="20"
                            />
                          </div>
                          <label className="col-sm-2 col-form-label">
                            PF UNA Number
                          </label>
                          <div className="col-sm-2">
                            <input
                              className="form-control"
                              {...register("uan_number", {
                                value: getValues.uan_number,
                              })}
                              onChange={inputEvent}
                              placeholder="Enter PF UNA "
                              maxLength="10"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="card-body registrationCard">
                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label">
                            ESI IP Number
                          </label>

                          <div className="col-sm-2">
                            <input
                              name="esi_ip_number"
                              className="form-control"
                              {...register("esi_ip_number", {
                                value: getValues.esi_ip_number,
                              })}
                              onChange={inputEvent}
                              placeholder="5643"
                              maxLength="20"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="card-body registrationCard">
                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label">Remark</label>
                          <div className="col-sm-10">
                            <textarea
                              className="form-control"
                              {...register("remarks", {
                                value: getValues.remarks,
                              })}
                              type="text"
                              name="remarks"
                              onChange={inputEvent}
                              placeholder=" remark here"
                              id="remarks" />
                          </div>
                        </div>
                      </div>
                      <div className="card-body registrationCard">
                        <div className="form-group row">
                          <label className="col-md-2 col-form-label">
                            Documents
                          </label>
                        </div>
                      </div>
                      <div className="card-body registrationCard">
                        <div className="form-group row">

                          <label className="col-sm-2 col-form-label">
                            PAN Number<span style={{ color: "red", fontSize: 15 }}>*</span>
                          </label>
                          <div className="col-sm-2">
                            <input
                              name="pan_number"
                              className={classNames("form-control", {
                                "is-invalid": errors.pan_number,
                              })}
                              {...register("pan_number", {
                                value: getValues.pan_number,
                              })}
                              onChange={inputEvent}
                              placeholder="GDPER8436P"
                              maxLength="20"
                            />
                            <small className="invalid-feedback">
                              {errors.pan_number?.message}
                            </small>
                          </div>
                          <label className="col-sm-2 col-form-label">
                            Upload<span style={{ color: "red", fontSize: 15 }}>*</span>
                          </label>
                          <div className="col-sm-4">
                            <input
                              type="file"
                              className={classNames("form-control", {
                                "is-invalid": errors.pan_file,
                              })}
                              {...register("pan_file", {
                                value: getValues.pan_file,
                              })}
                              onChange={panstore}
                              name="pan_file"
                              id="pan_file" style={{ paddingTop: "0px" }} />
                            <small className="invalid-feedback">
                              {errors.pan_file?.message}
                            </small>
                          </div>

                          <div className="card-body registrationCard">
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Aadhar Number<span style={{ color: "red", fontSize: 15 }}>*</span>
                              </label>
                              <div className="col-sm-2">
                                <input
                                  name="adhaar_number"
                                  className={classNames("form-control", {
                                    "is-invalid": errors.adhaar_number,
                                  })}
                                  {...register("adhaar_number", {
                                    value: getValues.adhaar_number,
                                  })}
                                  onChange={inputEvent}
                                  placeholder="Enter Aadhar Number"
                                  maxLength="12"
                                />
                                <small className="invalid-feedback">
                                  {errors.adhaar_number?.message}
                                </small>
                              </div>
                              <label className="col-sm-2 col-form-label">
                                Upload<span style={{ color: "red", fontSize: 15 }}>*</span>
                              </label>
                              <div className="col-sm-4">
                                <input
                                  type="file"
                                  className={classNames("form-control", {
                                    "is-invalid": errors.aadhar_file,
                                  })}
                                  {...register("aadhar_file", {
                                    value: getValues.aadhar_file,
                                  })}
                                  onChange={aadharstore}
                                  name="aadhar_file"
                                  id="aadhar_file" style={{ paddingTop: "0px" }} />
                                <small className="invalid-feedback">
                                  {errors.aadhar_file?.message}
                                </small>
                              </div>


                            </div>
                          </div>



                          <div className="card-body registrationCard">
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Passport Number
                              </label>
                              <div className="col-sm-2">
                                <input
                                  type="text"
                                  name="passport"
                                  className="form-control"
                                  {...register("passport", {
                                    value: getValues.passport,
                                  })}
                                  onChange={inputEvent}
                                  placeholder="9847353775"
                                  maxLength="20"
                                />
                              </div>
                              <label className="col-sm-2 col-form-label">
                                Validity
                              </label>
                              <div className="col-sm-2 ">
                                <input
                                  type="date"
                                  className="form-control"
                                  name="passport_validity"
                                  
                                  {...register("passport_validity", {
                                    value: getValues.passport_validity,
                                  })}
                                  onChange={inputEvent}
                                  placeholder=""
                                  maxLength="20"
                                />
                                
                              </div>
                              <label className="col-sm-1 col-form-label">
                                Upload
                              </label>
                              <div className="col-sm-3">
                                <input
                                  type="file"
                                  className="form-control"
                                  onChange={inputEvent}
                                  name="passport_file"
                                  id="passport_file" style={{ paddingTop: "0px" }} />
                              </div>

                            </div>
                          </div>


                        </div>
                      </div>
                      <div className="card-body registrationCard">
                        <div className="form-group row">
                          <label className="col-md-12 col-form-label">
                            New Salary Bank Detail
                          </label>
                        </div>
                      </div>
                      <div className="card-body registrationCard">
                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label">
                            Bank Name
                          </label>
                          <div className="col-sm-2">
                            <input
                              className="form-control"
                              
                              {...register("bank_name", {
                                value: getValues.bank_name,
                              })}
                              onChange={inputEvent}
                              placeholder="Enter Bank Name"
                              maxLength="20"
                            />
                            
                          </div>
                          <label className="col-sm-2 col-form-label">
                            Branch Name
                          </label>
                          <div className="col-sm-2">
                            <input
                              className="form-control"
                             
                              {...register("branch", {
                                value: getValues.branch,
                              })}
                              onChange={inputEvent}
                              placeholder="Enter branch Name"
                              maxLength="20"
                            />
                            
                          </div>
                          <label className="col-sm-2 col-form-label">
                            Account Name
                          </label>
                          <div className="col-sm-2">
                            <input
                              name="account_name"
                              className="form-control" F
                             
                              {...register("account_name", {
                                value: getValues.account_name,
                              })}
                              onChange={inputEvent}
                              placeholder="Enter Account Holder"
                              maxLength="20"
                            />
                            
                          </div>
                        </div>
                      </div>
                      <div className="card-body registrationCard">
                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label">
                            Account Number
                          </label>
                          <div className="col-sm-2">
                            <input
                              type="text"
                              className={classNames("form-control", {
                                "is-invalid": errors.account_number,
                              })}
                              {...register("account_number", {
                                value: getValues.account_number,
                              })}
                              onChange={inputEvent}
                              placeholder="9847353775"
                              maxLength="20"
                            />
                            <small className="invalid-feedback">
                              {errors.account_number?.message}
                            </small>
                          </div>
                          <label className="col-sm-2 col-form-label">
                            IFSC Code
                          </label>
                          <div className="col-sm-2">
                            <input
                              type="text"
                              name="ifsc_code"
                              className={classNames("form-control", {
                                "is-invalid": errors.ifsc_code,
                              })}
                              {...register("ifsc_code", {
                                value: getValues.ifsc_code,
                              })}
                              onChange={inputEvent}
                              placeholder="HDFC0537751"
                              maxLength="20"
                            />
                            <small className="invalid-feedback">
                              {errors.ifsc_code?.message}
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="card-body registrationCard">
                        <div className="form-group row">
                          <label className="col-md-12 col-form-label">
                            Old Bank Detail
                          </label>
                        </div>
                      </div>
                      <div className="card-body registrationCard">
                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label">
                            Old Bank Name
                          </label>
                          <div className="col-sm-2">
                            <input
                              className="form-control"
                            
                              {...register("old_bank_name", {
                                value: getValues.old_bank_name,
                              })}
                              onChange={inputEvent}
                              placeholder="Enter Bank Name"
                              maxLength="20"
                            />
                           
                          </div>
                          <label className="col-sm-2 col-form-label">
                            Old Branch Name
                          </label>
                          <div className="col-sm-2">
                            <input
                              className="form-control"
                             
                              {...register("old_bank_branch", {
                                value: getValues.old_bank_branch,
                              })}
                              onChange={inputEvent}
                              placeholder="Enter Branch Name"
                              maxLength="20"
                            />
                           
                          </div>
                          <label className="col-sm-2 col-form-label">
                            Old Account name
                          </label>
                          <div className="col-sm-2">
                            <input
                              type="text"
                              className="form-control"
                              
                              {...register("old_account_name", {
                                value: getValues.old_account_name,
                              })}
                              onChange={inputEvent}
                              placeholder="Enter Account  Holder"
                              maxLength="20"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="card-body registrationCard">
                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label">
                            Old Account Number
                          </label>
                          <div className="col-sm-2">
                            <input
                              type="text"
                              name="old_account_number"
                              className={classNames("form-control", {
                                "is-invalid": errors.old_account_number,
                              })}
                              {...register("old_account_number", {
                                value: getValues.old_account_number,
                              })}
                              onChange={inputEvent}
                              placeholder="9847353775"
                              maxLength="20"
                            />
                            <small className="invalid-feedback">
                              {errors.old_account_number?.message}
                            </small>
                          </div>
                          <label className="col-sm-2 col-form-label">
                            Old IFSC Code
                          </label>
                          <div className="col-sm-2">
                            <input
                              type="text"
                              name="old_ifsc_code"
                              className={classNames("form-control", {
                                "is-invalid": errors.old_ifsc_code,
                              })}
                              {...register("old_ifsc_code", {
                                value: getValues.old_ifsc_code,
                              })}
                              onChange={inputEvent}
                              placeholder="ICIC0567654"
                              maxLength="20"
                            />
                            <small className="invalid-feedback">
                              {errors.old_ifsc_code?.message}
                            </small>
                          </div>
                        </div>
                      </div>

                    </div> */}

                  </div>
                </div>
              </div>
            </div>

            {/*=========> Profile Summary Component  ==========>*/}

            <div>
              <h4>Profile Summary</h4>

              <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          HeadLine
                        </label>
                        <div className="col-sm-10">
                          <input
                            name="headline"
                            className="form-control"
                            // className={classNames("form-control", {
                            //   "is-invalid": errors.esi_ip_number,
                            // })}
                            {...register("headline", {
                              value: getValues.headline,
                            })}
                            onChange={inputEvent}
                            placeholder="Your Profile Headline here..."
                            value={getValues.headline}
                          />
                          {/* <small className="invalid-feedback">
                            {errors.esi_ip_number?.message}
                          </small> */}
                        </div>
                      </div>
                    </div>
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Total Exp Yrs
                        </label>
                        <div className="col-md-2">
                          <select
                            className="form-control"
                            // className={classNames("form-control", {
                            //   "is-invalid": errors.experience_years,
                            // })}
                            {...register("experience_years", {
                              value: getValues.experience_years,
                            })}
                            onChange={inputEvent}
                            name="experience_years"
                            value={getValues.experience_years}
                          >
                            <option value="">--Select--</option>
                            <option value="0"> 1</option>
                            <option value="1">2 </option>
                            <option value="2">3 </option>
                            <option value="4">4 </option>
                            <option value="5">5 </option>
                            <option value="6">6 </option>

                          </select>
                        </div>
                        <label className="col-sm-2 col-form-label">
                          Total Exp Mon
                        </label>
                        <div className="col-md-2">
                          <select
                            className="form-control"
                            // className={classNames("form-control", {
                            //   "is-invalid": errors.experience_months,
                            // })}
                            {...register("experience_months", {
                              value: getValues.experience_months,
                            })}
                            onChange={inputEvent}
                            name="experience_months"
                            value={getValues.experience_months}
                          >
                            <option value="">--Select--</option>
                            <option value="0"> 1</option>
                            <option value="1">2 </option>
                            <option value="2">3 </option>
                            <option value="3">4 </option>
                            <option value="4">5 </option>
                            <option value="5">6 </option>

                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Resume:
                          {/* Resume: <DriveFolderUploadIcon className="icon"/>  */}
                        </label>
                        {/* <section className="container">
                            <div {...getRootProps({className: 'dropzone'})}>
                              <input {...getInputProps()} />
                              <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                            <aside>
                              <h4>Files</h4>
                              <ul>{files}</ul>
                            </aside>
                        </section> */}

                        <label htmlFor="file">Choose file to upload</label>
                        <input type="file"
                          className={classNames("form-control", {
                            "is-invalid": errors.cv,
                          })}
                          id="cv" onChange={filestore}
                          // value={getValues.cv}

                          name="cv" multiple />
                        <small className="invalid-feedback">
                          {errors.cv?.message}
                        </small>

                        {/* <input
                          type="file"
                          className="form-control"
                          // className={classNames("form-control", {
                          //   "is-invalid": errors.cv,
                          // })}
                          {...register("cv", {
                            value: getValues.cv,
                          })}
                          // onChange={(e) => filestore(e)}
                          onChange={filestore}
                          // value={getValues.cv}
                          name="cv"
                          id="cv" style={{ paddingTop: "0px" }} /> */}
                      </div>&nbsp;&nbsp;&nbsp;
                    </div>
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Industry
                        </label>
                        <div className="col-sm-2">
                          <select
                            className="form-control"
                            // className={classNames("form-control", {
                            //   "is-invalid": errors.industry_id,
                            // })}
                            {...register("industry_id", {
                              value: getValues.industry_id,
                            })}
                            onChange={inputEvent}
                            name="industry_id"
                            value={getValues.industry_id}
                          >
                            <option value="">--Select--</option>
                            <option value="0"> Infoces</option>
                            <option value="1">Synecron</option>
                            <option value="3">IBM</option>

                          </select>
                        </div>
                        <label className="col-sm-2 col-form-label">
                          Other Industry
                        </label>
                        <div className="col-sm-2 ">
                          <input
                            type="text"
                            className="form-control"
                            // className={classNames("form-control", {
                            //   "is-invalid": errors.other_industry,
                            // })}
                            {...register("other_industry", {
                              value: getValues.other_industry,
                            })}
                            onChange={inputEvent}
                            placeholder="Enter Industry Name"
                            maxLength="20"
                            value={getValues.other_industry}
                          />
                          {/* <small className="invalid-feedback">
                            {errors.other_industry?.message}
                          </small> */}
                        </div>

                      </div>
                    </div>
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        {/* <label className="col-sm-2 col-form-label">Permanent Address</label> */}
                        <label className="col-sm-2 col-form-label">Summary</label>
                        <div className="col-sm-10">
                          <textarea
                            className="form-control"
                            // className={classNames("form-control", {
                            //   "is-invalid": errors.permanent_address,
                            // })}
                            {...register("summary", {
                              value: getValues.summary,
                            })}
                            type="text"
                            name="summary"
                            value={getValues.permanent_address}
                            onChange={inputEvent}
                            placeholder=""
                            id="summary" />
                        </div>
                      </div>
                    </div>
                    {/* <div>
                      <div className="card-body registrationCard">
                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label">
                            Designation
                          </label>
                          <div className="col-sm-2">
                            <input
                              className="form-control"
                              
                              {...register("designation", {
                                value: getValues.designation,
                              })}
                              onChange={inputEvent}
                              placeholder="Enter the designation"
                              maxLength="20"
                            />
                            
                          </div>
                          <label className="col-sm-2 col-form-label">
                            Department
                          </label>
                          <div className="col-sm-2">
                            <select
                              className="form-control"
                              
                              {...register("prf_department", {
                                value: getValues.prf_department,
                              })}
                              onChange={inputEvent}
                              name="prf_department"
                            >
                              <option value="">--Select--</option>
                              <option value="0"> Development</option>
                              <option value="1">Management</option>
                              <option value="3">R&D</option>

                            </select>
                            
                          </div>
                          <label className="col-sm-2 col-form-label">
                          Joining Date
                        </label>
                        <div className="col-sm-2 ">
                          <input
                            type="date"
                            className="form-control"
                            
                            {...register("prf_joining_date", {
                              value: getValues.prf_joining_date,
                            })}
                            onChange={inputEvent}
                            placeholder="Enter First Name"
                            maxLength="20"
                          />
                          
                        </div>
                        </div>
                      </div>
                      <div className="card-body registrationCard">
                        <div className="form-group row">
                          <lable className="col-sm-2 col-form-lable">
                            Group Health Insurance
                          </lable>
                          <div className="col-sm-2">
                            <select
                              className="form-control"
                             
                              {...register("prf_group_health_insurance", {
                                value: getValues.prf_group_health_insurance,
                              })}
                              onChange={inputEvent}
                              name="prf_group_health_insurance"
                            >
                              <option value="">--Select--</option>
                              <option value="0"> Yes</option>
                              <option value="1">No</option>
                            </select>
                          </div>
                          <lable className="col-sm-2 col-form-lable">
                            AceNet Assets
                          </lable>
                          <div className="col-sm-2">
                            <select
                              className="form-control"
                             
                              {...register("prf_acenet_asset", {
                                value: getValues.prf_acenet_asset,
                              })}
                              onChange={inputEvent}
                              name="prf_acenet_asset"
                            >
                              <option value="">--Select--</option>
                              <option value="0"> Yes</option>
                              <option value="1">No</option>

                            </select>
                          </div>

                          <lable className="col-sm-2 col-form-lable">
                            Client Assets
                          </lable>
                          <div className="col-sm-2">
                            <select
                              className="form-control"
                              
                              {...register("prf_client_asset", {
                                value: getValues.prf_client_asset,
                              })}
                              onChange={inputEvent}
                              name="prf_client_asset"
                            >
                              <option value="">--Select--</option>
                              <option value="0"> Yes</option>
                              <option value="1">No</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="card-body registrationCard">
                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label">
                            Client Name
                          </label>
                          <div className="col-sm-2">
                            <input
                              className="form-control"
                              
                              {...register("prf_client_name", {
                                value: getValues.prf_client_name,
                              })}
                              onChange={inputEvent}
                              placeholder="Enter the Name"
                              maxLength="20"
                            />
                            
                          </div>
                          <label className="col-sm-2 col-form-label">
                            Initiation Date
                          </label>
                          <div className="col-sm-2 ">
                            <input
                              type="date"
                              className="form-control"
                            
                              {...register("prf_inititation_date", {
                                value: getValues.prf_inititation_date,
                              })}
                              onChange={inputEvent}
                              placeholder="Enter Date here"
                            />
                            
                          </div>
                          <label className="col-sm-2 col-form-label">
                            Report Date
                          </label>
                          <div className="col-sm-2 ">
                            <input
                              type="date"
                              className="form-control"
                              name="prf_report_date"
                              
                              {...register("prf_report_date", {
                                value: getValues.prf_report_date,
                              })}
                              onChange={inputEvent}
                              placeholder="Enter First Name"
                              maxLength="20"
                            />
                            
                          </div>
                        </div>
                      </div>
                      <div className="card-body registrationCard">
                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label">
                            Agency Name
                          </label>
                          <div className="col-sm-2">
                            <input
                              className="form-control"
                              
                              {...register("prf_agency", {
                                value: getValues.prf_agency,
                              })}
                              onChange={inputEvent}
                              placeholder="Enter the Agency Name"
                              maxLength="20"
                            />
                            
                          </div>
                          <label className="col-sm-2 col-form-label">
                            Submission Date
                          </label>
                          <div className="col-sm-2 ">
                            <input
                              type="date"
                              name="prf_submission_date"
                              className="form-control"
                              
                              {...register("prf_submission_date", {
                                value: getValues.prf_submission_date,
                              })}
                              onChange={inputEvent}
                            />
                            
                          </div>
                          <label className="col-sm-2 col-form-label">
                          Exit Date
                        </label>
                        <div className="col-sm-2 ">
                          <input
                            type="date"
                            name=" prf_exit_date"
                            className="form-control"
                            
                            {...register("prf_exit_date", {
                              value: getValues.prf_exit_date,
                            })}
                            onChange={inputEvent}
                            placeholder=""
                            maxLength="20"
                          />
                          
                        </div>
                        </div>
                      </div>
                      <div className="card-body registrationCard">
                        <div className="form-group row">
                          <lable className="col-sm-2 col-form-lable">
                            Form 16(FY 22-23)
                          </lable>
                          <div className="col-sm-2">
                            <select
                              className="form-control"
                              
                              {...register("prf_form_16", {
                                value: getValues.prf_form_16,
                              })}
                              onChange={inputEvent}
                              name="prf_form_16"
                            >
                              <option value="">--Select--</option>
                              <option value="0"> Yes</option>
                              <option value="1">No</option>
                            </select>
                          </div>
                          <lable className="col-sm-2 col-form-lable">
                            Covid Certificate
                          </lable>
                          <div className="col-sm-2">
                            <select
                              className="form-control"
                             
                              {...register("prf_covid_certificate", {
                                value: getValues.prf_covid_certificate,
                              })}
                              onChange={inputEvent}
                              name="prf_covid_certificate"
                            >
                              <option value="">--Select--</option>
                              <option value="0"> Yes</option>
                              <option value="1">No</option>

                            </select>
                          </div>

                          <lable className="col-sm-2 col-form-lable">
                            BGV Status
                          </lable>
                          <div className="col-sm-2">
                            <select
                              className="form-control"
                              
                              {...register("prf_bgv_certificate", {
                                value: getValues.prf_bgv_certificate,
                              })}
                              onChange={inputEvent}
                              name="prf_bgv_certificate"
                            >
                              <option value="">--Select--</option>
                              <option value="0"> Pending </option>
                              <option value="1">Done</option>
                              <option value="2">Not Done</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            {/*=========> Experience Information Component  ==========>*/}

            <div>
              <h4>Experiencs Details</h4>

              <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Role
                        </label>
                        <div className="col-sm-10 ">
                          <input
                            type="text"
                            name="role"
                            className="form-control"
                            {...register("role", {
                              value: getValues.role,
                            })}
                            value={getValues.role}
                            // placeholder=" Frontend Developer"
                            onChange={inputEvent}
                          />
                          <small className="invalid-feedback">
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Organization
                        </label>
                        <div className="col-sm-10 ">
                          <input
                            type="text"
                            name="organization"
                            className="form-control"
                            {...register("organization", {
                              value: getValues.organization,
                            })}
                            value={getValues.organization}
                            // placeholder=" ABC LTD."
                            onChange={inputEvent}
                          />
                          <small className="invalid-feedback">
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        <div className="col-md-12">
                          <div style={{ marginTop: '5px' }} className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="currently_working"
                              // onChange={inputEvent}
                              onChange={(e)=>{setGetValues({...getValues,currently_working:e.target.checked})}}
                              // {...register("currently_working", {
                              //   value: getValues.currently_working,
                              // })}
                              // value={getValues.currently_working}
                              id="currently_working"
                            />
                            <label className="form-check-label" for="flexCheckDefault">
                              I am currently working in this role
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Start Date
                        </label>
                        <div className="col-sm-3 ">
                          <input
                            type="date"
                            className="form-control"

                            {...register("prf_joining_date", {
                              value: getValues.prf_joining_date,
                            })}
                            onChange={inputEvent}
                            value={getValues.prf_joining_date}
                          />
                        </div>
                        <label className="col-sm-2 col-form-label">
                          End Date
                        </label>
                        <div className="col-sm-3 ">
                          <input
                            type="date"
                            className="form-control"

                            {...register("prf_exit_date", {
                              value: getValues.prf_exit_date,
                            })}
                            onChange={inputEvent}
                            value={getValues.prf_exit_date}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        {/* <label className="col-sm-2 col-form-label">Permanent Address</label> */}
                        <label className="col-sm-2 col-form-label">Details</label>
                        <div className="col-sm-10">
                          <textarea
                            className="form-control"
                            // className={classNames("form-control", {
                            //   "is-invalid": errors.permanent_address,
                            // })}
                            {...register("exp_details", {
                              value: getValues.exp_details,
                            })}
                            type="text"
                            name="exp_details"
                            value={getValues.exp_details}
                            onChange={inputEvent}
                            placeholder=""
                            id="exp_details" />
                        </div>
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            </div>

            {/*=========> Educational Information Component  ==========>*/}

            <div>
              <h4>Education Details</h4>

              <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Degree
                        </label>
                        <div className="col-sm-10 ">
                          <input
                            type="text"
                            name="education"
                            className="form-control"
                            {...register("education", {
                              value: getValues.education,
                            })}
                            value={getValues.education}
                            // placeholder=" BCA"
                            onChange={inputEvent}
                          />
                          <small className="invalid-feedback">
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Univercity
                        </label>
                        <div className="col-sm-10 ">
                          <input
                            type="text"
                            name="univercity"
                            className="form-control"
                            {...register("univercity", {
                              value: getValues.univercity,
                            })}
                            value={getValues.univercity}
                            // placeholder=" ABC LTD."
                            onChange={inputEvent}
                          />
                          <small className="invalid-feedback">
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        <div className="col-md-12">
                          <div style={{ marginTop: '5px' }} className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="currently_enroled"
                              onChange={inputEvent}
                              {...register("currently_enroled", {
                                value: getValues.currently_enroled,
                              })}
                              value={getValues.currently_enroled}
                              id="currently_enroled"
                            />
                            <label className="form-check-label" for="flexCheckDefault">
                              I am currently enrolled
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Start Date
                        </label>
                        <div className="col-sm-3 ">
                          <input
                            type="date"
                            className="form-control"
                            name="edu_start_date"
                            {...register("edu_start_date", {
                              value: getValues.edu_start_date,
                            })}
                            onChange={inputEvent}
                            value={getValues.edu_start_date}
                          />
                        </div>
                        <label className="col-sm-2 col-form-label">
                          End Date
                        </label>
                        <div className="col-sm-3 ">
                          <input
                            type="date"
                            className="form-control"
                            name="edu_end_date"
                            {...register("edu_end_date", {
                              value: getValues.edu_end_date,
                            })}
                            onChange={inputEvent}
                            value={getValues.edu_end_date}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        {/* <label className="col-sm-2 col-form-label">Permanent Address</label> */}
                        <label className="col-sm-2 col-form-label">Details</label>
                        <div className="col-sm-10">
                          <textarea
                            className="form-control"
                            // className={classNames("form-control", {
                            //   "is-invalid": errors.permanent_address,
                            // })}
                            {...register("details", {
                              value: getValues.details,
                            })}
                            type="text"
                            name="details"
                            value={getValues.details}
                            onChange={inputEvent}
                            placeholder=""
                            id="details" />
                        </div>
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            </div>

            {/*=========> Certification Information Component  ==========>*/}

            <div>
              <h4>Certification Details</h4>

              <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Certification
                        </label>
                        <div className="col-sm-10 ">
                          <input
                            type="text"
                            name="certification"
                            className="form-control"
                            {...register("certification", {
                              value: getValues.certification,
                            })}
                            value={getValues.certification}
                            // placeholder=" Certification in development..."
                            onChange={inputEvent}
                          />
                          <small className="invalid-feedback">
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Issuing Authority
                        </label>
                        <div className="col-sm-10 ">
                          <input
                            type="text"
                            name="isu_authority"
                            className="form-control"
                            {...register("isu_authority", {
                              value: getValues.isu_authority,
                            })}
                            value={getValues.isu_authority}
                            // placeholder=" Full authority of...."
                            onChange={inputEvent}
                          />
                          <small className="invalid-feedback">
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        <div className="col-md-12">
                          <div style={{ marginTop: '5px' }} className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="cer_exp"
                              onChange={inputEvent}
                              {...register("cer_exp", {
                                value: getValues.cer_exp,
                              })}
                              value={getValues.cer_exp}
                              id="cer_exp"
                            />
                            <label className="form-check-label" for="flexCheckDefault">
                              This certificate does not expire
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Issue Date
                        </label>
                        <div className="col-sm-3 ">
                          <input
                            type="date"
                            className="form-control"
                            name="cer_issue_date"
                            {...register("cer_issue_date", {
                              value: getValues.cer_issue_date,
                            })}
                            onChange={inputEvent}
                            value={getValues.cer_issue_date}
                          />
                        </div>
                        <label className="col-sm-2 col-form-label">
                          Expiration Date
                        </label>
                        <div className="col-sm-3 ">
                          <input
                            type="date"
                            className="form-control"
                            name="cer_expire_date"
                            {...register("cer_expire_date", {
                              value: getValues.cer_expire_date,
                            })}
                            onChange={inputEvent}
                            value={getValues.cer_expire_date}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        {/* <label className="col-sm-2 col-form-label">Permanent Address</label> */}
                        <label className="col-sm-2 col-form-label">Details</label>
                        <div className="col-sm-10">
                          <textarea
                            className="form-control"
                            // className={classNames("form-control", {
                            //   "is-invalid": errors.permanent_address,
                            // })}
                            {...register("cer_details", {
                              value: getValues.cer_details,
                            })}
                            type="text"
                            name="cer_details"
                            value={getValues.cer_details}
                            onChange={inputEvent}
                            placeholder=""
                            id="cer_details" />
                        </div>
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4>Charges and Availability Details</h4>

              <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Availability in hours
                        </label>
                        <div className="col-sm-6 ">
                          <input
                            type="text"
                            name="availability"
                            className={classNames("form-control", {
                              "is-invalid": errors.availability,
                            })}
                            {...register("availability", {
                              value: getValues.availability,
                            })}
                            onChange={inputEvent}
                            maxLength="2"
                            placeholder="48hr"
                            value={getValues.availability}
                          />
                          <small className="invalid-feedback">
                            {errors.availability?.message}
                          </small>
                        </div>


                      </div>
                    </div>
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        <div className="col-md-12">
                          <div style={{ marginTop: '5px' }} className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="weekdays"
                              onChange={inputEvent}
                              {...register("weekdays", {
                                value: getValues.weekdays,
                              })}
                              value={getValues.weekdays}
                              id="weekdays"
                            />
                            <label className="form-check-label" for="flexCheckDefault">
                              Weekdays
                            </label>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div style={{ marginTop: '5px' }} className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="weekends"
                              onChange={inputEvent}
                              {...register("weekends", {
                                value: getValues.weekends,
                              })}
                              value={getValues.weekends}
                              id="weekends"
                            />
                            <label className="form-check-label" for="flexCheckDefault">
                              Weekends
                            </label>
                          </div>
                        </div>

                      </div>
                    </div>
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                          Consulting Rate Currency
                        </label>
                        <div className="col-md-2">
                          <select
                            name="con_rate_currency"
                            className="form-control"
                            // className={classNames("form-control", {
                            //   "is-invalid": errors.con_rate_currency,
                            // })}
                            {...register("con_rate_currency", {
                              value: getValues.con_rate_currency,
                            })}
                            onChange={inputEvent}
                            value={getValues.con_rate_currency}
                          >
                            <option value="">--Select--</option>
                            <option value="1">Rupees </option>
                            <option value="2"> EURO</option>
                            <option value="3">Dollar </option>
                            <option value="4">AUD </option>

                          </select>
                        </div>
                        <label className="col-sm-2 col-form-label">
                          Consulting Rate
                        </label>
                        <div className="col-sm-2">
                          <input
                            name="con_rate"
                            className={classNames("form-control", {
                              "is-invalid": errors.con_rate,
                            })}
                            {...register("con_rate", {
                              value: getValues.con_rate,
                            })}
                            onChange={inputEvent}
                            placeholder="Enter CTC"
                            maxLength="5"
                            value={getValues.con_rate}
                          />
                          <small className="invalid-feedback">
                            {errors.con_rate?.message}
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="card-body registrationCard">
                      <div className="form-group row">
                        <div className="col-md-12">
                          <div style={{ marginTop: '5px' }} className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="open_for_travel"
                              onChange={inputEvent}
                              {...register("open_for_travel", {
                                value: getValues.open_for_travel,
                              })}
                              value={getValues.open_for_travel}
                              id="open_for_travel"
                            />
                            <label className="form-check-label" for="flexCheckDefault">
                              Open for travel
                            </label>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div style={{ marginTop: '5px' }} className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="open_to_relocate"
                              onChange={inputEvent}
                              {...register("open_to_relocate", {
                                value: getValues.open_to_relocate,
                              })}
                              value={getValues.open_to_relocate}
                              id="open_to_relocate"
                            />
                            <label className="form-check-label" for="flexCheckDefault">
                              Open for relocation
                            </label>
                          </div>
                        </div>
                        <div className="card-body registrationCard">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Current CTC Currency
                            </label>
                            <div className="col-md-2">
                              <select
                                name="current_ctc_currency_id"
                                className="form-control"
                                // className={classNames("form-control", {
                                //   "is-invalid": errors.current_ctc_currency_id,
                                // })}
                                {...register("current_ctc_currency_id", {
                                  value: getValues.current_ctc_currency_id,
                                })}
                                onChange={inputEvent}
                                value={getValues.current_ctc_currency_id}
                              >
                                <option value="">--Select--</option>
                                <option value="1">Rupees </option>
                                <option value="2"> EURO</option>
                                <option value="3">Dollar </option>
                                <option value="4">AUD </option>

                              </select>
                            </div>
                            <label className="col-sm-2 col-form-label">
                              Current CTC
                            </label>
                            <div className="col-sm-2">
                              <input
                                name="current_ctc"
                                className={classNames("form-control", {
                                  "is-invalid": errors.current_ctc,
                                })}
                                {...register("current_ctc", {
                                  value: getValues.current_ctc,
                                })}
                                onChange={inputEvent}
                                placeholder="Enter CTC"
                                maxLength="7"
                                value={getValues.current_ctc}
                              />
                              <small className="invalid-feedback">
                                {errors.current_ctc?.message}
                              </small>
                            </div>
                          </div>
                        </div>
                        <div className="card-body registrationCard">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Expected CTC Currency
                            </label>
                            <div className="col-md-2">
                              <select
                                className="form-control"
                                // className={classNames("form-control", {
                                //   "is-invalid": errors.expected_ctc_currency_id,
                                // })}
                                {...register("expected_ctc_currency_id", {
                                  value: getValues.expected_ctc_currency_id,
                                })}
                                onChange={inputEvent}
                                name="expected_ctc_currency_id"
                                value={getValues.expected_ctc_currency_id}
                              >
                                <option value="">--Select--</option>
                                <option value="0">Rupees </option>
                                <option value="1"> EURO</option>
                                <option value="2">Dollar </option>
                                <option value="3">AUD </option>

                              </select>

                            </div>
                            <label className="col-sm-2 col-form-label">
                              Expected CTC
                            </label>
                            <div className="col-sm-2">
                              <input
                                className={classNames("form-control", {
                                  "is-invalid": errors.expected_ctc,
                                })}
                                {...register("expected_ctc", {
                                  value: getValues.expected_ctc,
                                })}
                                onChange={inputEvent}
                                placeholder="Enter CTC"
                                maxLength="7"
                                value={getValues.expected_ctc}

                              />
                              <small className="invalid-feedback">
                                {errors.expected_ctc?.message}
                              </small>
                            </div>
                          </div>
                        </div>
                        <div className="card-body registrationCard">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Job Change Reason
                            </label>
                            <div className="col-md-2">
                              <select
                                className="form-control"
                                // className={classNames("form-control", {
                                //   "is-invalid": errors.job_change_reason_id,
                                // })}
                                {...register("job_change_reason_id", {
                                  value: getValues.job_change_reason_id,
                                })}
                                onChange={inputEvent}
                                name="job_change_reason_id"
                              value={getValues.job_change_reason_id}
                              >
                                <option value="">--Select--</option>
                                <option value="1"> Looking for better career prospects</option>
                                <option value="2">professional growth </option>
                                <option value="3">Work timing </option>
                                <option value="4">Overall growth and development </option>
                              </select>
                            </div>
                            <label className="col-sm-2 col-form-label">
                              Notice Period
                            </label>
                            <div className="col-md-2">
                              <select
                                className="form-control"
                                // className={classNames("form-control", {
                                //   "is-invalid": errors.notice_period,
                                // })}
                                {...register("notice_period", {
                                  value: getValues.notice_period,
                                })}
                                onChange={inputEvent}
                                name="notice_period"
                              value={getValues.notice_period}
                              >
                                <option value="">--Select--</option>
                                <option value="1"> 15 days</option>
                                <option value="2">30 days </option>
                                <option value="3">45 days </option>
                                <option value="4">60 days </option>
                                <option value="5">90 days </option>
                                <option value="6">Immediate  </option>

                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*=========> Submit Button  ==========>*/}
            <br></br>
            <div className="submitButton">
              <button
                // type="submit"
                className="btn btn-outline-success btn-icon-text btn-sm"
                onClick={onSubmit}
              >
                <i className="mdi mdi-file-check btn-icon-prepend"></i>
                Update
              </button>
            </div>
          </form>


        </div>
      </div>


    </React.Fragment>
  )
}
export default EditCandidate;



