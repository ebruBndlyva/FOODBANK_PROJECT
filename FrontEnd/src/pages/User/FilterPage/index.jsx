import React, { useState } from 'react';
import style from './style.module.css';
import stylee from "../../../components/user/Sections/style.module.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { Menu, Slider, Button, Typography, Checkbox } from "@mui/material";
import { MenuItem } from "@mui/material";
import Footer from '../../../components/user/Footer';
import { FaStar } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';

function FilterPage() {
    const [radius, setRadius] = useState(100);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElCuisines, setAnchorElCuisines] = useState(null);
    const [selectedCuisines, setSelectedCuisines] = useState([]);
    const [tempCuisines, setTempCuisines] = useState([]);
    const [openRadius, setOpenRadius] = useState(false);
    const cuisines = ["Pizza", "Mexican", "Dessert", "Chicken", "Burger", "Asian"];
    let navigate = useNavigate();
    const handleCuisinesOpen = (event) => {
        setTempCuisines(selectedCuisines);
        setAnchorElCuisines(event.currentTarget);
    };

    const handleCuisinesClose = () => {
        setAnchorElCuisines(null);
    };

    const handleApplyCuisines = () => {
        setSelectedCuisines(tempCuisines);
        setAnchorElCuisines(null);
    };

    const handleCancelCuisines = () => {
        setTempCuisines(selectedCuisines);
        setAnchorElCuisines(null);
    };
    const rating = 3
    return (
        <>
            <div className='content'>
                <div className={style.filters} style={{ marginTop: "100px", height: "100vh" }}>
                    <div className={style.filter_group} >
                        <nav>
                            <ul>
                                <li><NavLink style={({ isActive }) => isActive ? { backgroundColor: "#EE1D48", color: "white" } : { backgroundColor: "#F7F7FC", color: "#6e7191" }}>All</NavLink></li>
                                <li><NavLink>Delivery</NavLink></li>
                                <li><NavLink>Takeaway</NavLink></li>
                                <li><NavLink>Table Order</NavLink></li>
                            </ul>
                        </nav>
                        <div className={style.filter_options}>
                            <div className={style.filter_option}>
                                <span><CiSearch /></span>
                                <input type="text" placeholder="Search by restaurant" />
                            </div>
                            <div className={style.filter_option}>
                                <span><CiSearch /></span>
                                <input type="text" placeholder="Search by location" />
                            </div>

                            {/* Cuisine seçimi */}
                            <div>
                                {/* Cuisines Button */}
                                <Button
                                    style={{ width: "100%", border: "1px solid #dddded", borderRadius: "30px", padding: "13px 25px", color: "black" }}
                                    onClick={handleCuisinesOpen}
                                >
                                    Cuisines ▾
                                </Button>

                                <Menu anchorEl={anchorElCuisines} open={Boolean(anchorElCuisines)} onClose={handleCuisinesClose}>
                                    <MenuItem>
                                        <div style={{ width: "250px" }}>
                                            <Typography variant="h6">Select Cuisines</Typography>
                                            {cuisines.map((cuisine) => (
                                                <div key={cuisine} style={{ display: "flex", alignItems: "center" }}>
                                                    <Checkbox
                                                        checked={tempCuisines.includes(cuisine)}
                                                        onChange={() =>
                                                            setTempCuisines((prev) =>
                                                                prev.includes(cuisine) ? prev.filter((item) => item !== cuisine) : [...prev, cuisine]
                                                            )
                                                        }
                                                    />
                                                    {cuisine}
                                                </div>
                                            ))}
                                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                                                <Button onClick={handleCancelCuisines}>Cancel</Button>
                                                <Button onClick={handleApplyCuisines} color="primary" variant="contained">
                                                    Apply
                                                </Button>
                                            </div>
                                        </div>
                                    </MenuItem>
                                </Menu>
                            </div>

                            {/* Radius seçimi */}
                            <div>
                                <Button
                                    style={{ border: "none", backgroundColor: "transparent", border: "1px solid #dddded", borderRadius: "30px", padding: "13px 15px", color: "black" }}
                                    onClick={(e) => {
                                        setAnchorEl(e.currentTarget);
                                        setOpenRadius(true);
                                    }}
                                    variant="outlined"
                                >
                                    Distance Radius ▾
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={openRadius}
                                    onClose={() => setOpenRadius(false)}
                                >
                                    <MenuItem>
                                        <div style={{ width: "250px", textAlign: "center" }}>
                                            <Typography variant="h6">Radius around selected destination</Typography>
                                            <Typography variant="h4" fontWeight="bold">
                                                {radius}km
                                            </Typography>
                                            <Slider
                                                value={radius}
                                                onChange={(e, newValue) => setRadius(newValue)}
                                                min={10}
                                                max={200}
                                                sx={{ color: "red" }}
                                            />
                                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                                                <Button onClick={() => setOpenRadius(false)}>Cancel</Button>
                                                <Button onClick={() => setOpenRadius(false)} color="error" variant="contained">
                                                    Apply
                                                </Button>
                                            </div>
                                        </div>
                                    </MenuItem>
                                </Menu>
                            </div>

                            <button className={style.clear}>Clear</button>
                        </div>
                    </div>
                    <div className={style.filters_content}>
                        <h2 style={{ margin: "20px 0" }}> <span>7</span> Results Found</h2>
                        <div className={stylee.restaurant_cards}>
                            <div className={stylee.restaurant_card} onClick={()=>navigate('/restaurant/1')}>
                                <div className={stylee.restaurant_img}>
                                    <img src="https://demo.food-bank.xyz/storage/1/conversions/sultans-dine-image.jpg" alt="cuisine" />
                                </div>
                                <div className={stylee.restaurant_desc}>
                                    <h4>Sultan's Dine</h4>
                                    <p>   {[...Array(5)].map((_, index) => (
                                        <FaStar
                                            key={index}
                                            color={index < rating ? "#FFD700" : "#ccc"}
                                            size={18}
                                        />

                                    ))}
                                        <span>({rating})</span>
                                    </p>
                                    <p><IoLocationOutline /> 250 W 72nd St, New York, Uni...</p>
                                    <span>Close Now</span>
                                </div>
                            </div>
                            <div className={stylee.restaurant_card}>
                                <div className={stylee.restaurant_img}>
                                    <img src="https://demo.food-bank.xyz/storage/1/conversions/sultans-dine-image.jpg" alt="cuisine" />
                                </div>
                                <div className={stylee.restaurant_desc}>
                                    <h4>Sultan's Dine</h4>
                                    <p>   {[...Array(5)].map((_, index) => (
                                        <FaStar
                                            key={index}
                                            color={index < rating ? "#FFD700" : "#ccc"}
                                            size={18}
                                        />

                                    ))}
                                        <span>({rating})</span>
                                    </p>
                                    <p><IoLocationOutline /> 250 W 72nd St, New York, Uni...</p>
                                    <span>Close Now</span>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
}

export default FilterPage;
