import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utility/AuthContext";

const Auth = () => {
  const [login, setLogin] = useState(true);
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(AuthContext);

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = (data) => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/auth/${
          login ? "login" : "register"
        }`,
        data
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          if (login) {
            localStorage.setItem("accessToken", response.data.accessToken);
            setLoggedIn({
              username: response.data.username,
              id: response.data.id,
              status: true,
            });
            navigate("/total");
          }
        }
      });
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3)
      .max(15)
      .required("You must input an username!"),
    password: Yup.string()
      .min(4)
      .max(20)
      .required("You must input a password!"),
  });

  return (
    <div className="authContainer">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer shadow-md shadow-cyan-800/10 border-2 border-cyan-800/10">
          <ErrorMessage name="username" component="span" />
          <Field id="inputUsername" name="username" placeholder="Username" />
          <ErrorMessage name="password" component="span" />
          <Field
            id="inputPassword"
            name="password"
            type="password"
            autoComplete="off"
            placeholder="Password"
          />

          <Button
            type="submit"
            className="bg-cyan-500 shadow-cyan-500/50 mt-5 mb-5"
          >
            {login ? "Sign in" : "Sign up"}
          </Button>
          <div className="flex flex-row items-center justify-center space-x-3">
            <hr />
            <label className="text-center text-gray-600 text-xs font-semibold">
              {" "}
              OR{" "}
            </label>
            <hr />
          </div>
          <Button
            type="button"
            className="bg-gray-400 shadow-gray-500/50 mt-3 mb-2"
            onClick={() => setLogin(!login)}
          >
            {login ? "Sign up" : "Sign in"}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default Auth;
