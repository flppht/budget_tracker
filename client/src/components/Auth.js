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
            localStorage.setItem("accessToken", response.data);
            setLoggedIn(true);
            navigate("/");
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
          <label className="authLabel">Username:</label>
          <ErrorMessage name="username" component="span" />
          <Field id="inputUsername" name="username" />
          <label className="authLabel">Password:</label>
          <ErrorMessage name="password" component="span" />
          <Field
            id="inputPassword"
            name="password"
            type="password"
            autoComplete="off"
          />

          <Button type="submit" className="bg-cyan-500 shadow-cyan-500/50 mt-5">
            {login ? "Sign in" : "Sign up"}
          </Button>
          <div className="mt-4">
            <hr />
            <div className="text-center mt-2">or</div>
            <div
              onClick={() => setLogin(!login)}
              className="w-full text-center mb-2"
            >
              <Button
                type="button"
                className="bg-gray-400 shadow-gray-500/50 mt-2"
              >
                {login ? "Sign up" : "Sign in"}
              </Button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Auth;
