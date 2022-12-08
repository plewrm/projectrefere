import "../../Style/jobs.scss"
import "../../Style/candidate.scss"
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'reactstrap';
import "../../Style/countrymaster.scss"
// import { Table } from 'reactstrap';
import Table from 'react-bootstrap/Table';
// import Switch from '@mui/material/Switch'
// import { Link } from "react-router-dom";
// import { IconButton, Dialog, Grid } from '@mui/material'
// import EditIcon from '@mui/icons-material/Edit';
import { useFormik } from "formik";
import { signupSchema } from "../../schemas";
// import TextField from '@mui/material/TextField'
// import Modals from "../CountryMaster/Modals"
// import DialogTitle from '@mui/material/DialogTitle'
// import DialogActions from '@mui/material/DialogActions'
// import DialogContent from '@mui/material/DialogContent'
import { Link } from 'react-router-dom';
import swal from '@sweetalert/with-react'
import { BsEyeFill, BsPencilFill, BsFillTrashFill, BsTrashFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import AxiosApi from "../../AxiosApi"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addNewClientValidation } from '../../Validation/ValidationForm';
import classNames from "classnames";



const EditClient = () => {
    const queryParams = new URLSearchParams(window.location.pathname);
    const id = queryParams.get('user');
    const [is_edit, setIsEdit] = useState(false)
    // const [edit_id,setEditId]=useState("")
    const [open, setOpen] = useState(false)
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
        resolver: yupResolver(addNewClientValidation),
    });
    const [client_masters, setClient_Masters] = useState(
        {
            client_name: "",
            client_code: "",
        })

    const { client_name, client_code } = client_masters;

    const getClient = async () => {
        const response = await AxiosApi.get('/client_data/' + id);
        setClient_Masters(response.data)
    }

    const inputEvent = (event) => {
        const { name, value } = event.target;
        setClient_Masters((preValue) => {
            return {
                ...preValue,
                [name]: value,
            };
        });
    };

    useEffect(() => {
        getClient();
    }, []);


    const onSubmit = (e) => {
        e.preventDefault()
        const formvalue = {
            client_name: client_masters.client_name,
            client_code: client_masters.client_code
        };
        console.log("FormData  values", formvalue)
        const confirmationButton = window.confirm(
            "Client Added Sucussesfuly..."
        )
        if (confirmationButton === true) {
            AxiosApi.put(`/client_data/${id}`, formvalue)
                .then((result) => {
                    if (result.data == "success") {
                        alert("Client Created Success...")
                    }
                    navigate("/client")
                })
        }

    }

    return (
        <div className='jobList'>
            <Sidebar />
            <div className="jobListContainer">
                <Navbar />
                <div className="bar">
                    <div className="barTitle">Client</div>
                    {/* <Link to="/candidates/new"  style={{textDecoration:"none"}} className="barAddButton">
              Add Country
            </Link> */}
                    <Link to="/client"
                        className="btn"
                    >
                        Back
                    </Link>
                    {/* {open && <Modals/>} */}
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/*=========> Client related detail  ==========>*/}
                    <div>
                        <h4>Client Details</h4>
                        <div className="row">
                            <div className="col-md-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body registrationCard">
                                        <div className="form-group row">

                                            <label className=" col-form-label">
                                                Client Name
                                                <span style={{ color: "#FF0000" }}>
                                                    <b>*</b>
                                                </span>
                                            </label>
                                            <div className="">
                                                <input
                                                    name="client_name"
                                                    className={classNames("form-control", {
                                                        "is-invalid": errors.client_name,
                                                    })}
                                                    //   {...register("client_name", {
                                                    //     value: client_masters.client_name,
                                                    //   })}
                                                    value={client_masters.client_name}
                                                    onChange={inputEvent}
                                                    placeholder="Enter Client Name"
                                                    maxLength="20"
                                                    disabled
                                                />
                                                <small className="invalid-feedback">
                                                    {errors.client_name?.message}
                                                </small>
                                            </div>


                                        </div>
                                    </div>
                                    <div className="card-body registrationCard">
                                        <div className="form-group row">
                                            <label className=" col-form-label">
                                                Client Code<span style={{ color: "red", fontSize: 15 }}>*</span>
                                            </label>
                                            <div className="col-sm-6">
                                                <input
                                                    name="client_code"
                                                    className={classNames("form-control", {
                                                        "is-invalid": errors.client_code,
                                                    })}
                                                    //   {...register("client_code", {
                                                    //     value: client_masters.client_code,
                                                    //   })}
                                                    value={client_masters.client_code}
                                                    onChange={inputEvent}
                                                    placeholder="Enter Client Code"
                                                    maxLength="10"
                                                    disabled
                                                />
                                                <small className="invalid-feedback">
                                                    {errors.client_code?.message}
                                                </small>
                                            </div>



                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/*=========> Submit Button  ==========>*/}
                    <br></br>
                    {/* <div className="submitButton">
            <button
            //   type="submit"
              onClick={onSubmit}
              className="btn btn-outline-success btn-icon-text btn-sm" >
              <i className="mdi mdi-file-check btn-icon-prepend"></i>
              Update
            </button>
          </div> */}
                </form>


            </div>
        </div>
    )
}
export default EditClient;


