import React, { useState,useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "../user.scss"
import { toast, ToastContainer } from "react-toastify";
import axios from "axios"
const Mainuser = () => {
  const [required, setRequired] = useState('email')
  const [info, setinfo] = useState([]);
  const userinfos = async () => {
    try {
      const res = await axios.get("http://localhost:8989/api/form");
      setinfo(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Failed to retrieve Datas entries:", error);
    }
  };
  useEffect(()=>{
    userinfos();
  },[])
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      confirmEmail: '',
      phone: '',
      rating: '',

    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      confirmEmail: Yup.string().email('Invalid email address').required('Required'),
    rating: Yup.number()
        .typeError("Rating must be a number")
        .required("Required"),
          }),
          onSubmit: (values) => {
            if (values.email !== values.confirmEmail) {
              toast.error("Email and confirmEmail do not match", {
                autoClose: 1000,
              });
              return;
            }
      
            const existingEntry = info.find((entry) => entry.email === values.email);
            if (existingEntry) {
              toast.error("Email already exists", {
                autoClose: 1000,
              });
              return;
            } else {
              axios.post("http://localhost:8989/api/form", values);
              toast.success("Post is successfully!", {
                autoClose: 1000,
              });
            }
      
            formik.resetForm();
          },

  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className='first-name'>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            className="first-name-input"
            placeholder='First Name (required)'
          /></div>

        {formik.touched.firstName && formik.errors.firstName ? (
          <div style={{ color: "red" }}>{formik.errors.firstName}</div>
        ) : null}
        <div className='last-name'>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            className="last-name-input"
            placeholder='Last Name (required)'
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div style={{ color: "red" }}>{formik.errors.lastName}</div>
          ) : null}
        </div>

        <div className='email-inp'>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            className="email"
            placeholder='Email (required)'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className='email-inp'>
          <label htmlFor="confirmEmail">Confirm Email</label>
          <input
            id="confirmEmail"
            name="confirmEmail"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmEmail}
            className="confirm-email"
            placeholder='Confirm Email (required)'
          />
          {formik.touched.confirmEmail && formik.errors.confirmEmail ? (
            <div style={{ color: "red" }}>{formik.errors.confirmEmail}</div>
          ) : null}
        </div>
        {required === "text" &&
          <div className='inp'>
            <label>Phone </label>
            <input
              id="phone"
              name="phone"
              type="number"
              required={required === 'text'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className="confirm-email"
              placeholder='Phone'
            />
          </div>}
        <div className='inp-radio'>
          <p>Send Notifications</p>
          <div>
            <input onChange={() => setRequired('email')} checked={required === 'email'} type="radio" id="option1" name="myRadio" value="option1" />
            <label htmlFor="option1">Email</label>

            <input onChange={() => setRequired('text')} checked={required === 'text'} type="radio" id="option1" name="myRadio" value="option2" />
            <label htmlFor="option2">Text</label>
          </div>
        </div>
        <div className='inp'>
          <label htmlFor="rating">Rating</label>
          <input
            id="rating"
            name="rating"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rating}
            type='number' />
        </div>
        {formik.touched.rating && formik.errors.rating ? (
            <div style={{ color: "red" }}>{formik.errors.rating}</div>
          ) : null}
        <div className="checkbox">
          <input type="checkbox" id="myCheckbox" name="myCheckbox" value="myValue" />
          <label htmlFor="myCheckbox">Send me your catalog</label>
        </div>

        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </>
  );
};

export default Mainuser;