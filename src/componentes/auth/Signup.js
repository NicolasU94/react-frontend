import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../../config/axios.js";
import Swal from "sweetalert2";
import "./Signup.css";

export const Signup = () => {
  const navigate = useNavigate();

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
                <Field
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="campo">
                <label>Username</label>
                <Field
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="campo">
                <label>Password</label>
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="campo">
                <label>Confirm Password</label>

                <Field
                  type="password"
                  name="confirmPass"
                  placeholder="Re-enter Password"
                />
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
