import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const CreateOutcome = () => {
  const navigate = useNavigate();
  const initialValues = {
    outcomeTitle: "",
    outcomeValue: null,
    outcomeLocation: "",
  };

  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/outcomes`, data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        navigate("/outcomes");
      });
  };

  const validationSchema = Yup.object().shape({
    outcomeTitle: Yup.string().required("You must input a title"),
    outcomeValue: Yup.number("You can use only positive numbers and '.'")
      .positive("You must input a number larger than 0")
      .required("You must input a value"),
    outcomeLocation: Yup.string().min(3).max(25),
  });

  return (
    <div className="createOutcomeContainer">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer shadow-md shadow-cyan-800/10 border-2 border-cyan-800/10">
          <label>Title:</label>
          <ErrorMessage name="outcomeTitle" component="span" />
          <Field
            id="inputCreateOutcome"
            name="outcomeTitle"
            placeholder="Ex. Shopping..."
          />
          <label>Value:</label>
          <ErrorMessage name="outcomeValue" component="span" />
          <Field
            id="inputCreateOutcome"
            name="outcomeValue"
            placeholder="Ex. 149.99..."
          />
          <label>Location:</label>
          <ErrorMessage name="outcomeLocation" component="span" />
          <Field
            id="inputCreateOutcome"
            name="outcomeLocation"
            placeholder="Ex. Springfield..."
          />

          <Button type="submit" className="bg-cyan-500 shadow-cyan-500/50 mt-5">
            Create outcome
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateOutcome;
