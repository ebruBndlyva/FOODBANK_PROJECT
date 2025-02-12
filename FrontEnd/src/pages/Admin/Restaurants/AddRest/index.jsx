import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { usePostRestaurantMutation } from '../../../../Redux/services/RestaurantCreateApi';
import style from "../../../Auth/style.module.css";
import { useGetCuisinesQuery } from '../../../../Redux/services/CuisineCreateApi';
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function AddRestaurant() {
    const [postRestaurant] = usePostRestaurantMutation();
    const navigate = useNavigate();
    const { data, isLoading, refetch } = useGetCuisinesQuery();
    const [selectedCuisines, setSelectedCuisines] = useState([]);
console.log(data);
    const handleCuisineChange = (selectedOptions) => {
        setSelectedCuisines(selectedOptions);
        formik.setFieldValue("cuisine", selectedOptions.map((c) => c.value));
    };

    const handleFileChange = (event) => {
        formik.setFieldValue(event.target.name, event.target.files[0]);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            openTime: '',
            endTime: '',
            cuisine: [],
            description: '',
            logo: '',
            restAddress: '',
            image: '',
            latitude: '',
            longitude: '',
            owner: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Restaurant name is required'),
            openTime: Yup.string(),
            endTime: Yup.string(),
            cuisine: Yup.array().min(1, 'At least one cuisine is required'),
            restAddress: Yup.string().required('Address is required'),
            latitude: Yup.number().required('Latitude is required'),
            longitude: Yup.number().required('Longitude is required'),
            owner: Yup.string().required('Owner is required'),
        }),
        onSubmit: async (values) => {
            try {
                values.cuisine = selectedCuisines.map(c => c.value);
                await postRestaurant(values);
                alert('Restaurant added successfully!');
                await refetch();
                navigate("/admin/restaurants");
            } catch (error) {
                console.log('Error adding restaurant:', error);
                alert('Failed to add restaurant');
            }
        },
    });

    return (
        <div style={{ marginTop: "80px", padding: "20px 60px", fontSize: "13px" }}>
            <form onSubmit={formik.handleSubmit} style={{ backgroundColor: "white", padding: "20px" }}>
                <div>
                    <label htmlFor="name">Restaurant Name <span>*</span></label>
                    <input id="name" name="name" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} placeholder="Restaurant name" />
                    {formik.touched.name && formik.errors.name && <div>{formik.errors.name}</div>}
                </div>

                <div className={style.input}>
                    <div>
                        <label htmlFor="openTime">Opening Time</label>
                        <input id="openTime" name="openTime" type="time" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.openTime} />
                    </div>
                    <div>
                        <label htmlFor="endTime">Closing Time</label>
                        <input id="endTime" name="endTime" type="time" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.endTime} />
                    </div>
                </div>

                <label htmlFor="cuisine">Cuisine</label>
                {isLoading ? (<h5>Loading...</h5>) : (
                   <Select
                   isMulti
                   options={data?.map(cuisine => ({ value: cuisine.id, label: cuisine.name })) || []}
                   value={selectedCuisines}
                   onChange={handleCuisineChange}
                   placeholder="Select cuisines..."
                 />
                )}
                {formik.touched.cuisine && formik.errors.cuisine && <div>{formik.errors.cuisine}</div>}

                <div>
                    <label htmlFor="restAddress">Restaurant Address <span>*</span></label>
                    <input id="restAddress" name="restAddress" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.restAddress} placeholder="Restaurant address" />
                    {formik.touched.restAddress && formik.errors.restAddress && <div>{formik.errors.restAddress}</div>}
                </div>

                <div>
                    <label htmlFor="owner">Owner ID <span>*</span></label>
                    <input id="owner" name="owner" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.owner} placeholder="Owner ID" />
                    {formik.touched.owner && formik.errors.owner && <div>{formik.errors.owner}</div>}
                </div>
                
                <div className={style.input}>
                    <div>
                        <label htmlFor="latitude">Latitude <span>*</span></label>
                        <input id="latitude" name="latitude" type="number" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.latitude || ""} placeholder="Latitude" />
                    </div>
                    <div>
                        <label htmlFor="longitude">Longitude <span>*</span></label>
                        <input id="longitude" name="longitude" type="number" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.longitude || ""} placeholder="Longitude" />
                    </div>
                </div>

                <div>
                    <label htmlFor="logo">Restaurant Logo</label>
                    <input id="logo" name="logo" type="file" onChange={handleFileChange} />
                </div>
                <div>
                    <label htmlFor="image">Restaurant Image</label>
                    <input id="image" name="image" type="file" onChange={handleFileChange} />
                </div>

                <button type="submit">Add Restaurant</button>
            </form>
        </div>
    );
}

export default AddRestaurant;
