import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import Notify from "./Notify";
import { lightTheme, login, setAccessToken } from "../store";
import { useDispatch } from "react-redux";

const Auth = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = (data) => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/auth/${
          isLogin ? "login" : "register"
        }`,
        data
      )
      .then((response) => {
        if (response.data.error) {
          setMessage(response.data.error);
          setShowModal(true);
        } else {
          if (isLogin) {
            dispatch(lightTheme());
            dispatch(setAccessToken(response.data.accessToken));
            dispatch(
              login({
                username: response.data.username,
                id: response.data.id,
              })
            );
            navigate("/total");
          } else {
            setMessage(response.data);
            setShowModal(true);
          }
        }
      });
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username must contain at least 3 characters.")
      .max(15, "Username must contain a maximum of 15 characters.")
      .required("You must input an username!"),
    password: Yup.string()
      .min(4, "Password must contain at least 4 characters.")
      .max(20, "Password must contain a maximum of 20 characters.")
      .required("You must input a password!"),
  });

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer w-80 md:w-96 shadow-md shadow-cyan-800/10 border-2 border-cyan-800/10">
          <div className="text-2xl font-bold text-center text-slate-700 mb-4">
            {isLogin ? "Sign in" : "Create account"}
          </div>
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
            className="bg-cyan-500 shadow-cyan-500/50 mt-5 hover:bg-cyan-500/80"
          >
            {isLogin ? "Sign in" : "Sign up"}
          </Button>
          <div className="flex flex-row items-center justify-center space-x-3 mt-3">
            <hr className="authHr" />
            <label className="text-center text-xs font-semibold text-slate-600">
              OR
            </label>
            <hr className="authHr" />
          </div>
          <div
            className="text-center self-center w-fit font-semibold text-sm mt-3 mb-1 text-slate-600 hover:text-slate-900 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "SIGN UP" : "SIGN IN"}
          </div>
        </Form>
      </Formik>
      {showModal && <Notify onClose={handleClose} message={message} />}
    </div>
  );
};

export default Auth;
