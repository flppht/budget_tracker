import { useState } from "react";
import Button from "./Button";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Notify from "./Notify";
import { useDispatch, useSelector } from "react-redux";
import LightModeOutlinedIcon from "@mui/icons-material/LightMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkMode";
import { darkTheme, lightTheme } from "../store";
import { RootState } from "../store";

type DataType = {
  oldPassword: string;
  newPassword: string;
};

const Settings = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const accessToken = useSelector(
    (state: RootState) => state.accessToken.token
  );
  const [showNotify, setShowNotify] = useState(false);
  const [message, setMessage] = useState("");
  const isLightTheme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  const initialValues = {
    oldPassword: "",
    newPassword: "",
  };

  const onSubmit = (data: DataType) => {
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
          <div className="flex flex-row text-xl font-semibold text-slate-800 items-center">
            <div className="w-full">Username: {auth.username}</div>
            <div className="cursor-pointer pb-0.5" title="Toggle the theme">
              {isLightTheme === "light" ? (
                <LightModeOutlinedIcon
                  sx={{ color: "#e8e231" }}
                  onClick={() => dispatch(darkTheme())}
                />
              ) : (
                <DarkModeOutlinedIcon
                  sx={{ color: "#737372" }}
                  onClick={() => dispatch(lightTheme())}
                />
              )}
            </div>
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
              className="dark:bg-gray-100"
            />
            <ErrorMessage name="newPassword" component="span" />
            <Field
              id="inputNewPassword"
              name="newPassword"
              type="password"
              autoComplete="off"
              placeholder="Enter new password..."
              className="dark:bg-gray-100"
            />
            <Button
              type="submit"
              className="bg-cyan-500 dark:bg-cyan-600 hover:bg-cyan-600/80 mt-5 px-4 w-fit md:w-1/2"
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
