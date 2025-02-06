import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import style from "../Auth/style.module.css"
import { NavLink } from "react-router-dom"
import { useRequestUserPaswMutation } from '../../Redux/services/UserCreateApi';

function RequestPassword() {
  const [requestUserPasw] = useRequestUserPaswMutation()
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await requestUserPasw(values)
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className='content'>
      <div className={style.reset}>
        <div className={style.reset_wrapper}>
          <h3>Recover Password</h3>

          <form onSubmit={formik.handleSubmit}>
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
            <button type="submit">Send Password Reset Link</button>
          </form>
        </div>
        <div>Don't have account? <NavLink>Sign up</NavLink></div>
      </div>
    </div>
  );
}

export default RequestPassword