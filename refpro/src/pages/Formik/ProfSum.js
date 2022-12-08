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


import {
  Card,
  Col,
  Container,
  CardBody,
  Label,
  Button,
  Form,
  Input,
  FormFeedback,
} from "reactstrap"

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

  // const [formData, setFormData] = useState();
  // const MySwal = withReactContent(Swal)
  // const [formvalue, setFormValue] = useState(0)


  // const salutationUrl = base_url + 'enumsapis/salutation/';
  // const noticePeriodUrl = base_url + 'enumsapis/notice-period/';

  // const jobChangeReasonUrl = base_url + 'job-change-reason/';
  // const currencyUrl = base_url + 'currency/';
  // const industryUrl = base_url + 'industry/';

  // const countryUrl = base_url + 'country/';
  // const stateUrl = base_url + 'generalapis/country/state/39/';
  // const cityUrl = base_url + 'generalapis/country/state/city/2787/';

  // const createCandidateURL = base_url + 'candidate/create-candidate/';

  // Form validation
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validation = useFormik({
    enableReinitialize: true,
    
    initialValues: {
      Designation: "",
      prf_department: "",
      prf_joining_date: "",
      prf_group_health_insurance: "",
      prf_acenet_asset:"",
      prf_client_asset:"",
      prf_client_name: "",
      prf_inititation_date:"",
      prf_report_date:"",
      prf_agency:"",
      prf_submission_date:"",
      prf_form_16:"",
      prf_covid_certificate:"",
      prf_bgv_certificate:"",
      last_name: "",
      email: "",
      calling_code: "91",
      phone: "",
      country: "39",
      state: "0",
      city: "0",
      job_change_reason: "1",
      notice_period: "1",
      total_experience_years: "",
      open_to_relocate: "1",
      current_ctc_currency: "1",
      current_ctc: "",
      expected_ctc_currency: "2",
      expected_ctc: "",
      selected_industry: "['1','2','3']",
      industry_other: "",
      cv: "",
      linkedin: "",
      pan_number: "",
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

      prf_client_name: Yup.string().min(2).max(25).required("Please Enter First Name"),
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
            <Link to="/candidates"
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
              <h1>Profile Summary</h1>
            </div><br />
            {/* {formvalue> 0?<button onClick={()=>setFormValue(s=> s-1)}>Back</button>: null} */}
            <div className="bottom">
              <div className='row items-push'>
                <div className="col-lg-12">
                  <div className="form-row">
                   <div className="form-group col-md-4 col-xs-12">
                    <lable >Designation</lable>
                    <select 
                    name="Designation"
                    style={{ width: "100%", height:"38px",borderColor:"#CED4DA"}}

                      value={validation.values.Designation} 
                      onChange={e => {
                        validation.setFieldValue("Designation", e)
                        validation.handleChange(e)
                      }} id="Designation">
                      <option value={1}>Founder & CEO</option>
                      <option value={2}>Director - HR & Operations</option>
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
                    <div className="form-group col-md-4 col-xs-12">
                    <label htmlFor="prf_department">Department</label>
                    <select 
                    name="prf_department"
                    style={{ width: "100%", height:"38px",borderColor:"#CED4DA"}}
                      value={validation.values.prf_department} onChange={e => {
                        validation.setFieldValue("prf_department", e)
                        validation.handleChange(e)
                      }} id="prf_department">
                      <option value={1}>Management</option>
                      <option value={2}>Operation </option>
                      <option value={3}>Marketing</option>
                      <option value={4}>Development</option>
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
                  <div className="form-group col-md-4 col-xs-12">
                    <label>Joining Date</label>

                    <input 
                    type="date" 
                    className="form-control"
                    name="prf_joining_date" 
                    value={validation.values.prf_joining_date} 
                    onChange={validation.handleChange} placeholder="" id="prf_joining_date" />
                  </div>&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="form-row">
                  <div className="col-md-4">
                    <label htmlFor="prf_group_health_insurance">Group Health Insurance</label>
                    <select 
                    name="prf_group_health_insurance"
                    style={{ width: "100%", height:"38px",borderColor:"#CED4DA"}}
                      value={validation.values.prf_group_health_insurance} onChange={e => {
                        validation.setFieldValue("prf_group_health_insurance", e)
                        validation.handleChange(e)
                      }} id="prf_group_health_insurance">
                      <option value={1}>Yes</option>
                      <option value={2}>No</option>
                      
                    </select>
                  </div>&nbsp;&nbsp;&nbsp;
                  <div className="col-md-4">
                    <label htmlFor="prf_acenet_asset">AceNet Assets</label>
                    <select 
                    name="prf_acenet_asset"
                    style={{ width: "100%", height:"38px",borderColor:"#CED4DA"}}
                      value={validation.values.prf_acenet_asset} onChange={e => {
                        validation.setFieldValue("prf_acenet_asset", e)
                        validation.handleChange(e)
                      }} id="prf_acenet_asset">
                      <option value={1}>Yes</option>
                      <option value={2}>No</option>
                      
                    </select>
                  </div>&nbsp;&nbsp;&nbsp;
                  <div className="col-md-4">
                    <label htmlFor="prf_client_asset">Client Assets</label>
                    <select 
                    name="prf_client_asset"
                    style={{ width: "100%", height:"38px",borderColor:"#CED4DA"}}
                      value={validation.values.prf_client_asset} onChange={e => {
                        validation.setFieldValue("prf_client_asset", e)
                        validation.handleChange(e)
                      }} id="prf_client_asset">
                      <option value={1}>Yes</option>
                      <option value={2}>No</option>
                      
                    </select>
                  </div>&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="form-row">
                  <div className="form-group col-md-4 col-xs-12">
                      <label>Client Name<span style={{ color: "red", fontSize: 15 }}>*</span></label>
                      <input
                        name="prf_client_name"
                        type="text"
                        className="form-control"
                        id="prf_client_name"
                        placeholder="John"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.prf_client_name || ""}
                        invalid={
                          validation.touched?.prf_client_name &&
                            validation.errors?.prf_client_name
                            ? true
                            : false
                        }
                        minLength={2}
                        maxLength={200}

                        autoComplete="off"
                        required
                      />
                      {validation.touched?.prf_client_name &&
                        validation.errors?.prf_client_name ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.prf_client_name}
                        </FormFeedback>
                      ) : null}
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group col-md-4 col-xs-12">
                    <label>Initiation Date</label>
                    <input 
                    type="date" 
                    className="form-control"
                    name="prf_inititation_date" 
                    value={validation.values.prf_inititation_date} 
                    onChange={validation.handleChange} placeholder="" id="prf_inititation_date" />
                  </div>&nbsp;&nbsp;&nbsp;
                  <div className="form-group col-md-4 col-xs-12">
                    <label>Report Date</label>
                    <input 
                    type="date" 
                    className="form-control"
                    name="prf_report_date" 
                    value={validation.values.prf_report_date} 
                    onChange={validation.handleChange} placeholder="" id="prf_report_date" />
                  </div>&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="form-row">
                  <div className="form-group col-md-5 col-xs-12">
                      <label>Agency Name<span style={{ color: "red", fontSize: 15 }}>*</span></label>
                      <input
                        name="prf_agency"
                        type="text"
                        className="form-control"
                        id="prf_agency"
                        placeholder="John"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.prf_agency || ""}
                        invalid={
                          validation.touched?.prf_agency &&
                            validation.errors?.prf_agency
                            ? true
                            : false
                        }
                        minLength={2}
                        maxLength={200}

                        autoComplete="off"
                        required
                      />
                      {validation.touched?.first_name &&
                        validation.errors?.first_name ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.first_name}
                        </FormFeedback>
                      ) : null}
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className="form-group col-md-5 col-xs-12">
                    <label>Submission Date</label>
                    <input 
                    type="date" 
                    className="form-control"
                    name="prf_submission_date" 
                    value={validation.values.prf_submission_date} 
                    onChange={validation.handleChange} placeholder="" id="prf_submission_date" />
                  </div>&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="form-row">
                  <div className="col-md-4">
                    <label htmlFor="prf_form_16">Form 16(FY 22-23)</label>
                    <select 
                    name="prf_form_16"
                    style={{ width: "100%", height:"38px",borderColor:"#CED4DA"}}
                      value={validation.values.prf_form_16} onChange={e => {
                        validation.setFieldValue("prf_form_16", e)
                        validation.handleChange(e)
                      }} id="prf_form_16">
                      <option value={1}>Yes</option>
                      <option value={2}>No</option>
                      
                    </select>
                  </div>&nbsp;&nbsp;&nbsp;
                  <div className="col-md-4">
                    <label htmlFor="prf_covid_certificate">Covid Certificate</label>
                    <select 
                    name="prf_covid_certificate"
                    style={{ width: "100%", height:"38px",borderColor:"#CED4DA"}}
                      value={validation.values.prf_covid_certificate} onChange={e => {
                        validation.setFieldValue("prf_covid_certificate", e)
                        validation.handleChange(e)
                      }} id="prf_covid_certificate">
                      <option value={1}>Yes</option>
                      <option value={2}>No</option>
                      
                    </select>
                  </div>&nbsp;&nbsp;&nbsp;
                  <div className="col-md-4">
                    <label htmlFor="prf_bgv_certificate">BGV Status</label>
                    <select 
                    name="prf_bgv_certificate"
                    style={{ width: "100%", height:"38px",borderColor:"#CED4DA"}}
                      value={validation.values.prf_bgv_certificate} onChange={e => {
                        validation.setFieldValue("prf_bgv_certificate", e)
                        validation.handleChange(e)
                      }} id="prf_bgv_certificate">
                      <option value={1}>Pending</option>
                      <option value={2}>Done</option>
                      <option value={3}>Not Done</option>
                      
                    </select>
                  </div>&nbsp;&nbsp;&nbsp;
                  </div>
                  </div>
              </div>
            </div>
                  <br></br>
                  
                  
                    <div class="align-self-end ml-auto">
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
                      <Link to="/Exp" style={{ marginLeft: 2, color: "white", backgroundColor: "Blue" }}
                        type="submit" color="primary"
                        // className="barAddButton"
                        className="btn"
                      >
                        Next
                      </Link >
                    </div>
                
                
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}
export default FormikData;




