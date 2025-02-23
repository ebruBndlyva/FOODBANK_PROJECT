import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import { PhoneInput } from 'react-international-phone';
import "react-international-phone/style.css";
import { TbXboxX } from 'react-icons/tb'
import "./style.css"
import { useGetTablesQuery } from '../../../Redux/services/TableCreateApi';
import { useCreateReservationMutation } from '../../../Redux/services/ReservCreateApi';
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom"
import Swal from 'sweetalert2';
function ReservationCard() {
    const { data, isLoading, isError } = useGetTablesQuery()
    const [createReservation] = useCreateReservationMutation()
    const token = localStorage.getItem("token")
    const { id } = useParams()

    const user = jwtDecode(token)
    console.log(user.id);

    if (isLoading) {
        return <h3>...Loading</h3>;
    }

    if (isError) {
        return <h3>Error loading Table data</h3>;
    }

    const initialValues = {
        date: null,
        guest: 1,
        timeSlot: "",
        table: "",
        phone: "",
    };

    const validationSchema = Yup.object({
        date: Yup.date().required("Please select a date"),
        guest: Yup.number().min(1).required("Please select the number of guest"),
        timeSlot: Yup.string().required("Please select a time slot"),
        table: Yup.string().required("Please select a table"),
        phone: Yup.string().required("Please enter your phone number"),
    });

    const handleSubmit = async (values) => {
        const reservationData = {
            date: values.date,
            guest: values.guest,
            timeSlot: values.timeSlot,
            table: values.table,
            phone: values.phone,
            customer: user.id,
            restaurant: id
        };
        console.log(reservationData);
        await createReservation(reservationData);
        Swal.fire({
            title: 'Reservation successful!',
            text: 'Please check your email for confirmation.',
            icon: 'success',
            position: 'top-start',
            showConfirmButton: false,
            timer: 3000,
            customClass: {
              popup: 'custom-swal-popup'
            },
          })
            .then(() => {
                document.querySelector('.reservation_wrapper').style.display = 'none';
                document.querySelector('.overlay').style.display = 'none';
            });

    };

    return (
        <div className='content'>
            <div className="overlay" ></div>
            <div className="reservation_wrapper">
                <div className="reserv-head">
                    <button><TbXboxX /></button>
                    <h3>Book Table</h3>
                    <img src="https://demo.food-bank.xyz/frontend/images/gif/table.gif" alt="reservationImg" />
                </div>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ values, setFieldValue, touched, errors }) => (
                        <Form className="p-4 border rounded-lg w-80 bg-white shadow-md">

                            <div className="mb-4" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <label className="block text-gray-700">Pick a Date:</label>
                                <DatePicker
                                    selected={values.date}
                                    onChange={(date) => setFieldValue("date", date)}
                                    dateFormat="dd MMM yyyy"
                                    className="w-full p-2 border rounded"
                                    placeholderText="Select a date"
                                />
                                <ErrorMessage name="date" component="div" className="text-red-500 text-sm" />
                            </div>

                            {/* Guests  */}
                            <div className='guest-wrapper' >
                                <label>Number of Guests:</label>
                                <div className='guest'>
                                    <button
                                        type="button"

                                        onClick={() => setFieldValue("guest", Math.max(1, values.guest - 1))}
                                    >
                                        -
                                    </button>
                                    <span>{values.guest}</span>
                                    <button
                                        type="button"
                                        onClick={() => setFieldValue("guest", values.guest + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>


                            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                <label>Pick a Time Slot:</label>
                                <div className="times">
                                    {["12:00 PM - 01:00 PM", "01:00 PM - 02:00 PM", "02:00 PM - 03:00 PM"].map((slot) => (
                                        <button
                                            key={slot}
                                            type="button"
                                            style={values.timeSlot === slot ? { backgroundColor: "#ed2049", color: "white" } : { backgroundColor: "white" }}
                                            onClick={() => setFieldValue("timeSlot", slot)}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                                <ErrorMessage name="timeSlot" component="div" className="text-red-500 text-sm" />
                            </div>

                            {/* Stol Seçimi */}
                            <div>
                                <label>Choose a Table:</label>
                                <Field as="select" name="table" className="w-full p-2 border rounded">
                                    <option value="">Select a table</option>
                                    {data.map((table) => (
                                        <option key={table._id} value={table._id}>
                                            {table.name} (Seats: {table.capacity})
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="table" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="phone">
                                <label htmlFor="phone">Phone <span>*</span></label>
                                <PhoneInput
                                    id="phone"
                                    defaultCountry="ua"
                                    value={values.phone}
                                    onChange={(value) => setFieldValue("phone", value)}
                                    onBlur={() => setFieldValue("phone", values.phone.trim())}
                                />
                                {touched.phone && errors.phone ? (
                                    <div className="error">{errors.phone}</div>
                                ) : null}
                            </div>
                            <button type="submit" className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
                                Request To Book
                            </button>
                        </Form>
                    )}
                </Formik>

            </div>
        </div>
    )
}

export default ReservationCard