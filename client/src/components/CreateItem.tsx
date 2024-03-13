import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

type CreateItemType = {
  title: string;
  value: number;
  location?: string;
};

const CreateItem = ({ endpoint }) => {
  const navigate = useNavigate();
  const accessToken = useSelector(
    (state: RootState) => state.accessToken.token
  );
  const initialValues = {
    title: "",
    value: null,
    location: "",
  };

  const onSubmit = (data: CreateItemType) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/${endpoint}`, data, {
        headers: {
          accessToken,
        },
      })
      .then(() => {
        navigate(`/${endpoint}`);
      });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a title"),
    value: Yup.number()
      .positive("You must input a number larger than 0")
      .typeError("You can use only positive numbers and '.'")
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
            className="dark:bg-gray-100"
          />
          <label>Value:</label>
          <ErrorMessage name="value" component="span" />
          <Field
            id="inputCreateItem"
            name="value"
            placeholder="Ex. 149.99..."
            className="dark:bg-gray-100"
          />
          <label>Location:</label>
          <ErrorMessage name="location" component="span" />
          <Field
            id="inputCreateItem"
            name="location"
            placeholder="Ex. Springfield..."
            className="dark:bg-gray-100"
          />

          <Button
            type="submit"
            className="bg-cyan-500 dark:bg-cyan-600 shadow-cyan-500/50 hover:bg-cyan-600/90 mt-5"
          >
            Create transaction
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateItem;
