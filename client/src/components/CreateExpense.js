import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const CreateExpense = () => {
  const navigate = useNavigate();
  const initialValues = {
    expenseTitle: "",
    expenseValue: null,
    expenseLocation: "",
  };

  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/expenses`, data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        navigate("/expenses");
      });
  };

  const validationSchema = Yup.object().shape({
    expenseTitle: Yup.string().required("You must input a title"),
    expenseValue: Yup.number("You can use only positive numbers and '.'")
      .positive("You must input a number larger than 0")
      .required("You must input a value"),
    expenseLocation: Yup.string().min(3).max(25),
  });

  return (
    <div className="createExpenseContainer">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer shadow-md shadow-cyan-800/10 border-2 border-cyan-800/10">
          <label>Title:</label>
          <ErrorMessage name="expenseTitle" component="span" />
          <Field
            id="inputCreateExpense"
            name="expenseTitle"
            placeholder="Ex. Shopping..."
          />
          <label>Value:</label>
          <ErrorMessage name="expenseValue" component="span" />
          <Field
            id="inputCreateExpense"
            name="expenseValue"
            placeholder="Ex. 149.99..."
          />
          <label>Location:</label>
          <ErrorMessage name="expenseLocation" component="span" />
          <Field
            id="inputCreateExpense"
            name="expenseLocation"
            placeholder="Ex. Springfield..."
          />

          <Button type="submit" className="bg-cyan-500 shadow-cyan-500/50 mt-5">
            Create expense
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateExpense;
