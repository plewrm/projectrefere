import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AxiosApi from "../../AxiosApi"
import axios from 'axios'
import { addNewJobValidation } from '../../Validation/ValidationForm';
import '../../pages/Formik/stylesheets/formik1.css'
import NewJob from './NewJob';
import "../../Style/jobs.scss"
import '../../pages/Formik/stylesheets/formik1.css'
// import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
// import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
// import "../../Style/candidateNew.scss"
// import "./candidateNew.scss";
// import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import base_url from '../../services/base_url';
import { Link } from "react-router-dom";
import swal from '@sweetalert/with-react'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { signupSchema } from '../../schemas';
import { Button } from 'reactstrap';
import Multiselect from 'multiselect-react-dropdown';
import { useNavigate } from 'react-router-dom'

// function myfunction()
// {
//   console.log('enter my function');
//   alert("Please fill all mandatory fields");
// }

function JobsEdit() {

    // const [location, setLocation] = useState('');
    // const [skills, setSkills] = useState('');
    // const [options, setOptions] = useState(['Python', 'Java', 'NodeJs', 'SQL'])
    const queryParams = new URLSearchParams(window.location.pathname);
    const id = queryParams.get('user');
    const navigate = useNavigate()
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
        resolver: yupResolver(addNewJobValidation),
    });
    const [getValues, setGetValues] = useState({
        job_title: "",
        job_id: "",
        job_desc: "",
        // recruiter: "",
        display_on_web: "",
        client: "",
        job_type: "",
        // experience: "",
        min_exp: "",
        max_exp: "",
        display_order: "",
        display_date: "",
        // skills: "",
        // location: "",
        country: "",
        state: "",
        city: "",
        // options: "",
    })

    const { job_id, job_title, job_desc, recruiter, display_on_web, client, job_type, experience, min_exp, max_exp, display_order, display_date, skills, location, country, state, city, options } = getValues;
    // const inputEvent = e => {
    //   setGetValues({ ...getValues, [e.target.name]: e.target.value });
    // };

    const inputEvent = (event) => {
        const { name, value } = event.target;
        setGetValues((preValue) => {
            return {
                ...preValue,
                [name]: value,
            };
        });
    };
    const loadJobs = async () => {
        const result = await AxiosApi.get('http://localhost:3000/candidate_job/' + id);
        setGetValues(result.data);
    }

    useEffect(() => {
        loadJobs();
    }, [])
    // Form validation

    // validationSchema: Yup.object({
    //   first_name: Yup.string().required("Please Enter First Name"),
    //   last_name: Yup.string().required("Please Enter Last Name"),
    //   email: Yup.string()
    //     .email("Please enter a valid email")
    //     .required("Please Enter User Email"),
    //   group_id: Yup.string().ensure().required("Please Select Group"),
    //   role_id: Yup.string().ensure().required("Please Select Role"),
    //   company_id: Yup.string().required("Please Select Company Name"),
    //   company_role_id: Yup.string().required("Please Select Role Type"),
    //   campaign_id: Yup.array().min(1, "Please Select At Least One Campaign"),
    // }),
    const onSubmit = (e) => {
        e.preventDefault();
        const jsonPost = {
            job_title: getValues.job_title,
            // job_id: getValues.job_id,
            job_desc: getValues.job_desc,
            // recruiter: getValues.recruiter,
            display_on_web: getValues.display_on_web,
            client: getValues.client,
            job_type: getValues.job_type,
            // experience: getValues.experience,
            min_exp: getValues.min_exp,
            max_exp: getValues.max_exp,
            display_order: getValues.display_order,
            display_date: getValues.display_date,
            // skills: getValues.skills,
            // location: getValues.location,
            country: getValues.country,
            state: getValues.state,
            city: getValues.city,
            // options: getValues.options,
        };
        const confirmationButton = window.confirm(
            "Do you really want to Submit this Form?"
        );

        if (confirmationButton === true) {
            AxiosApi.put(
                `/candidate_job/${id}`,
                jsonPost
            )
                .then(function (result) {
                    console.log(result); // "Some User token"
                    if (result.data == "Success") {
                        alert(
                            "Job Updated Successfully..."
                        );
                    }
                    navigate("/Jobs")
                });
        }

    };

    // const [formData, setFormData] = useState(initialFormData);


    // const handleFormSubmit = () => {
    //   fetch(tableData,
    //     {
    //       method: "POST",
    //       body: JSON.stringify(formData),
    //       headers: {'content-type': "application/json"}
    //     }
    //   )
    //   .then(res => res.json())
    //   .then(res =>{
    //     setFormData(res)
    //   })
    // }

    // const onChange =(e) =>{
    //   const {value, id} = e.target;
    //   setFormData({...formData, [id]: value});
    // }

    return (<>
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="bar">
                    <div className="top">
                        <h1>New Job</h1>
                    </div>
                    <p align="right">
                        <Link to="/Jobs"
                            // className="barAddButton"
                            className="btn"
                            style={{ marginLeft: 545, color: "white", backgroundColor: "Blue" }}
                        >
                            Back
                        </Link>
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                >

                    <div className="row">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body registrationCard">
                                    <div className="form-group row">
                                        <label className="col-md-2 col-form-label">Job Title<span style={{ color: "red", fontSize: 15 }}>*</span></label>
                                        <div className="col-md-10">
                                            <input
                                                type="text"
                                                name="job_title"
                                                className='form-control'
                                                placeholder="Enter job title"
                                                // value={getValues.title}
                                                {...register("job_title", {
                                                    value: getValues.job_title,
                                                })}
                                                value={getValues.job_title}
                                                onChange={inputEvent}
                                                disabled
                                            // onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                    </div><br />
                                    <div className="card-body registrationCard">
                                        <div className="form-group row">
                                            <label className="col-md-2 col-form-label">Job Description</label>
                                            <div className="col-md-10">
                                                <textarea
                                                    className="form-control"
                                                    // className={classNames("form-control", {
                                                    //   "is-invalid": errors.communication,
                                                    // })}
                                                    {...register("job_desc", {
                                                        value: getValues.job_desc,
                                                    })}
                                                    type="text"
                                                    name="job_desc"
                                                    value={getValues.job_desc}
                                                    onChange={inputEvent}
                                                    placeholder=""
                                                    disabled
                                                />
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
                                                        name="display_on_web"
                                                        onChange={inputEvent}
                                                        {...register("display_on_web", {
                                                            value: getValues.display_on_web,
                                                        })}
                                                        value={getValues.display_on_web}
                                                        id="flexCheckDefault"
                                                        disabled
                                                    />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        Display On Web
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="card-body registrationCard">
                                        <div className="form-group row">
                                            <label className="col-md-2 col-form-label">
                                                Client
                                            </label>
                                            <div className="col-md-2">
                                                <select
                                                    className="form-control"
                                                    name="client"
                                                    {...register("client", {
                                                        value: getValues.client,
                                                    })}
                                                    value={getValues.client}
                                                    onChange={inputEvent}
                                                    disabled
                                                >
                                                    <option value="">--Select--</option>
                                                    <option value="1"> Accenture</option>
                                                    <option value="2"> Synecron</option>
                                                    <option value="3">Acolight</option>
                                                    <option value="4">Zensar</option>
                                                    <option value="5">Zodiac</option>
                                                    <option value="6">Moonlight</option>
                                                </select>
                                            </div>
                                            <label className="col-md-2 col-form-label">
                                                Job Type
                                            </label>
                                            <div className="col-md-2">
                                                <select
                                                    className="form-control"
                                                    {...register("job_type", {
                                                        value: getValues.job_type,
                                                    })}
                                                    value={getValues.job_type}
                                                    onChange={inputEvent}
                                                    name="job_type"
                                                    disabled
                                                >
                                                    <option value="">--Select--</option>
                                                    <option value="1">Full-Tme</option>
                                                    <option value="2">Part-Time </option>
                                                    <option value="3">Only-Weekend</option>
                                                    <option value="4">Permanent</option>
                                                    <option value="5">Temporary</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body registrationCard">
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label">
                                                Min Exp
                                            </label>
                                            <div className="col-sm-2">
                                                <input
                                                    type="text"
                                                    name="min_exp"
                                                    placeholder="Maximum Experience"
                                                    className='form-control'
                                                    {...register("min_exp", {
                                                        value: getValues.min_exp,
                                                    })}
                                                    value={getValues.min_exp}
                                                    onChange={inputEvent}
                                                    disabled
                                                // value={}
                                                // maxLength="20"
                                                />

                                            </div>

                                            <label className="col-sm-2 col-form-label">
                                                Max Exp
                                            </label>
                                            <div className="col-sm-2">
                                                <input
                                                    type="text"
                                                    name="max_exp"
                                                    placeholder="Maximum Experience"
                                                    className='form-control'
                                                    {...register("max_exp", {
                                                        value: getValues.max_exp,
                                                    })}
                                                    onChange={inputEvent}
                                                    value={getValues.max_exp}
                                                    maxLength="20"
                                                    disabled
                                                />

                                            </div>
                                            <label className="col-sm-2 col-form-label">
                                                Display Order
                                            </label>
                                            <div className="col-sm-2">
                                                <input
                                                    type="text"
                                                    name="display_order"
                                                    placeholder="Display order here"
                                                    className='form-control'
                                                    {...register("display_order", {
                                                        value: getValues.display_order
                                                    })}
                                                    onChange={inputEvent}
                                                    value={getValues.display_order}
                                                    maxLength="20"
                                                    disabled
                                                />
                                            </div>
                                        </div>


                                    </div>
                                    <div className="card-body registrationCard">
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label">
                                                Display Date
                                            </label>
                                            <div className="col-sm-3">
                                                <input
                                                    type='date'
                                                    name="display_date"
                                                    className='form-control'
                                                    // {...register("display_date",{
                                                    //   value:getValues.display_date
                                                    // })}
                                                    onChange={inputEvent}
                                                    value={getValues.display_date}
                                                    // onChange={}
                                                    maxLength="20"
                                                    disabled
                                                />
                                            </div>
                                        </div>


                                    </div>

                                    <div className="card-body registrationCard">
                                        <div className="form-group row">
                                            <label className="col-sm-12 col-form-label">
                                                Job Location
                                            </label>
                                        </div>
                                    </div>

                                    <div className="card-body registrationCard">
                                        <div className="form-group row">
                                            <lable className="col-sm-2 col-form-lable">
                                                Country
                                            </lable>
                                            <div className="col-sm-2">
                                                <select
                                                    className="form-control"
                                                    name="country"
                                                    {...register("country", {
                                                        value: getValues.country
                                                    })}
                                                    value={getValues.country}
                                                    onChange={inputEvent}
                                                    disabled
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
                                                    name="state"
                                                    {...register("state", {
                                                        value: getValues.state
                                                    })}
                                                    value={getValues.state}
                                                    onChange={inputEvent}
                                                    disabled
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
                                                    name="city"
                                                    {...register("city", {
                                                        value: getValues.city
                                                    })}
                                                    value={getValues.city}
                                                    onChange={inputEvent}
                                                    disabled
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
                                            <label className="col-sm-12 col-form-label">
                                                Must have skill
                                            </label><br /><br />
                                            {/* <div className="form-group row " style={{ marginBottom: '5px!important' }}>

                            <div className="col-md-5">
                              <select className="form-control" id="available_industry" name="available_industry" size="7" multiple="">

                                <option value="1" id="available_ind_1">Advertisement &amp; Public Relations</option><option value="45" id="available_ind_45">Agro Processing &amp; Food</option>
                                <option value="4" id="available_ind_4">Analytics/Business Intelligence</option>
                                <option value="3" id="available_ind_3">Architectural &amp; Design services</option>
                                <option value="5" id="available_ind_5">Automobiles &amp; Auto Parts</option>
                                <option value="6" id="available_ind_6">BFSI</option>
                                <option value="8" id="available_ind_8">BPO/KPO Services</option>
                                <option value="9" id="available_ind_9">Chemicals</option>
                                <option value="11" id="available_ind_11">Computer Hardware</option>
                                <option value="12" id="available_ind_12">Construction &amp; Engineering</option>
                                <option value="13" id="available_ind_13">Diversified Industrial group</option>
                                <option value="14" id="available_ind_14">Diversified Retail (Departmental Store)</option>
                                <option value="15" id="available_ind_15">E-commerce/Online Retail</option>
                                <option value="16" id="available_ind_16">Education</option>
                                <option value="58" id="available_ind_58">Education Technology (EdTech)</option>
                                <option value="17" id="available_ind_17">Electronic Equipments &amp; Parts</option>
                                <option value="18" id="available_ind_18">Employment Services</option>
                                <option value="48" id="available_ind_48">Environmental services &amp; Equipment</option>
                                <option value="59" id="available_ind_59">Financial Technology (FinTech)</option>
                                <option value="20" id="available_ind_20">FMCG</option>
                              </select>
                            </div>
                            <div className="col-md-1 d-none d-md-block pt-4">
                              <div className="pt-30 pb-10">
                                <button class="btn btn-sm btn-alt-primary" id="move_right" type="button" onclick="getSelectValues(document.getElementById('available_industry'));">
                                <ArrowCircleRightIcon/>
                                </button>
                              </div>
                              <div className="pt-10">
                                <button className="btn btn-sm btn-alt-primary" id="move_left" type="button" onClick="getRemoveSelectValues(document.getElementById('selected_industry'));">
                                <ArrowCircleLeftIcon/>
                                </button>
                              </div>
                            </div>
                            <div className="col-md-1 d-md-none">
                              <div className="row d-flex justify-content-center">
                                <div className="p-5">
                                  <button className="btn btn-sm btn-alt-primary" id="move_down" type="button" onClick="getSelectValues(document.getElementById('available_industry'));">
                                    <i className="fa fa-arrow-down"></i>
                                  </button>
                                </div>
                                <div className="p-5">
                                  <button className="btn btn-sm btn-alt-primary" id="move_up" type="button" onClick="getRemoveSelectValues(document.getElementById('selected_industry'));">
                                    <i className="fa fa-arrow-up"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-5">
                              <select className="form-control" id="selected_industry" name="selected_industry" size="7" multiple="" onClick="removeSelectedIndustry();">

                                <option value="2" id="selected_ind_2">Aerospace &amp; Defense</option></select>
                            </div>
                          </div> */}
                                        </div>
                                    </div>

                                    <div className="card-body registrationCard">
                                        <div className="form-group row">
                                            <label className="col-sm-12 col-form-label">
                                                Nice to have skill
                                            </label><br /><br />
                                            {/* <div className="form-group row " style={{ marginBottom: '5px!important' }}>

                            <div className="col-md-5">
                              <select className="form-control" id="available_industry" name="available_industry" size="7" multiple="">

                                <option value="1" id="available_ind_1">Advertisement &amp; Public Relations</option><option value="45" id="available_ind_45">Agro Processing &amp; Food</option>
                                <option value="4" id="available_ind_4">Analytics/Business Intelligence</option>
                                <option value="3" id="available_ind_3">Architectural &amp; Design services</option>
                                <option value="5" id="available_ind_5">Automobiles &amp; Auto Parts</option>
                                <option value="6" id="available_ind_6">BFSI</option>
                                <option value="8" id="available_ind_8">BPO/KPO Services</option>
                                <option value="9" id="available_ind_9">Chemicals</option>
                                <option value="11" id="available_ind_11">Computer Hardware</option>
                                <option value="12" id="available_ind_12">Construction &amp; Engineering</option>
                                <option value="13" id="available_ind_13">Diversified Industrial group</option>
                                <option value="14" id="available_ind_14">Diversified Retail (Departmental Store)</option>
                                <option value="15" id="available_ind_15">E-commerce/Online Retail</option>
                                <option value="16" id="available_ind_16">Education</option>
                                <option value="58" id="available_ind_58">Education Technology (EdTech)</option>
                                <option value="17" id="available_ind_17">Electronic Equipments &amp; Parts</option>
                                <option value="18" id="available_ind_18">Employment Services</option>
                                <option value="48" id="available_ind_48">Environmental services &amp; Equipment</option>
                                <option value="59" id="available_ind_59">Financial Technology (FinTech)</option>
                                <option value="20" id="available_ind_20">FMCG</option>
                              </select>
                            </div>
                            <div className="col-md-1 d-none d-md-block pt-4">
                              <div className="pt-30 pb-10">
                                <button class="btn btn-sm btn-alt-primary" id="move_right" type="button" onclick="getSelectValues(document.getElementById('available_industry'));">
                                <ArrowCircleRightIcon/>
                                </button>
                              </div>
                              <div className="pt-10">
                                <button className="btn btn-sm btn-alt-primary" id="move_left" type="button" onClick="getRemoveSelectValues(document.getElementById('selected_industry'));">
                                <ArrowCircleLeftIcon/>
                                </button>
                              </div>
                            </div>
                            <div className="col-md-1 d-md-none">
                              <div className="row d-flex justify-content-center">
                                <div className="p-5">
                                  <button className="btn btn-sm btn-alt-primary" id="move_down" type="button" onClick="getSelectValues(document.getElementById('available_industry'));">
                                    <i className="fa fa-arrow-down"></i>
                                  </button>
                                </div>
                                <div className="p-5">
                                  <button className="btn btn-sm btn-alt-primary" id="move_up" type="button" onClick="getRemoveSelectValues(document.getElementById('selected_industry'));">
                                    <i className="fa fa-arrow-up"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-5">
                              <select className="form-control" id="selected_industry" name="selected_industry" size="7" multiple="" onClick="removeSelectedIndustry();">

                                <option value="2" id="selected_ind_2">Aerospace &amp; Defense</option></select>
                            </div>
                          </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            {/* <Button
                                // type='submit'
                                color="primary"
                                onClick={onSubmit}
                                className="submitbtn"
                            >Create
                            </Button> */}
                        </div>
                    </div>
                    <br />
                </form>

            </div>
        </div >
    </>
    )
}
export default JobsEdit;
