import React, { useEffect, useState } from "react"

import { useFormik } from "formik"
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

const NewJob = () => {
  // Form validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
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
    onSubmit: async(values) => {
      console.log("On Submit=>",values)
      try {
        fetch('http://localhost:3000/Data', {
            method: 'POST',
            body:JSON.stringify(values),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
        .then((response) =>response.json())
        .then((json) => console.log(json));
      } catch (error) {
        console.log(error);
      }
    },
  })
// console.log(validation)
  return (
    <React.Fragment>
      <div>
        <Container fluid={true}>
          <Col lg={12}>
            <Card>
              <CardBody>
                <Form
                  onSubmit={e => {
                    e.preventDefault()
                    validation.handleSubmit()
                    return false
                  }}
                >
                  <div className="row mb-4">
                    <Label
                      className="col-sm-3 col-form-label"
                    >
                      First Name
                    </Label>
                    <Col sm={9}>
                      <Input
                        name="first_name"
                        type="text"
                        className="form-control"
                        id="horizontal-firstname-Input"
                        placeholder="eg: senara"
                        onChange={validation.handleChange}
                        value={validation.values.first_name || ""}
                        onBlur={validation.handleBlur}
                        // invalid={
                        //   validation.touched?.first_name &&
                        //   validation.errors?.first_name
                        //     ? true
                        //     : false
                        // }
                      />
                      {/* {validation.touched?.first_name &&
                      validation.errors?.first_name ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.first_name}
                        </FormFeedback>
                      ) : null} */}
                    </Col>
                  </div>
                  <div className="row mb-4">
                    <Label
                      className="col-sm-3 col-form-label"
                    >
                      Last Name
                    </Label>
                    <Col sm={9}>
                      <Input
                        name="last_name"
                        type="text"
                        className="form-control"
                        id="horizontal-firstname-Inputs"
                        placeholder="eg: senara"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.last_name || ""}
                        // invalid={
                        //   validation.touched?.last_name &&
                        //   validation.errors?.last_name
                        //     ? true
                        //     : false
                        // }
                      />
                      {/* {validation.touched?.last_name &&
                      validation.errors?.last_name ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.last_name}
                        </FormFeedback>
                      ) : null} */}
                    </Col>
                  </div>
                  <div className="row mb-4">
                    <Label
                      className="col-sm-3 col-form-label"
                    >
                      Email
                    </Label>
                    <Col sm={9}>
                      <Input
                        name="email"
                        className="form-control"
                        placeholder="Enter email"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email || ""}
                        // invalid={
                        //   validation.touched?.email && validation.errors?.email
                        //     ? true
                        //     : false
                        // }
                      />
                      {/* {validation.touched?.email && validation.errors?.email ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.email}
                        </FormFeedback>
                      ) : null} */}
                    </Col>
                  </div>
                  <div className="row justify-content-end">
                    <Col sm={9}>
                      <div>
                        <Button type="submit" color="primary" className="w-md">
                          Submit
                        </Button>
                      </div>
                    </Col>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Container>
        {/* container-fluid */}
      </div>
    </React.Fragment>
  )
}
export default NewJob

const tableData = [{
  "first_name": "ACE534C",
  "last_name": "Back-end Developer",
  "email": "Galadrial"
}]