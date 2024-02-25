import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const CreateItem = ({ endpoint }) => {
  const navigate = useNavigate();
  const initialValues = {
    title: "",
    value: null,
    location: "",
  };

  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/${endpoint}`, data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        navigate(`/${endpoint}`);
      });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a title"),
    value: Yup.number("You can use only positive numbers and '.'")
      .positive("You must input a number larger than 0")
      .required("You must input a value"),
    location: Yup.string().min(3).max(25),
  });

  return (
    <div className="mt-12">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer shadow-md shadow-cyan-800/10 border-2 border-cyan-800/10 w-72 md:w-96">
          <label>Title:</label>
          <ErrorMessage name="title" component="span" />
          <Field
            id="inputCreateItem"
            name="title"
            placeholder="Ex. Shopping..."
          />
          <label>Value:</label>
          <ErrorMessage name="value" component="span" />
          <Field
            id="inputCreateItem"
            name="value"
            placeholder="Ex. 149.99..."
          />
          <label>Location:</label>
          <ErrorMessage name="location" component="span" />
          <Field
            id="inputCreateItem"
            name="location"
            placeholder="Ex. Springfield..."
          />

          <Button
            type="submit"
            className="bg-cyan-500 shadow-cyan-500/50 hover:bg-cyan-600/90 mt-5"
          >
            Create item
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateItem;
