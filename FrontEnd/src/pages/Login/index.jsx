import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import style from "../Auth/style.module.css"
import { NavLink } from "react-router-dom"
import { useLoginUserMutation } from '../../Redux/services/UserCreateApi';
function Login() {
  const [loginUser] = useLoginUserMutation()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,



    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .required("Required"),


    }),
    onSubmit: async (values) => {
     
      console.log(values);
      try {
        const response = await loginUser(values).unwrap();
      
      localStorage.setItem("token", response.token)
      } catch (error) {
        console.error("Login failed:", error);
        if (error.data) {
          console.error("Backend-dən gələn cavab:", error.data);
        }
      }
    },
  });
  return (

    <div className={style.login_wrapper}>
      <div className={style.login_head}>
        <h3>Welcome Back!</h3>
        <p>Please enter your login details below</p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className={style.label}>
          <label htmlFor="email">Email :</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder='Email'

          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className={style.label}>
          <label htmlFor="password">Password :</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder='Password'
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>
        <div className={style.label}>
          <div className={style.forget_group}>
            <div className={style.role}>
            <input
                id="remember"
                name="remember"
                type="checkbox"
                onChange={() => formik.setFieldValue("remember", !formik.values.remember)}
                onBlur={formik.handleBlur}
                checked={formik.values.remember} 
              />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <NavLink to={"/password/request"}>Forget Password?</NavLink>
          </div>
        </div>
        <button type="submit">Login</button>
      </form>
      <div className={style.auth_devide}>
        <span>Or Login With</span>
      </div>
      <div className={style.auth_sync}>
        <NavLink>
          <img src="https://demo.food-bank.xyz/frontend/images/social/google.png" alt="google" />
          <span>Google</span>
        </NavLink>
        <NavLink>
          <img src="https://demo.food-bank.xyz/frontend/images/social/facebook.png" alt="facebook" />
          <span>Facebook</span>
        </NavLink>
      </div>
    </div>

  );
}

export default Login