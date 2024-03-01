import React, { useState } from "react";
import Button from "./Button";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Notify from "./Notify";
import { useSelector } from "react-redux";

const Settings = () => {
  const auth = useSelector((state) => state.auth);
  const accessToken = useSelector((state) => state.accessToken.token);
  const [showNotify, setShowNotify] = useState(false);
  const [message, setMessage] = useState("");

  const initialValues = {
    oldPassword: "",
    newPassword: "",
  };

  const onSubmit = (data) => {
    axios
      .put(`${process.env.REACT_APP_SERVER_URL}/auth/changepassword`, data, {
        headers: {
          accessToken,
        },
      })
      .then((response) => {
        if (response.data.error) {
          setMessage(response.data.error);
        } else {
          setMessage(response.data);
        }
        setShowNotify(true);
      });
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(4)
      .max(20)
      .required("You must enter the old password"),
    newPassword: Yup.string()
      .min(4)
      .max(20)
      .required("You must enter the new password"),
  });

  return (
    <div className="mt-12">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer w-72 md:w-96 shadow-md shadow-cyan-800/10 border-2 border-cyan-800/10">
          <div className="text-xl font-semibold text-slate-800">
            Username: {auth.username}
          </div>
          <div className="flex flex-col mt-5 justify-center">
            <label className="font-semibold text-slate-800 mb-2">
              Change password
            </label>
            <ErrorMessage name="oldPassword" component="span" />
            <Field
              id="inputOldPassword"
              name="oldPassword"
              type="password"
              autoComplete="off"
              placeholder="Enter old password..."
            />
            <ErrorMessage name="newPassword" component="span" />
            <Field
              id="inputNewPassword"
              name="newPassword"
              type="password"
              autoComplete="off"
              placeholder="Enter new password..."
            />
            <Button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600/80 mt-5 px-4 w-fit md:w-1/2"
            >
              Change password
            </Button>
          </div>
        </Form>
      </Formik>
      {showNotify && (
        <Notify message={message} onClose={() => setShowNotify(false)} />
      )}
    </div>
  );
};

export default Settings;
