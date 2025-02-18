import React from 'react';
import './style.css';
import { FaFastBackward } from "react-icons/fa";
import { useGetBasketsQuery, useUpdateBasketItemMutation } from '../../../Redux/services/BasketCreateApi';
import Switch from '@mui/material/Switch';
function Basket() {
  const { data, isLoading, isError, refetch } = useGetBasketsQuery();
  const [updateBasketItem] = useUpdateBasketItemMutation();
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  if (isLoading) return <h3>...Loading</h3>;
  if (isError) return <h3>Error loading cart data</h3>;

  const handleUpdate = async (item, increment) => {
    try {
      const newCount = item.count + increment;
      if (newCount < 1) {

      } else {
        await updateBasketItem({ menuId: item.menuId._id, count: newCount }).unwrap();
      }
      await refetch();
    } catch (error) {
      console.error("Yeniləmə zamanı xəta baş verdi", error);
    }
  };



  return (
    <div className="basket">
      <div className="content">
        <span className='back'><FaFastBackward /></span>
        <h1>My Cart({data.items.length})</h1>
        <div className="basket-wrapper">
          {data.items.length > 0 ? (
            <div className="basket-items">
              <div className="basket-item">
                <h3>{data.restaurantId.name}</h3>
                {data.items.map(item => (
                  <div className="basket_cards" key={item._id}>
                    <div className="basket_card">
                      <div className="basket_img">
                        <img src={item.image} alt="basket" />
                      </div>
                      <div className="basket_desc">
                        <h4>{item.menuId.name}</h4>
                        <p>{item.menuId.description}</p>
                        <span>${item.menuId.unitPrice}</span>
                        <div className='basket-count'>
                          <button type='button' onClick={() => handleUpdate(item, -1)}>-</button>
                          <span>{item.count}</span>
                          <button type='button' onClick={() => handleUpdate(item, 1)}>+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className='empty-basket'>
              <img width="250px" height="250px" src="https://demo.food-bank.xyz/frontend/images/gif/empty.gif" alt="Empty basket" />
              <p>Good food is always cooking! Go ahead, order some yummy items from the menu.</p>
            </div>
          )}
        </div>
        <div className="basket-checkout">
          <div className='check-head'>
            <span>Delivery</span> <Switch  {...label} defaultChecked /> <span>Pickup</span>
          </div>
          <h3>Your order from FoodBank</h3>

          <form>
            <input type="text" placeholder='Apply Coupon' />
            <button>Apply</button>
          </form>
          <ul>
            <li>Subtotal <span>$0</span></li>
            <li>Delivery Charge <span>$0</span></li>
            <li>Discount <span>$0</span></li>
            <li>Total <span>$0</span></li>
          </ul>
          <button>Proceed Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Basket;
