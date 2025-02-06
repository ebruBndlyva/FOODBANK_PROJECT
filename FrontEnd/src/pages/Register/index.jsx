import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import style from "../Auth/style.module.css"
import { PhoneInput } from 'react-international-phone';

import "react-international-phone/style.css";
import { useRegisterUserMutation } from '../../Redux/services/UserCreateApi';
function Register() {
  const [registerUser] = useRegisterUserMutation()
  const formik = useFormik({
    initialValues: {
      role: "customer",
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      rep_password: ''

    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      phone: Yup.string()
        .matches(/^\+?\d{10,15}$/, "Invalid phone number") // Burada formatı yoxlayır
        .required('Required'),
      address: Yup.string()
        .required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .required("Required"),
      rep_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),

    }),
    onSubmit: async (values) => {
      try {
        const { email, password, firstName, lastName, username, address, phone, role } = values;
        const response = await registerUser({ email, password, firstName, lastName, username, address, phone, role });
        console.log("Response:", response);
      } catch (error) {
        console.log("Error registering user:", error.response?.data); // **Burada error-un dəqiq mesajını gör**
      }
    },
  });
  return (


    <form onSubmit={formik.handleSubmit}>

      <div className={style.role}>
        <input
          id="customer"
          name="role"
          type="radio"
          onChange={() => formik.setFieldValue("role", "customer")}
          onBlur={formik.handleBlur}
          checked={formik.values.role === "customer"}
          value={formik.values.customer}
        />
        {formik.touched.customer && formik.errors.customer ? (
          <div>{formik.errors.customer}</div>
        ) : null}
        <label htmlFor="customer">Customer</label>
        <input
          id="restaurantOwner"
          name="role"
          type="radio"
          onChange={() => formik.setFieldValue("role", "restaurantOwner")}
          onBlur={formik.handleBlur}
          checked={formik.values.role === "restaurantOwner"}
          value={formik.values.restaurantOwner}
        />
        {formik.touched.restaurantOwner && formik.errors.restaurantOwner ? (
          <div>{formik.errors.restaurantOwner}</div>
        ) : null}
        <label htmlFor="restaurantOwner">Restaurant Owner</label>
        <input
          id="deliveryBoy"
          name="role"
          type="radio"
          onChange={() => formik.setFieldValue("role", "deliveryBoy")}
          onBlur={formik.handleBlur}
          checked={formik.values.role === "deliveryBoy"}
          value={formik.values.deliveryBoy}
        />
        {formik.touched.deliveryBoy && formik.errors.deliveryBoy ? (
          <div>{formik.errors.deliveryBoy}</div>
        ) : null}
        <label htmlFor="deliveryBoy">Delivery Man</label>
      </div>
      <div className={style.input}>
        <div className={style.label}>
          <label htmlFor="firstName">First Name <span>*</span></label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            placeholder='John'
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div>{formik.errors.firstName}</div>
          ) : null}
        </div>
        <div className={style.label}>
          <label htmlFor="lastName">Last Name <span>*</span></label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            placeholder='Doe'
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div>{formik.errors.lastName}</div>
          ) : null}
        </div>
      </div>
      <div className={style.input}>
        <div className={style.label}>
          <label htmlFor="username">Username <span>*</span></label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            placeholder='john'
          />
          {formik.touched.username && formik.errors.username ? (
            <div>{formik.errors.username}</div>
          ) : null}
        </div>
        <div className={style.label}>
          <label htmlFor="email">Email Address <span>*</span></label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder='johndoe@example.com'
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>
      </div>
      <div className={style.phone}>
        <label htmlFor="phone">Phone <span>*</span></label>
        <PhoneInput
          style={{ marginTop: "10px" }}
          id="phone"
          defaultCountry="ua"
          value={formik.values.phone}
          onChange={(value) => formik.setFieldValue("phone", value)}
          onBlur={() => formik.setFieldTouched("phone", true)}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div>{formik.errors.phone}</div>
        ) : null}
      </div>
      <div>  <label htmlFor="address">Address <span>*</span></label>
        <input
          id="address"
          name="address"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
          placeholder='House#10,Section#1,Dhaka 1216,Bangladesh'
        />
        {formik.touched.address && formik.errors.address ? (
          <div>{formik.errors.address}</div>
        ) : null}</div>
      <div className={style.input} >
        <div className={style.label}>
          <label htmlFor="password">Password <span>*</span></label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder='Create password'
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>
        <div className={style.label}>
          <label htmlFor="rep_password">Repeat Password <span>*</span></label>
          <input
            id="rep_password"
            name="rep_password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rep_password}
            placeholder='Repeat password'
          />
          {formik.touched.rep_password && formik.errors.rep_password ? (
            <div>{formik.errors.rep_password}</div>
          ) : null}
        </div>
      </div>
      <button type="submit">Register</button>
    </form>


  );
}

export default Register