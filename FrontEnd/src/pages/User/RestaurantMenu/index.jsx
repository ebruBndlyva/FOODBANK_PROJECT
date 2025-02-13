import React from 'react'
import './style.css'
import { IoLocationOutline } from 'react-icons/io5'
import { FaInfoCircle, FaShoppingBag, FaStar, FaTable } from 'react-icons/fa'
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useParams } from 'react-router-dom'
import { useGetRestaurantsByIdQuery } from '../../../Redux/services/RestaurantCreateApi';
import { useGetCategorieByRestaurantQuery } from '../../../Redux/services/CategorycreateApi';
import { useGetMenuesByRestaurantQuery } from '../../../Redux/services/MenuCreateApi';

function RestaurantMenu() {
  const [value, setValue] = React.useState(0);
  const { id } = useParams()
  const { data, isLoading, isError } = useGetRestaurantsByIdQuery(id)
  const response = useGetCategorieByRestaurantQuery(id)
  const catagories = response.data
  const result  = useGetMenuesByRestaurantQuery(id)
  const menuItems = result.data


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isLoading) {
    return <h3>...Loading</h3>; 
  }

  if (isError) {
    return <h3>Error loading restaurant data</h3>; 
  }

  return (
    <div className='restaurant'>
      <div className="content">
        <div className="restaurant_wrapper">
          <div className="restaurant_card" key={data._id}>
            <div className="restaurant_img">
              <img src={data.featuredImage} alt="cuisine" />
            </div>
            <div className="restaurant_desc">
              <div className='table_info'>
                <button><FaTable /> Table Order</button>
                <span><FaInfoCircle /></span>
              </div>
              <h4>{data.name}</h4>
              <span>Bangladeshi , Chicken</span>
              <p>
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    color={index < data.rating ? "#FFD700" : "#ccc"}
                    size={18}
                  />
                ))}
                <span>({data.reviews} reviews)</span>
              </p>
              <p><IoLocationOutline /> {data.restaurantAddress}</p>
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
                {
                  catagories.map(category => (
                    <Tab key={category._id} label={category.name} />

                  )
                  )}
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
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RestaurantMenu;
