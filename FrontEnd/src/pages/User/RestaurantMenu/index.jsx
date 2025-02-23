import React, { useEffect, useState } from 'react'
import './style.css'
import { IoLocationOutline } from 'react-icons/io5'
import { FaInfoCircle, FaShoppingBag, FaStar, FaTable } from 'react-icons/fa'
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useParams } from 'react-router-dom'
import { useGetRestaurantsByIdQuery } from '../../../Redux/services/RestaurantCreateApi';
import { Formik, Form, Field } from "formik";
import { TbXboxX } from "react-icons/tb";
import * as Yup from "yup";
import { useGetBasketsQuery, usePostBasketMutation } from '../../../Redux/services/BasketCreateApi';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../../Redux/slice/CounterSlice';
import ReservationCard from '../../../components/user/ReservationCard';
import { useGetDiscountFoodsQuery } from '../../../Redux/services/DiscounCreateApi';

function RestaurantMenu() {
  const [value, setValue] = useState(0);
  const { id } = useParams()
  const { data, isLoading, isError, refetch } = useGetRestaurantsByIdQuery(id)
  const [modal, setModal] = useState(false)
  const [modalMenu, setModalMenu] = useState(null)
  const [postBasket] = usePostBasketMutation()
  const count = useSelector(state => state.counter.value)
  const [reserv, setReserv] = useState(false)

  const { data: discountData, isLoading: discountLoading, isError: discountError } = useGetDiscountFoodsQuery()



  const dispatch = useDispatch()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isLoading) {
    return <h3>...Loading</h3>;
  }

  if (isError) {
    return <h3>Error loading restaurant data</h3>;
  }
  if (discountLoading) {
    return <h3>...Loading</h3>;
  }

  if (discountError) {
    return <h3>Error loading DiscountFoods data</h3>;
  }
  console.log(discountData);

  // !modal

  function ModalOpen(menu) {
    if (modal) {

      setModal(false)
      refetch()

      return
    }
    setModalMenu(menu)
    setModal(true)
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
  }



  const validationSchema = Yup.object({
    size: Yup.string().required("Please select a size"),
    addons: Yup.array(),
    instructions: Yup.string(),
  });

  return (
    <div className='restaurant'>
      <div className="content">
        <div className="restaurant_wrapper">
          {/* Restautant card */}
          <div className="restaurant_card" key={data._id}>
            <div className="restaurant_img">
              <img src={data.featuredImage} alt="cuisine" />
            </div>
            <div className="restaurant_desc">
              <div className='table_info'>
                <button onClick={() => setReserv(true)}><FaTable /> Table Order</button>
                <span><FaInfoCircle /></span>
              </div>
              <h4>{data.name}</h4>
              {
                data.cuisine.map(cuisine => (
                  <p key={cuisine._id}>{cuisine.name}</p>
                ))
              }
              <p>
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    color={index < data.rating ? "#FFD700" : "#ccc"}
                    size={18}
                  />
                ))}
                <span>({data.reviews.length} reviews)</span>
              </p>
              <p><IoLocationOutline /> {data.restaurantAddress}</p>
            </div>
          </div>
          {/* Restaurant category */}
          <div className='restaurant_category'>
            <Box
              sx={{
                flexGrow: 1,
                maxWidth: { xs: 320, sm: 780 },
                bgcolor: 'background.paper',
              }}
            >

              <Tabs

                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                aria-label="visible arrows tabs example"
                sx={{
                  [`& .${tabsClasses.scrollButtons}`]: {
                    '&.Mui-disabled': { opacity: 0.3 },
                  },
                }}
              >
                {
                  data.menu.map(menuItem => (
                    <Tab key={menuItem.category._id} label={menuItem.category.name} />

                  )
                  )}
              </Tabs>

            </Box>
          </div>
          {/* restaurant menu */}
          {
            data.menu.map(menuItem => (
              <div className='restaurant_menu' key={menuItem._id}>
                <div className="menu_wrapper">
                  <h3>{menuItem.category.name}</h3>
                  <div className="menu_cards">
                    <div className="menu_card">
                      <div className="menu_img">
                        <img src={menuItem.image} alt="cuisine" />
                      </div>
                      <div className="menu_desc">
                        <h4>{menuItem.name.slice(0, 25)}...</h4>
                        <p>{menuItem.description}</p>
                        <span>$ {menuItem.unitPrice}</span>
                        <span className='basket' onClick={() => ModalOpen(menuItem)}><FaShoppingBag /> Add</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }

        </div>
      </div>
      {/* Restaurant  modal */}
      {
        modal && (
          <div>
            <div className="overlay" ></div>
            <div className="menu-detail">
              <div className="detail-head">
                <button onClick={() => ModalOpen()}><TbXboxX /></button>
                <img src={modalMenu.image} alt="menuİmg" />
                <h3>{modalMenu.name}</h3>
                <p>{modalMenu.description} </p>
              </div>

              <Formik
                initialValues={{
                  size: "Small",
                  addons: [],
                  instructions: "",


                }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  const formData = {
                    ...values,
                    count,
                    restaurantId: id,
                    menuId: modalMenu._id,
                    image: modalMenu.image
                  };
                  await postBasket(formData)
                  ModalOpen()
                  await refetch()
                  console.log("baskete elave olundu");
                }}
              >
                {({ values, setFieldValue }) => (
                  <Form className="detail-form">
                    {/* Combo Classic Size */}
                    {
                      modalMenu.category.name === "Burgers" ? (
                        <div>
                          <div >
                            <h4>
                              Combo Classic Size <span>Required</span>
                            </h4>
                            <ul>
                              <li>
                                <Field type="radio" name="size" value="Small" id="small" />
                                <label htmlFor="small">Small</label>
                                <span>$30</span>
                              </li>
                              <li>
                                <Field type="radio" name="size" value="Medium" id="medium" />
                                <label htmlFor="medium">Medium</label>
                                <span>$40</span>
                              </li>
                            </ul>

                          </div>
                          {/* Add-ons */}
                          <div >
                            <h4>
                              Add On <span style={{ backgroundColor: "white", fontWeight: "300" }}>Optional</span>
                            </h4>
                            <ul>
                              {["Coke Small 250ml", "Coke Medium 500ml", "Coke Large 1000ml"].map((addon, index) => (
                                <li key={index}>
                                  <input
                                    type="checkbox"
                                    id={addon}
                                    checked={values.addons.includes(addon)}
                                    onChange={() =>
                                      setFieldValue(
                                        "addons",
                                        values.addons.includes(addon)
                                          ? values.addons.filter((a) => a !== addon)
                                          : [...values.addons, addon]
                                      )
                                    }
                                  />
                                  <label htmlFor={addon}>{addon}</label>
                                  <span>+ ${[5, 9, 17][index]}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <h4 style={{ borderBottom: "1px solid #eff0f6", marginBottom: "20px", paddingBottom: "20px" }}>Price <span style={{ color: "black", backgroundColor: "white", fontSize: "20px" }}>${modalMenu.unitPrice}</span></h4>
                      )
                    }



                    {/* Special Instructions */}
                    <div >
                      <h4>
                        Special Instructions <span style={{ backgroundColor: "white", fontWeight: "300" }}>Optional</span>
                      </h4>
                      <Field type="text" name="instructions" placeholder="Ex: Special Instructions" />
                    </div>

                    {/* Submit Button */}
                    <div className='detail-footer'>
                      <div className='basket-count'>
                        <button type='button' onClick={() => dispatch(decrement())}>-</button>
                        <span>{count}</span>
                        <button type="button" onClick={() => dispatch(increment())}>+</button>
                      </div>
                      <button type="submit">Add to Cart</button></div>
                  </Form>
                )}
              </Formik>

            </div>
          </div>
        )
      }
      {/* reservation */}
      {
        reserv && (
          <div>

            <ReservationCard />
          </div>
        )
      }
    </div>
  );
}

export default RestaurantMenu;
