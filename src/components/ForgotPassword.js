import { TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { URL } from "../config";
import { toast } from "react-toastify";
// -----------------

const ForgotPassword = () => {
  // -----------------
  const [message, setMessage] = useState(false);
  // -----------------
  const formValidation = yup.object({
    email: yup.string().required("*Email is mandatory"),
  });
  // -----------------
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: formValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        const user = await axios.post(`${URL}/users/sendpasswordlink`, values);
        // console.log(values);
        resetForm({ values: "" });
        setMessage(true);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data, { autoClose: 2000 });
        // alert(error.response.data);
      }
    },
  });
  // -----------------
  return (
    <div className="login-section">
      <div className="form-container">
        <h3 className="text-center">Forgot Password</h3>
        <form onSubmit={formik.handleSubmit}>
          {message ? (
            <p style={{ color: "green", fontWeight: "bold" }}>
              Password reset link sent to your email!!!
            </p>
          ) : (
            <></>
          )}
          <TextField
            label="Email"
            variant="outlined"
            type={"email"}
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="form-control"
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
            helperText={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
          />
          <div className="register-container">
            <input
              type="submit"
              className="btn btn-primary mt-2"
              value="Send link"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
// -----------------
export default ForgotPassword;
// -----------------
