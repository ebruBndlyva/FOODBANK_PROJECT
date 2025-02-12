import React from 'react'
import './style.css'
import { IoLocationOutline } from 'react-icons/io5'
import { FaInfo, FaInfoCircle, FaShoppingBag, FaStar, FaTable } from 'react-icons/fa'
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
function RestaurantMenu() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let rating = 4
  return (
    <div className='restaurant'>
      <div className="content">
        <div className="restaurant_wrapper">
          <div className="restaurant_card">
            <div className="restaurant_img">
              <img src="https://demo.food-bank.xyz/storage/1/conversions/sultans-dine-image.jpg" alt="cuisine" />
            </div>
            <div className="restaurant_desc">
              <div className='table_info'>
                <button><FaTable /> Table Order</button>
                <span><FaInfoCircle /></span>
              </div>
              <h4><span></span>Sultan's Dine</h4>
              <span>Bangladeshi , Chicken</span>
              <p>   {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  color={index < rating ? "#FFD700" : "#ccc"}
                  size={18}
                />

              ))}
                <span>(1 reviews)</span>
              </p>
              <p><IoLocationOutline /> 250 W 72nd St, New York, United State</p>

            </div>
          </div>
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
                <Tab label="Item One" />
                <Tab label="Item Two" />
                <Tab label="Item Three" />
                <Tab label="Item Four" />
                <Tab label="Item Five" />
                <Tab label="Item Six" />
                <Tab label="Item Seven" />
              </Tabs>
            </Box>
          </div>
          <div className='restaurant_menu'>
            <div className="menu_wrapper">
              <h3>Featured</h3>
              <div className="menu_cards">
                <div className="menu_card">
                  <div className="menu_img">
                    <img src="https://demo.food-bank.xyz/storage/95/conversions/crispy-chicken-image.jpg" alt="cuisine" />
                  </div>
                  <div className="menu_desc">
                    <h4>Chicken Biryani</h4>
                    <p>Chicken Biryani is a savory chicken and rice dish that ...</p>
                    <span>$ 10.00</span>
                    <span className='basket'><FaShoppingBag /> Add</span>
                  </div>
                </div>
                <div />
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default RestaurantMenu