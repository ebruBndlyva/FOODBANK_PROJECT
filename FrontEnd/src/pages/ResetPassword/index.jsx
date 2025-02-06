import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import style from "../Auth/style.module.css"
import { useParams } from 'react-router';
import { useResetUserPaswMutation } from '../../Redux/services/UserCreateApi';


function ResetPassword() {
  const { token } = useParams()

  const [resetUserPasw] = useResetUserPaswMutation()
  const formik = useFormik({
    initialValues: {
      password: "",
      // newPassword: ""
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .required("Required"),
      // newPassword: Yup.string()
      //   .min(6, "Password must be at least 6 characters")
      //   .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      //   .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      //   .matches(/\d/, "Password must contain at least one number")
      //   .required("Required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const {password} = values
      await resetUserPasw({
        password,
        token
      })

    },
  });
  return (
    <div className='content'>
      <div className={style.reset}>
        <div className={style.reset_wrapper}>
          <h3>Reset Password</h3>

          <form onSubmit={formik.handleSubmit}>
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
            {/* <input
              id="newPassword"
              name="newPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              placeholder='New Password'
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div>{formik.errors.newPassword}</div>
            ) : null} */}
            <button type="submit">Change Password</button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default ResetPassword