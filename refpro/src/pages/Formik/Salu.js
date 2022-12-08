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
                  <label for="salutation">Salutation</label>
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
                  <label for="calling_code">Calling Code</label>
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
                  <label for="current_ctc_currency">Current CTC Currency</label>

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
                  <label for="expected_ctc_currency">Expected CTC Currency</label>

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
                  <label for="job_change_reason">Job Change Reason</label>
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
                  <label for="notice_period">Notice Period</label>
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
                
              </div>
            </div><br />
            {/* <Button type="submit" color="primary" className="w-md">
              Submit
            </Button> */}
            <div class="align-self-end ml-auto">
            <Button type="submit" color="primary" className="w-md btn btn-success" 
            style={{marginLeft: 545, color: "white", backgroundColor:"Blue"}}>
              Previous
            </Button>
            <Button type="submit" color="primary" className="w-md"
            style={{marginLeft: 2, color: "white", backgroundColor:"Blue"}}>
              Next
            </Button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}
export default FormikData;



