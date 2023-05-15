import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../config";
import { toast } from "react-toastify";
// -----------------
const PasswordReset = () => {
  // -----------------
  const navigate = useNavigate();
  const { id, token } = useParams();
  // console.log(id, token);
  // -----------------
  const userValid = async () => {
    const validUser = await axios.get(
      `${URL}/users/resetpassword/${id}/${token}`
    );

    if (validUser) {
      // console.log("ValidaUser");
    } else {
      // console.log("Invalid user");
    }
  };
  // -----------------
  useEffect(() => {
    userValid();
  }, []);
  // -----------------
  const formik = useFormik({
    initialValues: {
      password: "",
      cpassword: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const user = await axios.post(`${URL}/users/${id}/${token}`, values);
        // console.log(values);
        resetForm({ values: "" });
        toast.success("Successfully Password reset", { autoClose: 2000 });
        setTimeout(() => {
          navigate("/");
        }, 2000);
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
        <h3 className="text-center">Password Reset</h3>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="password">New Password</label>
          <input
            type={"password"}
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="form-control"
            placeholder="Enter your new password"
          />
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type={"password"}
            id="cpassword"
            name="cpassword"
            onChange={formik.handleChange}
            value={formik.values.cpassword}
            className="form-control"
            placeholder="Confirm your new password"
          />
          <div className="register-container">
            <input
              type="submit"
              className="btn btn-primary mt-2"
              value="Reset"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
// -----------------
export default PasswordReset;
// -----------------
