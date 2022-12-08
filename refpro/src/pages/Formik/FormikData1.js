import React, { useEffect, useState } from "react"
import * as Yup from "yup"
import { useFormik, } from "formik"
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Select from "react-select"
import { Field } from "formik"
import axios from 'axios'
import base_url from '../../services/base_url';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
// import { DatePicker } from '@mui/lab'

// import {
//   Button,
//   Row,
// }
//    from 'react-bootstrap';
// import Form from 'react-bootstrap/Form';
import './stylesheets/formik1.css'


import {
  Card,
  Row,
  Col,
  Container,
  CardBody,
  Label,
  FormGroup,
  Form,
  Button,
  Input,
  FormFeedback,
} from "reactstrap"
import 'react-bootstrap';


import Salu from "./Salu"
import Totexp from "./Exp"
import Exp from "./Exp"

const FormikData = () => {
  const createCandidateURL = base_url + '/blog';
  // const createCandidateURL = base_url + 'candidate/create-candidate/';
  
  const [formData, setFormData] = useState();
  const MySwal = withReactContent(Swal)
  const [activeTab, setactiveTab] = useState(1)
  const [errors, setErrors] = useState({})
  
  // const [salutationData, setSalutationData] = useState([]);
  // const [noticePeriodData, setNoticePeriodData] = useState([]);
  // const [countryData, setCountryData] = useState([]);
  // const [stateData, setStateData] = useState([]);
  // const [cityData, setCityData] = useState([]);
  // const [jobChangeReasonData, setJobChangeReasonData] = useState([]);
  // const [currencyData, setCurrencyData] = useState([]);
  // const [industryData, setIndustryData] = useState([]);
  
  // const salutationUrl = base_url + 'enumsapis/salutation/';
  // const noticePeriodUrl = base_url + 'enumsapis/notice-period/';
  
  // const jobChangeReasonUrl = base_url + 'job-change-reason/';
  // const currencyUrl = base_url + 'currency/';
  // const industryUrl = base_url + 'industry/';
  
  // const countryUrl = base_url + 'country/';
  // const stateUrl = base_url + 'generalapis/country/state/39/';
  // const cityUrl = base_url + 'generalapis/country/state/city/2787/';

  // const [allData, setAllData]=useState({
    // first_name: "1",
  // middle_name: "2",
  // last_name: "3",
  // })

  // const inputEvent = (event) => {
    //   event.preventDefault()
    //   const { name, value } = event.target;
    //   setAllData((preValue) => {
      //     return {
  //       ...preValue,
  //       [name]: value,
  //     };
  //   });
  // };
  
  
  
  // Form validation
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      salutation: "1",
      first_name: "",
      mid_name: "",
      last_name: "",
      email: "",
      date_of_birth: "",
      country_calling_code_id: "91",
      phone: "",
      location: "",
      country_id: "39",
      state_id: "0",
      city_id: "0",
      job_change_reason: "1",
      notice_period: "1",
      experience_years: "10",
      experience_months: "11",
      open_to_relocate: "1",
      current_ctc_currency_id: "1",
      current_ctc: "",
      expected_ctc_currency_id: "2",
      expected_ctc: "",
      industry_id: "['1','2','3']",
      other_industry: "",
      cv: "",
      linkedin: "",
      pan_number: "",
      submitted_datetime: "",
      gender: "",
      permanent_address: "",
      communication: "",
      emergency_contact: "",
      emergency_contact_name: "",
      emergency_contact_relationship: "",
      pan_number: "",
      blood_group: "",
      bank_name: "",
      Branch: "",
      account_name: "",
      account_number: "",
      ifsc_code: "",
      old_bank_name: "",
      old_Branch: "",
      old_account_name: "",
      old_account_number: "",
      old_ifsc_code: "",

      source: "",
      remarks: "",
      role: "",
      organization: "",
      start_month: "",
      start_year: "",
      end_month: "",
      end_year: "",
      description: "",
      category: "2"
    },

    validationSchema: Yup.object({

      first_name: Yup.string().min(2).max(25).required("Please Enter First Name"),
      mid_name: Yup.string().min(2).max(25).required("Please Enter Middel Name"),
      last_name: Yup.string().required("Please Enter Last Name"),
      email: Yup.string().required("Please Enter Email Address "),
      // phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').max(10)
    }),

    onSubmit: async (values) => {
      console.log("On Submit=>", values)
      const { id, ...data } = values;
      // try{
      //   const response = await axios.post("createCandidateURL", data)
      //   console.log("Res",response);
      // }catch{
      //   console.log("error")
      // }
      fetch(createCandidateURL,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: { 'content-type': "application/json" }
        }
      )
        .then(res => res.json())
        .then(res => {
          if (res.status == 500) {
            MySwal.fire('<p>Duplicate Entry Email / Phone </p>')
          } else if (res.status == 201) {
            setFormData({ ...data, [id]: values });
            document.getElementById("candidates").click();
            MySwal.fire('<p>Candidate Created</p>')
          } else if (res.status == 206) {
            MySwal.fire('<p>Mandatory Fields are Not Found </p>')
          }
        })
    },
  })

  // useEffect(() => {
  //   (
  //     async () => {
  //       console.log('start here')
  //       const salutation_response = await fetch(salutationUrl);
  //       const salutation_data = await salutation_response.json();
  //       setSalutationData(salutation_data);

  //       const noticePeriod_response = await fetch(noticePeriodUrl);
  //       const noticePeriod_data = await noticePeriod_response.json();
  //       setNoticePeriodData(noticePeriod_data);

  //       const country_response = await fetch(countryUrl);
  //       const country_data = await country_response.json();
  //       console.log("country_data", country_data);
  //       setCountryData(country_data);

  //       const state_response = await fetch(stateUrl);
  //       const state_data = await state_response.json();
  //       console.log("state_data", state_data);
  //       setStateData(state_data);

  //       const city_response = await fetch(cityUrl);
  //       const city_data = await city_response.json();
  //       setCityData(city_data);

  //       const jobChangeReason_response = await fetch(jobChangeReasonUrl);
  //       const jobChangeReason_data = await jobChangeReason_response.json();
  //       setJobChangeReasonData(jobChangeReason_data);

  //       const currency_response = await fetch(currencyUrl);
  //       const currency_data = await currency_response.json();
  //       setCurrencyData(currency_data);

  //       const response = await fetch(industryUrl);
  //       const data = await response.json();
  //       setIndustryData(data);
  //       console.log("end here")
  //     }
  //   )();
  // }, []);

  console.log(validation)
  return (
    <React.Fragment>
      <div className="new">
        <Sidebar />
        <div className="newContainer">
          <Navbar />
          <div className="bar">
            <div className="top">
              <h1>Add New Candidate</h1>
            </div>
            <Link to="/NewCandidate"
              className="btn"
            >
              Back
            </Link>
          </div>


          <form
            autoComplete="off"
            onSubmit={e => {
              e.preventDefault()
              validation.handleSubmit()
              return false
            }}
          >

            <div className="top">
              <h1>Personal Details</h1>
            </div>
            <span style={{ textAlign: 'center' }}>Some information about yourself, fields with * marked are mandatory</span><br />
            {/* {formvalue> 0?<button onClick={()=>setFormValue(s=> s-1)}>Back</button>: null} */}
            <div className="bottom">
              <div className='row items-push'>
                <div className="col-lg-11">
                  <div className="form-row">
                    <div className="form-group col-md-2 col-xs-12">
                      <label
                      >
                        Salutaton<span style={{ color: "red", fontSize: 15 }}>*</span>
                      </label>
                      <div className="input-group-prepend">
                        <select
                          defaultValue={'DEFAULT'}
                          name="salutation"
                          // className="form-control"
                          style={{ width: "100%", height: "38px", borderColor: "#CED4DA" }}
                          onChange={e => {
                            validation.setFieldValue("salutation", e)
                            validation.handleChange(e)
                          }}
                          value={validation.values.salutation || ""}
                        >
                          {/* {
                            salutationData.map(row => (
                              <option value={row.id}>{row.title}</option>
                            ))
                          } */}
                        </select>
                      </div>
                      {validation.touched?.salutation &&
                        validation.errors?.salutation ? (
                        <span className="campaig-errorMsg">
                          {validation.errors?.salutation}
                        </span>
                      ) : null}
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group col-md-5 col-xs-12">
                      <label>First Name<span style={{ color: "red", fontSize: 15 }}>*</span></label>
                      <input
                        name="first_name"
                        type="text"
                        className="form-control"
                        id="first_name"
                        placeholder="John"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.first_name || ""}
                        invalid={
                          validation.touched?.first_name &&
                            validation.errors?.first_name
                            ? true
                            : false
                        }
                        minLength={2}
                        maxLength={200}

                        autoComplete="off"
                        required
                      />
                      {/* <input 
                      name="first_name"
                      onChange={inputEvent}
                       /> */}
                      {validation.touched?.first_name &&
                        validation.errors?.first_name ? (
                        <span className="campaig-errorMsg">
                          {validation.errors?.first_name}
                        </span>
                      ) : null}
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group col-md-5 col-xs-12">
                      <label>Middel Name<span style={{ color: "red", fontSize: 15 }}>*</span></label>
                      <input
                        name="mid_name"
                        type="text"
                        className="form-control"
                        id="mid_name"
                        placeholder="Mike"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.mid_name || ""}
                        invalid={
                          validation.touched?.mid_name &&
                            validation.errors?.mid_name
                            ? true
                            : false
                        }
                        minLength={2}
                        maxLength={200}

                        autoComplete="off"
                        required
                      />
                      {validation.touched?.mid_name &&
                        validation.errors?.mid_name ? (
                        <span className="campaig-errorMsg">
                          {validation.errors?.mid_name}
                        </span>
                      ) : null}
                    </div>&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Last Name<span style={{ color: "red", fontSize: 15 }}>*</span></label>
                      <input
                        name="last_name"
                        type="text"
                        className="form-control"
                        id="last_name"
                        placeholder="Sinha"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.last_name || ""}
                        invalid={
                          validation.touched?.last_name &&
                            validation.errors?.last_name
                            ? true
                            : false
                        }
                        minLength={2}
                        maxLength={200}

                        autoComplete="off"
                        required
                      />
                      {validation.touched?.last_name &&
                        validation.errors?.last_name ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.last_name}
                        </FormFeedback>
                      ) : null}
                    </div>&nbsp;&nbsp;&nbsp; <br></br>
                    <div className="form-group col-md-6">
                      <label htmlFor="inputEmail4">Email<span style={{ color: "red", fontSize: 15 }}>*</span></label>
                      <input
                        name="email"
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Please enter your email"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email || ""}
                        invalid={
                          validation.touched?.email &&
                            validation.errors?.email
                            ? true
                            : false
                        }
                        minLength={2}
                        maxLength={200}

                        autoComplete="off"
                        required
                      />
                      {validation.touched?.email &&
                        validation.errors?.email ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.email}
                        </FormFeedback>
                      ) : null}
                    </div>&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label>DOB</label>
                      <input
                        name="email"
                        type="date"
                        className="form-control"
                        id="email"
                        placeholder="Please enter your DOB"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email || ""}
                        invalid={
                          validation.touched?.email &&
                            validation.errors?.email
                            ? true
                            : false
                        }
                        minLength={2}
                        maxLength={200}

                        autoComplete="off"
                        required
                      />
                      {validation.touched?.email &&
                        validation.errors?.email ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.email}
                        </FormFeedback>
                      ) : null}
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group col-md-4">
                      <label>Gender</label>
                      <select
                        name="gender"
                        type="select"
                        defaultValue={'DEFAULT'}
                        id="gender"
                        style={{ width: "100%", height: "38px", borderColor: "#CED4DA" }}
                        // className="form-control"
                        value={validation.values.gender || ""}
                        onChange={e => {
                          validation.setFieldValue("gender", e)
                          validation.handleChange(e)
                        }}
                        onBlur={validation.handleBlur}
                        invalid={
                          validation.touched?.gender &&
                            validation.errors?.gender
                            ? true
                            : false
                        }
                      >

                      </select>
                      {validation.touched?.gender &&
                        validation.errors?.gender ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.gender}
                        </FormFeedback>
                      ) : null}
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group col-md-4">
                      <label>Location</label>
                      <select
                        name="location"
                        type="select"
                        defaultValue={'DEFAULT'}
                        id="location"
                        // className="form-control"
                        style={{ width: "100%", height: "38px", borderColor: "#CED4DA" }}
                        value={validation.values.location || ""}
                        onChange={e => {
                          validation.setFieldValue("location", e)
                          validation.handleChange(e)
                        }}
                        onBlur={validation.handleBlur}
                        invalid={
                          validation.touched?.location &&
                            validation.errors?.location
                            ? true
                            : false
                        }
                      >

                      </select>
                      {validation.touched?.email &&
                        validation.errors?.email ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.email}
                        </FormFeedback>
                      ) : null}
                    </div>&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label htmlFor="country_calling_code_id">Calling Code</label>
                      <select
                        name="country_calling_code_id"
                        type="select"
                        defaultValue={'DEFAULT'}
                        id="country_calling_code_id"
                        // className="form-control" 
                        style={{ width: "100%", height: "38px", borderColor: "#CED4DA" }}
                        value={validation.values.country_calling_code_id || ""}
                        onChange={e => {
                          validation.setFieldValue("country_calling_code_id", e)
                          validation.handleChange(e)
                        }}
                        onBlur={validation.handleBlur}
                        invalid={
                          validation.touched?.country_calling_code_id &&
                            validation.errors?.country_calling_code_id
                            ? true
                            : false
                        }
                      >
                        {/* <option value="" disabled>
                          Select
                        </option> */}
                        {/* {
                          countryData.map(row => (
                            <option value={row.country_id}>+{row.country_id}</option>
                          ))
                        } */}
                      </select>
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group col-md-6">
                      <label>Phone<span style={{ color: "red", fontSize: 15 }}>*</span></label>
                      <input
                        name="phone"
                        // type="number"
                        className="form-control"
                        type="text"
                        min="1111111111"
                        max="9999999999"
                        id="phone"
                        value={validation.values.phone}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        placeholder="9876543210"
                        maxLength={10}
                        invalid={
                          validation.errors?.phone
                            ? true
                            : false
                        }
                        required />
                      {
                        validation.errors?.phone ? (
                          <FormFeedback type="invalid">
                            {validation.errors?.phone}
                          </FormFeedback>
                        ) : null}
                    </div>&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="form-row ">
                    <div className="form-group col-md-6">
                      <label>Permanent Address</label>
                      <textarea
                        className="form-control "
                        type="text"
                        name="permanent_address"
                        value={validation.values.permanent_address}
                        onChange={validation.handleChange}
                        placeholder=""
                        id="permanent_address" />
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group col-md-6">
                      <label>Communication Address</label>
                      <textarea
                        className="form-control "
                        type="text"
                        name="communication"
                        value={validation.values.communication}
                        onChange={validation.handleChange}
                        placeholder=""
                        id="communication" />
                    </div>&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-3 col-xs-12">
                      <label>country</label>
                      <select
                        name="country"
                        id="country"
                        // className="form-control"
                        style={{ width: "100%", height: "38px", borderColor: "#CED4DA" }}
                        defaultValue={'DEFAULT'}
                        value={validation.values.country}
                        onChange={e => {
                          validation.setFieldValue("country", e)
                          validation.handleChange(e)
                        }}
                        invalid={
                          validation.touched?.country &&
                            validation.errors?.country
                            ? true
                            : false
                        }
                      >
                        {/* <option value="0" disabled selected>
                            Select Country
                          </option> */}
                        {/* {
                          countryData.map(row => (
                            <option value={row.id}>{row.name}</option>
                          ))
                        } */}
                      </select>
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group col-md-6 col-xs-12">
                      <label>State</label>
                      <select
                        name="state_id"
                        id="state_id"
                        // className="form-control"
                        style={{ width: "100%", height: "38px", borderColor: "#CED4DA" }}
                        defaultValue={'DEFAULT'}
                        value={validation.values.state_id}
                        onChange={e => {
                          validation.setFieldValue("state_id", e)
                          validation.handleChange(e)
                        }}
                        invalid={
                          validation.touched?.state_id &&
                            validation.errors?.state_id
                            ? true
                            : false
                        }
                      >
                        {/* <option value="0" disabled selected>
                          Select State
                        </option> */}
                        {/* {
                          stateData.map(row => (
                            <option value={row.id}>{row.title}</option>
                          ))
                        } */}
                      </select>
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group col-md-3 col-xs-12">
                      <label>City</label>
                      <select
                        name="city_id"
                        id="city_id"
                        // className="form-control"
                        style={{ width: "100%", height: "38px", borderColor: "#CED4DA" }}
                        defaultValue={'DEFAULT'}
                        value={validation.values.city_id}
                        onChange={e => {
                          validation.setFieldValue("city_id", e)
                          validation.handleChange(e)
                        }}
                        invalid={
                          validation.touched?.city_id &&
                            validation.errors?.city_id
                            ? true
                            : false
                        }
                      >
                        {/* <option value="0" disabled selected>
                         Select City
                         </option> */}
                        {/* {
                          cityData.map(row => (
                            <option value={row.id}>{row.title}</option>
                          ))
                        } */}
                      </select>
                    </div>&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-12 col-xs-12">
                      <lable >Emergency Contact</lable>
                    </div>&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4 col-xs-12">
                      <label > Name<span style={{ color: "red", fontSize: 15 }}>*</span></label>
                      <input
                        name="emergency_contact_name"
                        type="text"
                        className="form-control "
                        id="emergency_contact_name"
                        placeholder="John"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.emergency_contact_name || ""}
                        invalid={
                          validation.touched?.emergency_contact_name &&
                            validation.errors?.emergency_contact_name
                            ? true
                            : false
                        }
                        minLength={2}
                        maxLength={200}

                        autoComplete="off"
                        required
                      />
                      {validation.touched?.emergency_contact_name &&
                        validation.errors?.emergency_contact_name ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.emergency_contact_name}
                        </FormFeedback>
                      ) : null}
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group col-md-4 col-xs-12">
                      <label > Relationship</label>
                      <input
                        name="emergency_contact_relationship"
                        type="text"
                        className="form-control "
                        id="emergency_contact_relationship"
                        placeholder="John"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.emergency_contact_relationship || ""}
                        invalid={
                          validation.touched?.emergency_contact_relationship &&
                            validation.errors?.emergency_contact_relationship
                            ? true
                            : false
                        }
                        minLength={2}
                        maxLength={200}

                        autoComplete="off"
                        required
                      />
                      {validation.touched?.emergency_contact_relationship &&
                        validation.errors?.emergency_contact_relationship ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.emergency_contact_relationship}
                        </FormFeedback>
                      ) : null}
                    </div>&nbsp;&nbsp;&nbsp;

                    <div className="form-group col-md-4 col-xs-12">
                      <label>Phone<span style={{ color: "red", fontSize: 15 }}>*</span></label>
                      <input
                        name="emergency_contact"
                        type="number"
                        className="form-control "
                        // type="text"
                        min="1111111111"
                        max="9999999999"
                        id="emergency_contact"
                        value={validation.values.emergency_contact}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        placeholder="9876543210"
                        maxLength={10}
                        invalid={
                          validation.errors?.emergency_contact
                            ? true
                            : false
                        }
                        required />
                      {
                        validation.errors?.emergency_contact ? (
                          <FormFeedback type="invalid">
                            {validation.errors?.emergency_contact}
                          </FormFeedback>
                        ) : null}
                    </div>&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-12 col-xs-12">
                      <lable>Medical History</lable>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6 col-xs-12">
                      <label htmlFor="current_ctc_currency_id">Blood Group</label>

                      <input
                        name="blood_group"
                        type="text"
                        className="form-control"
                        id="blood_group"
                        // placeholder="John"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.blood_group || ""}
                        invalid={
                          validation.touched?.blood_group &&
                            validation.errors?.blood_group
                            ? true
                            : false
                        }
                        minLength={2}
                        maxLength={200}

                        autoComplete="off"
                        required
                      />
                    </div>&nbsp;&nbsp;&nbsp;

                    <div className="form-group col-md-6 ">
                      <label htmlFor="current_ctc_currency_id">History/Alergies/Drugs</label>
                      <input
                        name="History_Drug"
                        type="text"
                        className="form-control"
                        id="first_name"
                        // placeholder="John"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.first_name || ""}
                        invalid={
                          validation.touched?.first_name &&
                            validation.errors?.first_name
                            ? true
                            : false
                        }
                        minLength={2}
                        maxLength={200}

                        autoComplete="off"
                        required
                      />
                    </div>&nbsp;&nbsp;&nbsp;
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="current_ctc_currency_id">Current CTC Currency</label>

                      <select
                        name="current_ctc_currency_id"
                        // className="form-control"
                        style={{ width: "100%", height: "38px", borderColor: "#CED4DA" }}
                        id="current_ctc_currency_id" value={validation.values.current_ctc_currency_id} onChange={e => {
                          validation.setFieldValue("current_ctc_currency_id", e)
                          validation.handleChange(e)
                        }}>
                        {/* {
                          currencyData.map(row => (
                            <option value={row.id}>{row.currency_code}</option>
                          ))
                        } */}
                      </select>
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="col-md-6 ">
                      <label>Curent CTC</label>
                      <input
                        type="number"
                        className="form-control"
                        min="0" max="10000000"
                        name="current_ctc"
                        value={validation.values.current_ctc}
                        onChange={validation.handleChange}
                        placeholder="10000" id="current_ctc" required />
                    </div>&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6 ">
                      <label htmlFor="expected_ctc_currency_id">Expected CTC Currency</label>

                      <select
                        name="expected_ctc_currency_id"
                        // className="form-control"
                        style={{ width: "100%", height: "38px", borderColor: "#CED4DA" }}
                        id="expected_ctc_currency_id" value={validation.values.expected_ctc_currency_id} onChange={e => {
                          validation.setFieldValue("expected_ctc_currency_id", e)
                          validation.handleChange(e)
                        }}>
                        {/* {
                          currencyData.map(row => (
                            <option value={row.id}>{row.currency_code}</option>
                          ))
                        } */}
                      </select>
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group col-md-6">
                      <label>Expected CTC</label>
                      <input
                        className="form-control"
                        type="number" min="0" max="10000000" name="expected_ctc" value={validation.values.expected_ctc} onChange={validation.handleChange} placeholder="20000" id="expected_ctc" required />
                    </div>&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-8 ">
                      <label htmlFor="job_change_reason">Job Change Reason</label>
                      <select name="job_change_reason"
                        // className="form-control"
                        style={{ width: "100%", height: "38px", borderColor: "#CED4DA" }}
                        value={validation.values.job_change_reason} onChange={e => {
                          validation.setFieldValue("job_change_reason", e)
                          validation.handleChange(e)
                        }} id="job_change_reason">
                        {/* {
                          jobChangeReasonData.map(row => (
                            <option value={row.id}>{row.reason_for_change}</option>
                          ))
                        } */}
                      </select>
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group col-md-4 ">
                      <label htmlFor="notice_period">Notice Period</label>
                      <select name="notice_period"
                        // className="form-control"
                        style={{ width: "100%", height: "38px", borderColor: "#CED4DA" }}
                        id="notice_period" value={validation.values.notice_period} onChange={e => {
                          validation.setFieldValue("notice_period", e)
                          validation.handleChange(e)
                        }}>
                        {/* {
                          noticePeriodData.map(row => (
                            <option value={row.id}>{row.title}</option>
                          ))
                        } */}
                      </select>
                    </div>&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4 ">
                      <label htmlFor="experience_years">Total Exp Yrs</label>
                      <select name="experience_years"
                        // className="form-control"
                        style={{ width: "100%", height: "38px", borderColor: "#CED4DA" }}
                        value={validation.values.experience_years} onChange={e => {
                          validation.setFieldValue("experience_years", e)
                          validation.handleChange(e)
                        }} id="experience_years">
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                        <option value={11}>11</option>
                        <option value={12}>12</option>
                        <option value={13}>13</option>
                        <option value={14}>14</option>
                        <option value={15}>15</option>
                        <option value={16}>16</option>
                        <option value={17}>17</option>
                        <option value={18}>18</option>
                        <option value={19}>19</option>
                        <option value={20}>20</option>
                        <option value={21}>21</option>
                        <option value={22}>22</option>
                        <option value={23}>23</option>
                        <option value={24}>24</option>
                        <option value={25}>25</option>
                        <option value={26}>26</option>
                        <option value={27}>27</option>
                        <option value={28}>28</option>
                        <option value={29}>29</option>
                        <option value={30}>30+</option>
                      </select>
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group col-md-4 ">
                      <label htmlFor="experience_months">Total Exp Mon</label>
                      <select name="experience_months"
                        // className="form-control"
                        style={{ width: "100%", height: "38px", borderColor: "#CED4DA" }}
                        value={validation.values.experience_months} onChange={e => {
                          validation.setFieldValue("experience_months", e)
                          validation.handleChange(e)
                        }} id="experience_months">
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                        <option value={11}>11</option>
                      </select>
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group col-md-4">
                      <label>Open to Relocate</label>
                      {/* <input type="text" name="open_to_relocate" value={validation.values.values.open_to_relocate} onChange={e=>onChange(e)} placeholder="Yes" id="open_to_relocate"/> */}
                      <select name="open_to_relocate"
                        // className="form-control"
                        style={{ width: "100%", height: "38px", borderColor: "#CED4DA" }}
                        value={validation.values.open_to_relocate}
                        onChange={e => {
                          validation.setFieldValue("open_to_relocate", e)
                          validation.handleChange(e)
                        }}
                        id="open_to_relocate">
                        <option value={1}>Yes</option>
                        <option value={0}>No</option>
                      </select>
                    </div>&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-7 col-xs-12">
                      <label htmlFor="industry">Industry</label>
                      <select
                        // className="form-control"
                        style={{ width: "100%", height: "38px", borderColor: "#CED4DA" }}
                        name="industry_id"
                        id="industry_id" value={validation.values.industry_id} onChange={e => {
                          validation.setFieldValue("industry_id", e)
                          validation.handleChange(e)
                        }}
                      // multiple size="1"
                      >
                        {/* {
                          industryData.map(row => (
                            <option value={row.id}>{row.name}</option>
                          ))
                        } */}
                      </select>
                      {/* <select id="industry_id" data-placeholder="Begin typing a name to filter..." multiple name="industry_id" size="1">
                      {
                        industryData.map(row => (
                          <option value={row.id}>{row.name}</option>
                        ))
                      }
                      </select> */}
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group col-md-5">
                      <label>Other Industry</label>
                      <input
                        type="text"
                        className="form-control"
                        name="other_industry" value={validation.values.other_industry} onChange={validation.handleChange} placeholder="SPorts, Chemistry" id="other_industry" />
                    </div>&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label>LinkedIn</label>
                      <input
                        type="link"
                        className="form-control"
                        name="linkedin"
                        value={validation.values.linkedin} onChange={validation.handleChange} placeholder="" id="linkedin" />
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group col-md-4">
                      <label>PAN</label>
                      <input
                        type="text"
                        className="form-control"
                        name="pan_number"
                        value={validation.values.pan_number}
                        onChange={validation.handleChange} placeholder=""
                        id="pan_number" />
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group col-md-4">
                      <label>submitted_datetime</label>

                      <input
                        type="date"
                        className="form-control"
                        name="submitted_datetime"
                        value={validation.values.submitted_datetime} onChange={validation.handleChange} placeholder="" id="submitted_datetime" />
                    </div>&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label>Source</label>
                      <input
                        type="text"
                        className="form-control"
                        name="source"
                        value={validation.values.source} onChange={validation.handleChange} placeholder="" id="source" />
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group col-md-8">
                      <label>Remark</label>
                      <textarea
                        className="form-control "
                        type="text"
                        name="remarks"
                        value={validation.values.remarks}
                        onChange={validation.handleChange}
                        placeholder=""
                        id="remarks" />
                    </div>&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="form-row">
                    <div className="col-md-6">
                      <label htmlFor="experience_months">Documents</label>
                      <select
                        name="experience_months"
                        style={{ width: "100%", height: "38px", borderColor: "#CED4DA" }}
                        value={validation.values.experience_months} onChange={e => {
                          validation.setFieldValue("experience_months", e)
                          validation.handleChange(e)
                        }} id="experience_months">
                        <option value={1}>Aadhar Card</option>
                        <option value={2}>Pan Card</option>
                        <option value={2}>Votter Id</option>
                        <option value={2}>Driving Licence</option>

                      </select>
                    </div>&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="form-row">
                    <div className="col-md-12">
                      <label>New Salary Bank Detail</label>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4 col-xs-12">
                      <label>Bank</label>
                      <input
                        name="bank_name"
                        type="text"
                        className="form-control"
                        id="bank_name"
                        placeholder="HDFC"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.bank_name || ""}
                        invalid={
                          validation.touched?.bank_name &&
                            validation.errors?.bank_name
                            ? true
                            : false
                        }
                        minLength={2}
                        maxLength={200}

                        autoComplete="off"
                        required
                      />
                      {validation.touched?.bank_name &&
                        validation.errors?.bank_name ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.bank_name}
                        </FormFeedback>
                      ) : null}
                    </div>&nbsp;&nbsp;
                    <div className="form-group col-md-4 col-xs-12">
                      <label>Branch</label>
                      <input
                        name="Branch"
                        type="text"
                        className="form-control"
                        id="Branch"
                        placeholder="Shivajinagar"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.Branch || ""}
                        invalid={
                          validation.touched?.Branch &&
                            validation.errors?.Branch
                            ? true
                            : false
                        }
                        minLength={2}
                        maxLength={200}

                        autoComplete="off"
                        required
                      />
                      {validation.touched?.Branch &&
                        validation.errors?.Branch ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.Branch}
                        </FormFeedback>
                      ) : null}
                    </div>&nbsp;&nbsp;
                    <div className="form-group col-md-4 col-xs-12">
                      <label>Account name</label>
                      <input
                        name="account_name"
                        type="text"
                        className="form-control"
                        id="account_name"
                        placeholder="HDFC"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.account_name || ""}
                        invalid={
                          validation.touched?.account_name &&
                            validation.errors?.account_name
                            ? true
                            : false
                        }
                        minLength={2}
                        maxLength={200}

                        autoComplete="off"
                        required
                      />
                      {validation.touched?.account_name &&
                        validation.errors?.account_name ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.account_name}
                        </FormFeedback>
                      ) : null}
                    </div>&nbsp;&nbsp;
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6 col-xs-12">
                      <label>Account Number</label>
                      <input
                        name="account_number"
                        type="text"
                        className="form-control"
                        id="account_number"
                        placeholder="HDFC"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.account_number || ""}
                        invalid={
                          validation.touched?.account_number &&
                            validation.errors?.account_number
                            ? true
                            : false
                        }
                        minLength={2}
                        maxLength={200}

                        autoComplete="off"
                        required
                      />
                      {validation.touched?.account_number &&
                        validation.errors?.account_number ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.account_number}
                        </FormFeedback>
                      ) : null}
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group col-md-6 col-xs-12">
                      <label>IFSC</label>
                      <input
                        name="ifsc_code"
                        type="text"
                        className="form-control"
                        id="ifsc_code"
                        placeholder="Shivajinagar"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.ifsc_code || ""}
                        invalid={
                          validation.touched?.ifsc_code &&
                            validation.errors?.ifsc_code
                            ? true
                            : false
                        }
                        minLength={2}
                        maxLength={200}

                        autoComplete="off"
                        required
                      />
                      {validation.touched?.ifsc_code &&
                        validation.errors?.ifsc_code ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.ifsc_code}
                        </FormFeedback>
                      ) : null}
                    </div>&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="form-row">
                    <div className="col-md-12">
                      <label>Old Bank Detail</label>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4 col-xs-12">
                      <label>Bank</label>
                      <input
                        name="old_bank_name"
                        type="text"
                        className="form-control"
                        id="old_bank_name"
                        placeholder="HDFC"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.old_bank_name || ""}
                        invalid={
                          validation.touched?.old_bank_name &&
                            validation.errors?.old_bank_name
                            ? true
                            : false
                        }
                        minLength={2}
                        maxLength={200}

                        autoComplete="off"
                        required
                      />
                      {validation.touched?.old_bank_name &&
                        validation.errors?.old_bank_name ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.old_bank_name}
                        </FormFeedback>
                      ) : null}
                    </div>&nbsp;&nbsp;
                    <div className="form-group col-md-4 col-xs-12">
                      <label>Branch</label>
                      <input
                        name="old_Branch"
                        type="text"
                        className="form-control"
                        id="old_Branch"
                        placeholder="Shivajinagar"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.old_Branch || ""}
                        invalid={
                          validation.touched?.old_Branch &&
                            validation.errors?.old_Branch
                            ? true
                            : false
                        }
                        minLength={2}
                        maxLength={200}

                        autoComplete="off"
                        required
                      />
                      {validation.touched?.old_Branch &&
                        validation.errors?.old_Branch ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.old_Branch}
                        </FormFeedback>
                      ) : null}
                    </div>&nbsp;&nbsp;
                    <div className="form-group col-md-4 col-xs-12">
                      <label> Old Account name</label>
                      <input
                        name="old_account_name"
                        type="text"
                        className="form-control"
                        id="old_account_name"
                        placeholder="HDFC"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.old_account_name || ""}
                        invalid={
                          validation.touched?.old_account_name &&
                            validation.errors?.old_account_name
                            ? true
                            : false
                        }
                        minLength={2}
                        maxLength={200}

                        autoComplete="off"
                        required
                      />
                      {validation.touched?.old_account_name &&
                        validation.errors?.old_account_name ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.old_account_name}
                        </FormFeedback>
                      ) : null}
                    </div>&nbsp;&nbsp;
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6 col-xs-12">
                      <label>Account Number</label>
                      <input
                        name="old_account_number"
                        type="text"
                        className="form-control"
                        id="old_account_number"
                        placeholder="HDFC"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.old_account_number || ""}
                        invalid={
                          validation.touched?.old_account_number &&
                            validation.errors?.old_account_number
                            ? true
                            : false
                        }
                        minLength={2}
                        maxLength={200}

                        autoComplete="off"
                        required
                      />
                      {validation.touched?.old_account_number &&
                        validation.errors?.old_account_number ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.old_account_number}
                        </FormFeedback>
                      ) : null}
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group col-md-6 col-xs-12">
                      <label>IFSC</label>
                      <input
                        name="old_ifsc_code"
                        type="text"
                        className="form-control"
                        id="old_ifsc_code"
                        placeholder="Shivajinagar"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.old_ifsc_code || ""}
                        invalid={
                          validation.touched?.old_ifsc_code &&
                            validation.errors?.old_ifsc_code
                            ? true
                            : false
                        }
                        minLength={2}
                        maxLength={200}

                        autoComplete="off"
                        required
                      />
                      {validation.touched?.old_ifsc_code &&
                        validation.errors?.old_ifsc_code ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.old_ifsc_code}
                        </FormFeedback>
                      ) : null}
                    </div>&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-12 col-xs-12">
                      <label className="file">
                        Resume:
                        {/* Resume: <DriveFolderUploadIcon className="icon"/>  */}
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        name="cv"
                        id="cv" style={{ paddingTop: "0px" }} />
                    </div>&nbsp;&nbsp;&nbsp;
                  </div>

                </div>
              </div>
            </div>
            <br /><br />
            <div className="align-self-end ml-auto">
              {/* <Button type="submit" color="primary" className="w-md btn btn-success" 
            style={{marginLeft: 545, color: "white", backgroundColor:"Blue"}}>
              Previous
            </Button> */}
              {/* <Button to="/Totexp" type="submit" color="primary" className="w-md"
            style={{marginLeft: 2, color: "white", backgroundColor:"Blue"}}>
              Next
            </Button> */}
              <Link to="/FormikData1" style={{ marginLeft: 545, color: "white", backgroundColor: "Blue" }}
                type="submit" color="primary"
                // className="barAddButton"
                className="btn"
              >
                Previous
              </Link >
              <Link 
              to="/Totexp" 
              style={{ marginLeft: 2, color: "white", backgroundColor: "Blue" }}
                // type="submit" color="primary"
                // className="barAddButton"
                className="btn"
              >
                Next
              </Link >
            </div>
          </form>
          {/* <div className="formInput">
                <label htmlFor="current_ctc_currency_id">Current CTC Currency</label>

                <select name="current_ctc_currency_id" id="current_ctc_currency_id" value={validation.values.current_ctc_currency_id} onChange={e => {
                  validation.setFieldValue("current_ctc_currency_id", e)
                  validation.handleChange(e)
                }}>
                  {
                    currencyData.map(row => (
                      <option value={row.id}>{row.currency_code}</option>
                    ))
                  }
                </select>
              </div>&nbsp;&nbsp;&nbsp;
              <div className="formInput">
                <label>Curent CTC</label>
                <input type="number" min="0" max="10000000" name="current_ctc" value={validation.values.current_ctc} onChange={validation.handleChange} placeholder="10000" id="current_ctc" required />
              </div>&nbsp;&nbsp;&nbsp;
              <div className="formInput">
                <label htmlFor="expected_ctc_currency_id">Expected CTC Currency</label>

                <select name="expected_ctc_currency_id" id="expected_ctc_currency_id" value={validation.values.expected_ctc_currency_id} onChange={e => {
                  validation.setFieldValue("expected_ctc_currency_id", e)
                  validation.handleChange(e)
                }}>
                  {
                    currencyData.map(row => (
                      <option value={row.id}>{row.currency_code}</option>
                    ))
                  }
                </select>
              </div>&nbsp;&nbsp;&nbsp;
              <div className="formInput">
                <label>Expected CTC</label>
                <input type="number" min="0" max="10000000" name="expected_ctc" value={validation.values.expected_ctc} onChange={validation.handleChange} placeholder="20000" id="expected_ctc" required />
              </div>&nbsp;&nbsp;&nbsp;
              <div className="formInput">
                <label htmlFor="job_change_reason">Job Change Reason</label>
                <select name="job_change_reason"

                  value={validation.values.job_change_reason} onChange={e => {
                    validation.setFieldValue("job_change_reason", e)
                    validation.handleChange(e)
                  }} id="job_change_reason">
                  {
                    jobChangeReasonData.map(row => (
                      <option value={row.id}>{row.reason_for_change}</option>
                    ))
                  }
                </select>
              </div>&nbsp;&nbsp;&nbsp;
              <div className="formInput">
                <label htmlFor="notice_period">Notice Period</label>
                <select name="notice_period"

                  id="notice_period" value={validation.values.notice_period} onChange={e => {
                    validation.setFieldValue("notice_period", e)
                    validation.handleChange(e)
                  }}>
                  {
                    noticePeriodData.map(row => (
                      <option value={row.id}>{row.title}</option>
                    ))
                  }
                </select>
              </div>&nbsp;&nbsp;&nbsp; */}

          <br />
          {/* <Button type="submit" color="primary" className="w-md">
              Submit
            </Button> */}

        </div>
      </div>


    </React.Fragment>
  )
}
export default FormikData;



