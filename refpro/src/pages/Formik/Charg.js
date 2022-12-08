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
import { Button, Modal,Form,Label } from "react-bootstrap";


function Charg() {
  const createCandidateURL = base_url + '/blog';
  const [formData, setFormData] = useState();
  const MySwal = withReactContent(Swal)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      Joining_Salary: " ",
      
    },

    validationSchema: Yup.object({

      Education: Yup.string().min(3).max(25).required("Please Enter First Name"),
      
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
    }
  })
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
          <br></br>
          <div className="top">
            <h1>Charges and Availability</h1>
          </div>
          <br></br>
          {/* <Button
            style={{ marginTop: 100, color: "white", backgroundColor: "Blue" }}
            onClick={handleModal}
          >
            Add Exp
          </Button> */}
          <Button 
          variant="primary" onClick={handleShow}>
        Add Charges and Availability
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header >
          <Modal.Title>Add Joining Salary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label >Joining Salary</Form.Label>
              <Form.Control
                type="number"
                name="Joining_Salary"
                placeholder="0000"
                autoFocus
              />
            </Form.Group>
            
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>
      <div className="align-self-end ml-auto">
              <Link to="/Totexp" style={{ marginLeft: 545, color: "white", backgroundColor: "Blue" }}
                type="submit" color="primary"
                // className="barAddButton"
                className="btn"
              >
                Previous
              </Link >
              <Button
              type="submit" color="primary"
              style={{ marginLeft: 2, color: "white", backgroundColor: "Blue" }}
              // className="btn"
              >Save</Button>
              {/* <Link  style={{ marginLeft: 2, color: "white", backgroundColor: "Blue" }}
                type="submit" color="primary"
                // className="barAddButton"
                className="btn"
              >
                Save
              </Link > */}
              
            </div>
          {/* <form
            autoComplete="off"
            onSubmit={e => {
              e.preventDefault()
              validation.handleSubmit()
              return false
            }}
          > */}
          {/* {formvalue> 0?<button onClick={()=>setFormValue(s=> s-1)}>Back</button>: null} */}
          {/* <div className="bottom">
              
            </div> */}

          {/* <br /> */}
          {/* <div className='form'> */}
          {/* <div className='experience-form'> */}

          {/* <div className="formInput">
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
              </div> */}
          {/* </div> */}
          {/* </div> */}

          {/* <br /><br /> */}
          {/* <Button type="submit" color="primary" className="w-md"
            style={{marginLeft: 2, color: "white", backgroundColor:"Blue"}}>
              Submit
            </Button> */}

          {/* </form> */}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Charg