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
  const [salutationData, setSalutationData] = useState([]);
  const [noticePeriodData, setNoticePeriodData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [jobChangeReasonData, setJobChangeReasonData] = useState([]);
  const [currencyData, setCurrencyData] = useState([]);
  const [industryData, setIndustryData] = useState([]);

  const [formData, setFormData] = useState();
  const MySwal = withReactContent (Swal)
  const [formvalue, setFormValue] = useState(0)


  const salutationUrl = base_url + 'enumsapis/salutation/';
  const noticePeriodUrl = base_url + 'enumsapis/notice-period/';

  const jobChangeReasonUrl = base_url + 'job-change-reason/';
  const currencyUrl = base_url + 'currency/';
  const industryUrl = base_url + 'industry/';

  const countryUrl = base_url + 'country/';
  const stateUrl = base_url + 'generalapis/country/state/39/';
  const cityUrl = base_url + 'generalapis/country/state/city/2787/';

  const createCandidateURL = base_url + 'candidate/create-candidate/';

  // Form validation
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      salutation: "1",
      first_name: "",
      last_name: "",
      email: "",
      calling_code: "91",
      phone: "",
      country: "39",
      state: "0",
      city: "0",
      job_change_reason: "1",
      notice_period: "1",
      total_experience_years: "10",
      total_experience_months: "11",
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
      date_of_birth: "",
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
  
  useEffect(() => {
    (
      async () => {
        console.log('start here')
        const salutation_response = await fetch(salutationUrl);
        const salutation_data = await salutation_response.json();
        setSalutationData(salutation_data);

        const noticePeriod_response = await fetch(noticePeriodUrl);
        const noticePeriod_data = await noticePeriod_response.json();
        setNoticePeriodData(noticePeriod_data);

        const country_response = await fetch(countryUrl);
        const country_data = await country_response.json();
        console.log("country_data", country_data);
        setCountryData(country_data);

        const state_response = await fetch(stateUrl);
        const state_data = await state_response.json();
        console.log("state_data", state_data);
        setStateData(state_data);

        const city_response = await fetch(cityUrl);
        const city_data = await city_response.json();
        setCityData(city_data);

        const jobChangeReason_response = await fetch(jobChangeReasonUrl);
        const jobChangeReason_data = await jobChangeReason_response.json();
        setJobChangeReasonData(jobChangeReason_data);

        const currency_response = await fetch(currencyUrl);
        const currency_data = await currency_response.json();
        setCurrencyData(currency_data);

        const response = await fetch(industryUrl);
        const data = await response.json();
        setIndustryData(data);
        console.log("end here")
      }
    )();
  }, []);

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
            {/* {formvalue> 0?<button onClick={()=>setFormValue(s=> s-1)}>Back</button>: null} */}
            <div className="bottom">
              <div className='form'>
                <div className="formInput">
                  <label htmlFor="salutation">Salutation</label>
                  <select
                    defaultValue={'DEFAULT'}
                    name="salutation"

                    onChange={e => {
                      validation.setFieldValue("salutation", e)
                      validation.handleChange(e)
                    }}
                    value={validation.values.salutation || ""}
                  >
                    {
                      salutationData.map(row => (
                        <option value={row.id}>{row.title}</option>
                      ))
                    }
                  </select>


                  {validation.touched?.salutation &&
                    validation.errors?.salutation ? (
                    <span className="campaig-errorMsg">
                      {validation.errors?.salutation}
                    </span>
                  ) : null}
                </div>&nbsp;&nbsp;&nbsp;
                <div className="formInput">
                  <label>First Name*</label>
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
                  {validation.touched?.first_name &&
                    validation.errors?.first_name ? (
                    <FormFeedback type="invalid">
                      {validation.errors?.first_name}
                    </FormFeedback>
                  ) : null}
                </div>&nbsp;&nbsp;&nbsp;
                <div className="formInput">
                  <label>Last Name*</label>
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
                </div>
                <div className="formInput">
                  <label>Email*</label>
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
                <div className="formInput">
                  <label htmlFor="calling_code">Calling Code</label>
                  <select
                    name="calling_code"
                    type="select"
                    defaultValue={'DEFAULT'}
                    id="calling_code"
                    className="form-control"
                    value={validation.values.calling_code || ""}
                    onChange={e => {
                      validation.setFieldValue("calling_code", e)
                      validation.handleChange(e)
                    }}
                    onBlur={validation.handleBlur}
                    invalid={
                      validation.touched?.calling_code &&
                        validation.errors?.calling_code
                        ? true
                        : false
                    }
                  >
                    {/* <option value="" disabled>
        Select
      </option> */}
                    {
                      countryData.map(row => (
                        <option value={row.calling_code}>+{row.calling_code}</option>
                      ))
                    }
                  </select>
                </div>&nbsp;&nbsp;&nbsp;
                <div className="formInput">
                  <label>Phone*</label>
                  <input
                    name="phone"
                    // type="number"
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
                </div>
                <div className="formInput">
                  <label>country</label>
                  <select
                    name="country"
                    id="country"
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
                    {
                      countryData.map(row => (
                        <option value={row.id}>{row.name}</option>
                      ))
                    }
                  </select>
                </div>&nbsp;&nbsp;&nbsp;
                <div className="formInput">
                  <label>State</label>
                  <select
                    name="state"
                    id="state"
                    defaultValue={'DEFAULT'}
                    value={validation.values.state}
                    onChange={e => {
                      validation.setFieldValue("state", e)
                      validation.handleChange(e)
                    }}
                    invalid={
                      validation.touched?.state &&
                        validation.errors?.state
                        ? true
                        : false
                    }
                  >
                    {/* <option value="0" disabled selected>
        Select State
      </option> */}
                    {
                      stateData.map(row => (
                        <option value={row.id}>{row.title}</option>
                      ))
                    }
                  </select>
                </div>&nbsp;&nbsp;&nbsp;
                <div className="formInput">
                  <label>City</label>
                  <select
                    name="city"
                    id="scitytate"
                    defaultValue={'DEFAULT'}
                    value={validation.values.city}
                    onChange={e => {
                      validation.setFieldValue("city", e)
                      validation.handleChange(e)
                    }}
                    invalid={
                      validation.touched?.city &&
                        validation.errors?.city
                        ? true
                        : false
                    }
                  >
                    {/* <option value="0" disabled selected>
        Select City
      </option> */}
                    {
                      cityData.map(row => (
                        <option value={row.id}>{row.title}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="formInput">
                  <label htmlFor="current_ctc_currency">Current CTC Currency</label>

                  <select name="current_ctc_currency" id="current_ctc_currency" value={validation.values.current_ctc_currency} onChange={e => {
                    validation.setFieldValue("current_ctc_currency", e)
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
                  <label htmlFor="expected_ctc_currency">Expected CTC Currency</label>

                  <select name="expected_ctc_currency" id="expected_ctc_currency" value={validation.values.expected_ctc_currency} onChange={e => {
                    validation.setFieldValue("expected_ctc_currency", e)
                    validation.handleChange(e)
                  }}>
                    {
                      currencyData.map(row => (
                        <option value={row.id}>{row.currency_code}</option>
                      ))
                    }
                  </select>
                </div>
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
                </div>
                <div className="formInput">
                  <label htmlFor="total_experience_years">Total Exp Yrs</label>
                  <select name="total_experience_years"

                    value={validation.values.total_experience_years} onChange={e => {
                      validation.setFieldValue("total_experience_years", e)
                      validation.handleChange(e)
                    }} id="total_experience_years">
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
                <div className="formInput">
                  <label htmlFor="total_experience_months">Total Exp Mon</label>
                  <select name="total_experience_months"

                    value={validation.values.total_experience_months} onChange={e => {
                      validation.setFieldValue("total_experience_months", e)
                      validation.handleChange(e)
                    }} id="total_experience_months">
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
                <div className="formInput">
                  <label>Open to Relocate</label>
                  {/* <input type="text" name="open_to_relocate" value={validation.values.values.open_to_relocate} onChange={e=>onChange(e)} placeholder="Yes" id="open_to_relocate"/> */}
                  <select name="open_to_relocate"

                    value={validation.values.open_to_relocate}
                    onChange={e => {
                      validation.setFieldValue("open_to_relocate", e)
                      validation.handleChange(e)
                    }}
                    id="open_to_relocate">
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                  </select>
                </div>
                <div className="formInput">
                  <label htmlFor="industry">Industry</label>
                  <select name="selected_industry" id="selected_industry" value={validation.values.selected_industry} onChange={e => {
                    validation.setFieldValue("selected_industry", e)
                    validation.handleChange(e)
                  }}
                  // multiple size="1"
                  >
                    {
                      industryData.map(row => (
                        <option value={row.id}>{row.name}</option>
                      ))
                    }
                  </select>
                  {/* <select id="selected_industry" data-placeholder="Begin typing a name to filter..." multiple name="selected_industry" size="1">
  {
    industryData.map(row => (
      <option value={row.id}>{row.name}</option>
    ))
  }
</select> */}
                </div>&nbsp;&nbsp;&nbsp;
                <div className="formInput">
                  <label>Other Industry</label>
                  <input type="text" name="industry_other" value={validation.values.industry_other} onChange={validation.handleChange} placeholder="SPorts, Chemistry" id="industry_other" />
                </div>&nbsp;&nbsp;&nbsp;
                <div className="formInput">
                  <label>LinkedIn</label>
                  <input type="link" name="linkedin" value={validation.values.linkedin} onChange={validation.handleChange} placeholder="" id="linkedin" />
                </div>
                <div className="formInput">
                  <label>PAN</label>
                  <input type="text" name="" value={validation.values.pan_number} onChange={validation.handleChange} placeholder="" id="pan_number" />
                </div>&nbsp;&nbsp;&nbsp;
                <div className="formInput">
                  <label>DOB</label>
                  
                  <input type="date" name="date_of_birth" value={validation.values.date_of_birth} onChange={validation.handleChange} placeholder="" id="date_of_birth" />
                </div>&nbsp;&nbsp;&nbsp;
                <div className="formInput">
                  <label>Source</label>
                  <input type="text" name="source" value={validation.values.source} onChange={validation.handleChange} placeholder="" id="source" />
                </div>
                <div className="formInput">
                  <label>Remarks</label>
                  <textarea type="text" name="remarks" value={validation.values.remarks} onChange={validation.handleChange} placeholder="" id="remarks" />
                </div>&nbsp;&nbsp;&nbsp;

                <div className="formInput">
                  <label  className="file">
                    Resume:
                    {/* Resume: <DriveFolderUploadIcon className="icon"/>  */}
                  </label>
                  <input type="file" name="cv" id="cv" style={{ paddingTop: "0px" }} />
                </div>&nbsp;&nbsp;&nbsp;
                <div>
                </div>
              </div>
            </div><br />

            <div className="top">
              <h1>Experience</h1>
            </div><br />
            <div className='form'>
              {/* <div className='experience-form'> */}

              <div className="formInput">
                <label>Role</label>
                <input type="text" id="role" value={validation.values.role} onChange={validation.handleChange} minLength={2} maxLength={200} placeholder="Software Developer" name="role" autoComplete="off" required />
              </div>&nbsp;&nbsp;&nbsp;
              <div className="formInput">
                <label>Organisation</label>
                <input
                  name="organization"
                  type="text"
                  className="form-control"
                  id="organization"
                  value={validation.values.organization || ""}
                  placeholder="Acenet"
                  onChange={e => { validation.handleChange(e) }}
                  minLength={2}
                  maxLength={200}
                  autoComplete="off"
                  required
                />
              </div>&nbsp;&nbsp;&nbsp;
              <div className="formInput">
                <label>Start Month</label>
                <select name="start_month"

                  id="start_month" value={validation.values.start_month} onChange={e => {
                    validation.setFieldValue("start_month", e)
                    validation.handleChange(e)
                  }}>
                  <option value="" disabled>Select</option>
                  <option value="1">Jan</option>
                  <option value="2">Feb</option>
                  <option value="3">Mar</option>
                  <option value="4">Apr</option>
                  <option value="5">May</option>
                  <option value="6">Jun</option>
                  <option value="7">July</option>
                  <option value="8">Aug</option>
                  <option value="9">Sep</option>
                  <option value="10">Oct</option>
                  <option value="11">Nov</option>
                  <option value="12">Dec</option>
                </select>
              </div>
              <div className="formInput">
                <label>End Month</label>
                <select name="end_month"

                  id="end_month" value={validation.values.end_month} onChange={e => {
                    validation.setFieldValue("end_month", e)
                    validation.handleChange(e)
                  }}>
                  <option value="" disabled>Select</option>
                  <option value="1">Jan</option>
                  <option value="2">Feb</option>
                  <option value="3">Mar</option>
                  <option value="4">Apr</option>
                  <option value="5">May</option>
                  <option value="6">Jun</option>
                  <option value="7">July</option>
                  <option value="8">Aug</option>
                  <option value="9">Sep</option>
                  <option value="10">Oct</option>
                  <option value="11">Nov</option>
                  <option value="12">Dec</option>
                </select>
              </div>&nbsp;&nbsp;&nbsp;
              <div className="formInput">
                <label>Start Year</label>
                <select name="start_year"

                  id="start_year" value={validation.values.start_year} onChange={e => {
                    validation.setFieldValue("start_year", e)
                    validation.handleChange(e)
                  }}>
                  <option value="" disabled>Select</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>

                </select>
              </div>&nbsp;&nbsp;&nbsp;
              <div className="formInput">
                <label>End Year</label>
                <select name="end_year"

                  id="end_year" value={validation.values.end_year} onChange={e => {
                    validation.setFieldValue("end_year", e)
                    validation.handleChange(e)
                  }}>
                  <option value="" disabled>Select</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                </select>
              </div>&nbsp;&nbsp;&nbsp;
              <div className="formInput">
                <label>Description</label>
                <textarea type="text" name="description" value={validation.values.description} onChange={validation.handleChange} placeholder="" id="description" />
              </div>
              {/* </div> */}
            </div>

            <br /><br />
            <Button type="submit" color="primary" className="w-md">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}
export default FormikData;





// import React, { useEffect, useState } from "react"
// import * as Yup from "yup"
// import { useFormik, } from "formik"
// import { Link } from "react-router-dom";
// import Navbar from "../../components/navbar/Navbar";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Select from "react-select"
// import { Field } from "formik"
// import axios from 'axios'
// import base_url from '../../services/base_url';

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

// const FormikData = () => {
//   const [salutationData, setSalutationData] = useState([]);
//   const [noticePeriodData, setNoticePeriodData] = useState([]);
//   const [countryData, setCountryData] = useState([]);
//   const [stateData, setStateData] = useState([]);
//   const [cityData, setCityData] = useState([]);
//   const [jobChangeReasonData, setJobChangeReasonData] = useState([]);
//   const [currencyData, setCurrencyData] = useState([]);
//   const [industryData, setIndustryData] = useState([]);

//   // const salutationUrl = base_url + 'enumsapis/salutation/';
//   // const noticePeriodUrl = base_url + 'enumsapis/notice-period/';

//   // const jobChangeReasonUrl = base_url + 'job-change-reason/';
//   // const currencyUrl = base_url + 'currency/';
//   // const industryUrl = base_url + 'industry/';

//   // const countryUrl = base_url + 'country/';
//   // const stateUrl = base_url + 'generalapis/country/state/39/';
//   // const cityUrl = base_url + 'generalapis/country/state/city/2787/';

//   const createCandidateURL = base_url + 'candidate/create-candidate/';

//   // Form validation
//   const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

//   const validation = useFormik({
//     enableReinitialize: true,

//     initialValues: {
//       salutation: "1",
//       first_name: "",
//       last_name: "",
//       email: "",
//       calling_code: "91",
//       phone: "",
//       country: "39",
//       state: "0",
//       city: "0",
//       job_change_reason: "1",
//       notice_period: "1",
//       total_experience_years: "10",
//       total_experience_months: "11",
//       open_to_relocate: "1",
//       current_ctc_currency: "1",
//       current_ctc: "",
//       expected_ctc_currency: "2",
//       expected_ctc: "",
//       selected_industry: "['1','2','3']",
//       industry_other: "",
//       cv: "",
//       linkedin: "",
//       pan_number: "",
//       date_of_birth: "",
//       source: "",
//       remarks: "",
//       role: "",
//       organization: "",
//       start_month: "",
//       start_year: "",
//       end_month: "",
//       end_year: "",
//       description: "",
//       category: "2"
//     },

//     validationSchema: Yup.object({

//       first_name: Yup.string().min(2).max(25).required("Please Enter First Name"),
//       last_name: Yup.string().required("Please Enter Last Name"),
//       email: Yup.string().required("Please Enter Email Address "),
//       phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').max(10)
//     }),
//     onSubmit: async (values) => {
//       console.log("On Submit=>", values)
//       const { first_name, ...data } = values;
//       try{
//         const response = await axios.post("http://localhost:8000/api/", data)
//         console.log("Res",response);
//       }catch{
//         console.log("error")
//       }
//     //  dispatch ()
//     },
//   })
//   console.log(validation)
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
//             <Link to="/candidates"
//               className="btn"
//             >
//               Back
//             </Link>
//           </div>
//           <form
// onSubmit={e => {
//   e.preventDefault()
//   validation.handleSubmit()
//   return false
// }}
// >
// <div className="bottom">
//   <div className='form'>
//     <div className="formInput">
//       <label htmlFor="salutation">Salutation</label>
//       <select
//         defaultValue={'DEFAULT'}
//         name="salutation"

//         onChange={e => {
//           validation.setFieldValue("salutation", e)
//           validation.handleChange(e)
//         }}
//         value={validation.values.salutation || ""}
//       >
//         {
//           salutationData.map(row => (
//             <option value={row.id}>{row.title}</option>
//           ))
//         }
//       </select>


//       {validation.touched?.salutation &&
//         validation.errors?.salutation ? (
//         <span className="campaig-errorMsg">
//           {validation.errors?.salutation}
//         </span>
//       ) : null}
//     </div>&nbsp;&nbsp;&nbsp;
//     <div className="formInput">
//       <label>First Name*</label>
//       <input
//         name="first_name"
//         type="text"
//         className="form-control"
//         id="first_name"
//         placeholder="John"
//         onChange={validation.handleChange}
//         onBlur={validation.handleBlur}
//         value={validation.values.first_name || ""}
//         invalid={
//           validation.touched?.first_name &&
//             validation.errors?.first_name
//             ? true
//             : false
//         }
//         minLength={2}
//         maxLength={200}

//         autoComplete="off"
//         required
//       />
//       {validation.touched?.first_name &&
//         validation.errors?.first_name ? (
//         <FormFeedback type="invalid">
//           {validation.errors?.first_name}
//         </FormFeedback>
//       ) : null}
//     </div>&nbsp;&nbsp;&nbsp;
//     <div className="formInput">
//       <label>Last Name*</label>
//       <input
//         name="last_name"
//         type="text"
//         className="form-control"
//         id="last_name"
//         placeholder="Sinha"
//         onChange={validation.handleChange}
//         onBlur={validation.handleBlur}
//         value={validation.values.last_name || ""}
//         invalid={
//           validation.touched?.last_name &&
//             validation.errors?.last_name
//             ? true
//             : false
//         }
//         minLength={2}
//         maxLength={200}

//         autoComplete="off"
//         required
//       />
//       {validation.touched?.last_name &&
//         validation.errors?.last_name ? (
//         <FormFeedback type="invalid">
//           {validation.errors?.last_name}
//         </FormFeedback>
//       ) : null}
//     </div>
//     <div className="formInput">
//       <label>Email*</label>
//       <input
//         name="email"
//         type="text"
//         className="form-control"
//         id="email"
//         placeholder="Please enter your email"
//         onChange={validation.handleChange}
//         onBlur={validation.handleBlur}
//         value={validation.values.email || ""}
//         invalid={
//           validation.touched?.email &&
//             validation.errors?.email
//             ? true
//             : false
//         }
//         minLength={2}
//         maxLength={200}

//         autoComplete="off"
//         required
//       />
//       {validation.touched?.email &&
//         validation.errors?.email ? (
//         <FormFeedback type="invalid">
//           {validation.errors?.email}
//         </FormFeedback>
//       ) : null}
//     </div>&nbsp;&nbsp;&nbsp;
//     <div className="formInput">
//       <label htmlFor="calling_code">Calling Code</label>
//       <select
//         name="calling_code"
//         type="select"
//         defaultValue={'DEFAULT'}
//         id="calling_code"
//         className="form-control"
//         value={validation.values.calling_code || ""}
//         onChange={e => {
//           validation.setFieldValue("calling_code", e)
//           validation.handleChange(e)
//         }}
//         onBlur={validation.handleBlur}
//         invalid={
//           validation.touched?.calling_code &&
//             validation.errors?.calling_code
//             ? true
//             : false
//         }
//       >
//         {/* <option value="" disabled>
//         Select
//       </option> */}
//         {
//           countryData.map(row => (
//             <option value={row.calling_code}>+{row.calling_code}</option>
//           ))
//         }
//       </select>
//     </div>&nbsp;&nbsp;&nbsp;
//     <div className="formInput">
//       <label>Phone*</label>
//       <input
//         name="phone"
//         // type="number"
//         type="text"
//         min="1111111111"
//         max="9999999999"
//         id="phone"
//         value={validation.values.phone}
//         onChange={validation.handleChange}
//         onBlur={validation.handleBlur}
//         placeholder="9876543210"
//         maxLength={10}
//         invalid={
//           validation.errors?.phone
//             ? true
//             : false
//         }
//         required />
//       {
//         validation.errors?.phone ? (
//           <FormFeedback type="invalid">
//             {validation.errors?.phone}
//           </FormFeedback>
//         ) : null}
//     </div>
//     <div className="formInput">
//       <label>country</label>
//       <select
//         name="country"
//         defaultValue={'DEFAULT'}
//         id="country"
//         value={validation.values.country}
//         onChange={e => {
//           validation.setFieldValue("country", e)
//           validation.handleChange(e)
//         }}
//         invalid={
//           validation.touched?.country &&
//             validation.errors?.country
//             ? true
//             : false
//         }
//       >
//         {/* <option value="0" disabled selected>
//         Select Country
//       </option> */}
//         {
//           stateData.map(row => (
//             <option value={row.id}>{row.name}</option>
//           ))
//         }
//       </select>
//     </div>&nbsp;&nbsp;&nbsp;
//     <div className="formInput">
//       <label>State</label>
//       <select
//         name="state"
//         id="state"
//         defaultValue={'DEFAULT'}
//         value={validation.values.state}
//         onChange={e => {
//           validation.setFieldValue("state", e)
//           validation.handleChange(e)
//         }}
//         invalid={
//           validation.touched?.state &&
//             validation.errors?.state
//             ? true
//             : false
//         }
//       >
//         {/* <option value="0" disabled selected>
//         Select State
//       </option> */}
//         {
//           stateData.map(row => (
//             <option value={row.id}>{row.title}</option>
//           ))
//         }
//       </select>
//     </div>&nbsp;&nbsp;&nbsp;
//     <div className="formInput">
//       <label>City</label>
//       <select
//         name="city"
//         id="scitytate"
//         defaultValue={'DEFAULT'}
//         value={validation.values.city}
//         onChange={e => {
//           validation.setFieldValue("city", e)
//           validation.handleChange(e)
//         }}
//         invalid={
//           validation.touched?.city &&
//             validation.errors?.city
//             ? true
//             : false
//         }
//       >
//         {/* <option value="0" disabled selected>
//         Select City
//       </option> */}
//         {
//           stateData.map(row => (
//             <option value={row.id}>{row.title}</option>
//           ))
//         }
//       </select>
//     </div>
//     <div className="formInput">
//       <label htmlFor="current_ctc_currency">Current CTC Currency</label>

//       <select name="current_ctc_currency" id="current_ctc_currency" value={validation.values.current_ctc_currency} onChange={e => {
//           validation.setFieldValue("current_ctc_currency", e)
//           validation.handleChange(e)
//         }}>
//         {
//           currencyData.map(row => (
//             <option value={row.id}>{row.currency_code}</option>
//           ))
//         }
//       </select>
//     </div>&nbsp;&nbsp;&nbsp;
//     <div className="formInput">
//       <label>Curent CTC</label>
//       <input type="number" min="0" max="10000000" name="current_ctc" value={validation.values.current_ctc} onChange={validation.handleChange} placeholder="10000" id="current_ctc" required />
//     </div>&nbsp;&nbsp;&nbsp;
//     <div className="formInput">
//       <label htmlFor="expected_ctc_currency">Expected CTC Currency</label>

//       <select name="expected_ctc_currency" id="expected_ctc_currency" value={validation.values.expected_ctc_currency} onChange={e => {
//           validation.setFieldValue("expected_ctc_currency", e)
//           validation.handleChange(e)
//         }}>
//         {
//           currencyData.map(row => (
//             <option value={row.id}>{row.currency_code}</option>
//           ))
//         }
//       </select>
//     </div>
//     <div className="formInput">
//       <label>Expected CTC</label>
//       <input type="number" min="0" max="10000000" name="expected_ctc" value={validation.values.expected_ctc} onChange={validation.handleChange} placeholder="20000" id="expected_ctc" required />
//     </div>&nbsp;&nbsp;&nbsp;
//     <div className="formInput">
//       <label htmlFor="job_change_reason">Job Change Reason</label>
//       <select name="job_change_reason"

//         value={validation.values.job_change_reason} onChange={e => {
//           validation.setFieldValue("job_change_reason", e)
//           validation.handleChange(e)
//         }} id="job_change_reason">
//         {
//           jobChangeReasonData.map(row => (
//             <option value={row.id}>{row.reason_for_change}</option>
//           ))
//         }
//       </select>
//     </div>&nbsp;&nbsp;&nbsp;
//     <div className="formInput">
//       <label htmlFor="notice_period">Notice Period</label>
//       <select name="notice_period"

//         id="notice_period" value={validation.values.notice_period} onChange={e => {
//           validation.setFieldValue("notice_period", e)
//           validation.handleChange(e)
//         }}>
//         {
//           noticePeriodData.map(row => (
//             <option value={row.id}>{row.title}</option>
//           ))
//         }
//       </select>
//     </div>
//     <div className="formInput">
//       <label htmlFor="total_experience_years">Total Exp Yrs</label>
//       <select name="total_experience_years"

//         value={validation.values.total_experience_years}  onChange={e => {
//           validation.setFieldValue("total_experience_years", e)
//           validation.handleChange(e)
//         }} id="total_experience_years">
//         <option value={1}>1</option>
//         <option value={2}>2</option>
//         <option value={3}>3</option>
//         <option value={4}>4</option>
//         <option value={5}>5</option>
//         <option value={6}>6</option>
//         <option value={7}>7</option>
//         <option value={8}>8</option>
//         <option value={9}>9</option>
//         <option value={10}>10</option>
//         <option value={11}>11</option>
//         <option value={12}>12</option>
//         <option value={13}>13</option>
//         <option value={14}>14</option>
//         <option value={15}>15</option>
//         <option value={16}>16</option>
//         <option value={17}>17</option>
//         <option value={18}>18</option>
//         <option value={19}>19</option>
//         <option value={20}>20</option>
//         <option value={21}>21</option>
//         <option value={22}>22</option>
//         <option value={23}>23</option>
//         <option value={24}>24</option>
//         <option value={25}>25</option>
//         <option value={26}>26</option>
//         <option value={27}>27</option>
//         <option value={28}>28</option>
//         <option value={29}>29</option>
//         <option value={30}>30+</option>
//       </select>
//     </div>&nbsp;&nbsp;&nbsp;
//     <div className="formInput">
//       <label htmlFor="total_experience_months">Total Exp Mon</label>
//       <select name="total_experience_months"

//         value={validation.values.total_experience_months}  onChange={e => {
//           validation.setFieldValue("total_experience_months", e)
//           validation.handleChange(e)
//         }} id="total_experience_months">
//         <option value={1}>1</option>
//         <option value={2}>2</option>
//         <option value={3}>3</option>
//         <option value={4}>4</option>
//         <option value={5}>5</option>
//         <option value={6}>6</option>
//         <option value={7}>7</option>
//         <option value={8}>8</option>
//         <option value={9}>9</option>
//         <option value={10}>10</option>
//         <option value={11}>11</option>
//       </select>
//     </div>&nbsp;&nbsp;&nbsp;
//     <div className="formInput">
//       <label>Open to Relocate</label>
//       {/* <input type="text" name="open_to_relocate" value={validation.values.values.open_to_relocate} onChange={e=>onChange(e)} placeholder="Yes" id="open_to_relocate"/> */}
//       <select name="open_to_relocate"

//         value={validation.values.open_to_relocate}
//         onChange={e => {
//           validation.setFieldValue("open_to_relocate", e)
//           validation.handleChange(e)
//         }}
//         id="open_to_relocate">
//         <option value={1}>Yes</option>
//         <option value={0}>No</option>
//       </select>
//     </div>
//     <div className="formInput">
//       <label htmlFor="industry">Industry</label>
//       <select name="selected_industry" id="selected_industry" value={validation.values.selected_industry}  onChange={e => {
//           validation.setFieldValue("selected_industry", e)
//           validation.handleChange(e)
//         }} multiple size="1">
//         {
//           industryData.map(row => (
//             <option value={row.id}>{row.name}</option>
//           ))
//         }
//       </select>
//       {/* <select id="selected_industry" data-placeholder="Begin typing a name to filter..." multiple name="selected_industry" size="1">
//   {
//     industryData.map(row => (
//       <option value={row.id}>{row.name}</option>
//     ))
//   }
// </select> */}
//     </div>&nbsp;&nbsp;&nbsp;
//     <div className="formInput">
//       <label>Other Industry</label>
//       <input type="text" name="industry_other" value={validation.values.industry_other} onChange={validation.handleChange} placeholder="SPorts, Chemistry" id="industry_other" />
//     </div>&nbsp;&nbsp;&nbsp;
//     <div className="formInput">
//       <label>LinkedIn</label>
//       <input type="link" name="linkedin" value={validation.values.linkedin} onChange={validation.handleChange} placeholder="" id="linkedin" />
//     </div>
//     <div className="formInput">
//       <label>PAN</label>
//       <input type="text" name="" value={validation.values.pan_number} onChange={validation.handleChange} placeholder="" id="pan_number" />
//     </div>&nbsp;&nbsp;&nbsp;
//     <div className="formInput">
//       <label>DOB</label>
//       <input type="text" name="date_of_birth" value={validation.values.date_of_birth} onChange={validation.handleChange} placeholder="" id="date_of_birth" />
//     </div>&nbsp;&nbsp;&nbsp;
//     <div className="formInput">
//       <label>Source</label>
//       <input type="text" name="source" value={validation.values.source} onChange={validation.handleChange} placeholder="" id="source" />
//     </div>
//     <div className="formInput">
//       <label>Remarks</label>
//       <textarea type="text" name="remarks" value={validation.values.remarks} onChange={validation.handleChange} placeholder="" id="remarks" />
//     </div>&nbsp;&nbsp;&nbsp;

//     <div className="formInput">
//       <label  className="file">
//         Resume:
//         {/* Resume: <DriveFolderUploadIcon className="icon"/>  */}
//       </label>
//       <input type="file" name="cv" id="cv" style={{ paddingTop: "0px" }} />
//     </div>&nbsp;&nbsp;&nbsp;
//     <div>
//     </div>
//   </div>
// </div><br />

// <div className="top">
//   <h1>Experience</h1>
// </div><br />
// <div className='form'>
//   {/* <div className='experience-form'> */}

//   <div className="formInput">
//     <label>Role</label>
//     <input type="text" id="role" value={validation.values.role} onChange={validation.handleChange} minLength={2} maxLength={200} placeholder="Software Developer" name="role" autoComplete="off" required />
//   </div>&nbsp;&nbsp;&nbsp;
//   <div className="formInput">
//     <label>Organisation</label>
//     <input
//       name="organization"
//       type="text"
//       className="form-control"
//       id="organization"
//       value={validation.values.organization || ""}
//       placeholder="Acenet"
//       onChange={e => { validation.handleChange(e) }}
//       minLength={2}
//       maxLength={200}
//       autoComplete="off"
//       required
//     />
//   </div>&nbsp;&nbsp;&nbsp;
//   <div className="formInput">
//     <label>Start Month</label>
//     <select name="start_month"

//       id="start_month" value={validation.values.start_month} onChange={e => {
//         validation.setFieldValue("start_month", e)
//         validation.handleChange(e)
//       }}>
//       <option value="" disabled>Select</option>
//       <option value="1">Jan</option>
//       <option value="2">Feb</option>
//       <option value="3">Mar</option>
//       <option value="4">Apr</option>
//       <option value="5">May</option>
//       <option value="6">Jun</option>
//       <option value="7">July</option>
//       <option value="8">Aug</option>
//       <option value="9">Sep</option>
//       <option value="10">Oct</option>
//       <option value="11">Nov</option>
//       <option value="12">Dec</option>
//     </select>
//   </div>
//   <div className="formInput">
//     <label>End Month</label>
//     <select name="end_month"

//       id="end_month" value={validation.values.end_month}  onChange={e => {
//         validation.setFieldValue("end_month", e)
//         validation.handleChange(e)
//       }}>
//       <option value="" disabled>Select</option>
//       <option value="1">Jan</option>
//       <option value="2">Feb</option>
//       <option value="3">Mar</option>
//       <option value="4">Apr</option>
//       <option value="5">May</option>
//       <option value="6">Jun</option>
//       <option value="7">July</option>
//       <option value="8">Aug</option>
//       <option value="9">Sep</option>
//       <option value="10">Oct</option>
//       <option value="11">Nov</option>
//       <option value="12">Dec</option>
//     </select>
//   </div>&nbsp;&nbsp;&nbsp;
//   <div className="formInput">
//     <label>Start Year</label>
//     <select name="start_year"

//       id="start_year" value={validation.values.start_year} onChange={e => {
//         validation.setFieldValue("start_year", e)
//         validation.handleChange(e)
//       }}>
//       <option value="" disabled>Select</option>
//       <option value="2022">2022</option>
//       <option value="2021">2021</option>
//       <option value="2020">2020</option>
//       <option value="2019">2019</option>
//       <option value="2018">2018</option>
//       <option value="2017">2017</option>
//       <option value="2016">2016</option>
//       <option value="2015">2015</option>
//       <option value="2014">2014</option>
//       <option value="2013">2013</option>
//       <option value="2012">2012</option>
//       <option value="2011">2011</option>

//     </select>
//   </div>&nbsp;&nbsp;&nbsp;
//   <div className="formInput">
//     <label>End Year</label>
//     <select name="end_year"

//       id="end_year" value={validation.values.end_year} onChange={e => {
//         validation.setFieldValue("end_year", e)
//         validation.handleChange(e)
//       }}>
//       <option value="" disabled>Select</option>
//       <option value="2022">2022</option>
//       <option value="2021">2021</option>
//       <option value="2020">2020</option>
//       <option value="2019">2019</option>
//       <option value="2018">2018</option>
//       <option value="2017">2017</option>
//       <option value="2016">2016</option>
//       <option value="2015">2015</option>
//       <option value="2014">2014</option>
//       <option value="2013">2013</option>
//       <option value="2012">2012</option>
//       <option value="2011">2011</option>
//     </select>
//   </div>&nbsp;&nbsp;&nbsp;
//   <div className="formInput">
//     <label>Description</label>
//     <textarea type="text" name="description" value={validation.values.description} onChange={validation.handleChange} placeholder="" id="description" />
//   </div>
//   {/* </div> */}
// </div>

// <br /><br />
// <Button type="submit" color="primary" className="w-md">
//   Submit
// </Button>
// </form>
//         </div>
//       </div>
//     </React.Fragment>
//   )
// }
// export default FormikData;