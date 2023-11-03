import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../../config/axios.js";
import Swal from "sweetalert2";
import "./Signup.css";

//Importing Icons
import EmailIcon from "./assets/envelope-solid.svg";
import UserIcon from "./assets/user-solid.svg";
import EyeSlash from "./assets/eye-slash-solid.svg";
import EyeSolid from "./assets/eye-solid.svg";

export const Signup = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    username: Yup.string()
      .min(4, "Username must be at least 4 characters")
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      )
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPass: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const showPassword = () => {
    setShowPass(!showPass);
  };

  const showConfirmPass = () => {
    setShowConfirm(!showConfirm);
  };

  const processSignup = async (values) => {
    const { email, password, username } = values;

    const body = {
      email,
      username,
      password,
    };
    try {
      const res = await axiosClient.post("/signup", body);
      if (res.status !== 200) {
        Swal.fire({
          icon: "error",
          type: "error",
          title: "An error Ocurred",
          text: "There was an error creating your account please try again later",
        });
      } else {
        Swal.fire(
          "Account Created Successfully",
          "Please login using your credentials",
          "success"
        );
        navigate("/login");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        type: "error",
        title: "An error Ocurred",
        text: "There was an error creating your account, Please try again later!",
      });
    }
  };

  return (
    <div>
      <h2>Create an Account</h2>
      <div className="contenedor-formulario">
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPass: "",
          }}
          validationSchema={validationSchema}
          onSubmit={processSignup}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <div className="campo">
                <label>Email</label>
                <div className="input-container">
                  <Field
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                  />
                  <img
                    src={EmailIcon}
                    alt="Email Icon"
                    className="input-icon"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="campo">
                <label>Username</label>
                <div className="input-container">
                  <Field
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                  />
                  <img src={UserIcon} alt="User Icon" className="input-icon" />
                </div>
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="campo">
                <label>Password</label>
                <div className="input-container">
                  <Field
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                  />
                  <img
                    src={showPass ? EyeSlash : EyeSolid}
                    alt={showPass ? "Hide" : "Show"}
                    onClick={showPassword}
                    className="password-toggle-icon"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="campo">
                <label>Confirm Password</label>
                <div className="input-container">
                  <Field
                    type={showConfirm ? "text" : "password"}
                    name="confirmPass"
                    placeholder="Re-enter Password"
                  />
                  <img
                    src={showConfirm ? EyeSlash : EyeSolid}
                    alt={showConfirm ? "Hide" : "Show"}
                    onClick={showConfirmPass}
                    className="password-toggle-icon"
                  />
                </div>
                <ErrorMessage
                  name="confirmPass"
                  component="div"
                  className="error-message"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="btn btn-verde btn-block"
              >
                {isSubmitting ? "Signing up..." : "Signup"}
              </button>
            </Form>
          )}
        </Formik>
        <div className="Login">
          <p>
            Already Have an account?{" "}
            <Link to={"/login"} className="Login-Link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
