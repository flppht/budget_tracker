import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const CreateIncome = () => {
  const navigate = useNavigate();

  const initialValues = {
    incomeTitle: "",
    incomeValue: null,
    incomeLocation: "",
  };

  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/income`, data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        navigate("/income");
      });
  };

  const validationSchema = Yup.object().shape({
    incomeTitle: Yup.string().required("You must input a title"),
    incomeValue: Yup.number()
      .positive("You must input a number larger than 0")
      .required("You must input a value"),
    incomeLocation: Yup.string().min(3).max(25),
  });

  return (
    <div className="createIncomeContainer">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer shadow-md shadow-cyan-800/10 border-2 border-cyan-800/10">
          <label>Title:</label>
          <ErrorMessage name="incomeTitle" component="span" />
          <Field
            id="inputCreateIncome"
            name="incomeTitle"
            placeholder="Ex. Salary..."
          />
          <label>Value:</label>
          <ErrorMessage name="incomeValue" component="span" />
          <Field
            id="inputCreateIncome"
            name="incomeValue"
            placeholder="Ex. 2199.49..."
          />
          <label>Location:</label>
          <ErrorMessage name="incomeLocation" component="span" />
          <Field
            id="inputCreateIncome"
            name="incomeLocation"
            placeholder="Ex. Company d.o.o..."
          />

          <Button type="submit" className="bg-cyan-500 shadow-cyan-500/50 mt-5">
            Create income
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateIncome;
