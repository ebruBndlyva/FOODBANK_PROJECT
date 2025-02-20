import React, { useState } from 'react';
import './style.css';
import { FaFastBackward } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetBasketsQuery, useUpdateBasketItemMutation } from '../../../Redux/services/BasketCreateApi';
import Switch from '@mui/material/Switch';
import { useApplyCouponMutation } from '../../../Redux/services/CouponCreateApi';

function Basket() {
  const { data, isLoading, isError, refetch } = useGetBasketsQuery();
  const [updateBasketItem] = useUpdateBasketItemMutation();
  const [applyCoupon] = useApplyCouponMutation();

  const [isDelivery, setIsDelivery] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(5);

  const navigate = useNavigate();

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  if (isLoading) return <h3>...Loading</h3>;
  if (isError || !data || !data.basket) return <h3>Error loading cart data</h3>;

  const handleApplyCoupon = async () => {
    try {
      const response = await applyCoupon({ code: couponCode, orderAmount: data.subtotal }).unwrap();
      console.log("Kupon cavabı:", response.discountAmount); // Burada cavabı görəcəksiniz
      setDiscount((prev) => {
        console.log("Əvvəlki Discount:", prev);
        console.log("Yeni Discount:", response.discountAmount);
        return response.discountAmount;
      });
      
    } catch (err) {
      console.error("Kupon tətbiq edilmədi:", err);
      setDiscount(0);
    }
  };

console.log(discount);

  const handleSwitchChange = () => {
    setIsDelivery(prev => !prev);
  };

  const handleUpdate = async (item, increment) => {
    try {
      const newCount = item.count + increment;
      if (newCount < 1) return;

      await updateBasketItem({
        menuId: item.menuId._id,
        count: newCount,
        deliveryMethod: isDelivery ? 'Delivery' : 'Pickup'
      }).unwrap();

      await refetch?.();
    } catch (error) {
      console.error("Yeniləmə zamanı xəta baş verdi", error);
    }
  };

  const totalAmount = data.subtotal + (isDelivery ? deliveryCharge : 0) - discount;

  return (
    <div className="basket">
      <div className="content">
        <span className='back'><FaFastBackward /></span>
        <h1>My Cart ({data.basket.items?.length || 0})</h1>
        <div className="basket-wrapper">
          {data.basket.items?.length > 0 ? (
            <div className="basket-items">
              <div className="basket-item">
                <h3>{data.basket.restaurantId?.name || "Unknown Restaurant"}</h3>
                {data.basket.items.map(item => (
                  <div className="basket_cards" key={item._id}>
                    <div className="basket_card">
                      <div className="basket_img">
                        <img src={item.menuId?.image || "placeholder.jpg"} alt="basket" />
                      </div>
                      <div className="basket_desc">
                        <h4>{item.menuId?.name || "Unknown Item"}</h4>
                        <p>{item.menuId?.description || "No description available"}</p>
                        <span>${item.menuId?.unitPrice?.toFixed(2) || "0.00"}</span>
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
            <span>Delivery</span>
            <Switch {...label} checked={isDelivery} onChange={handleSwitchChange} />
            <span>Pickup</span>
          </div>
          <h3>Your order from FoodBank</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleApplyCoupon(); }}>
            <input
              type="text"
              placeholder='Apply Coupon'
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button type="submit">Apply</button>
          </form>
          <ul>
            <li>Subtotal <span>${data.subtotal?.toFixed(2) || "0.00"}</span></li>
            <li>Delivery Charge <span>${isDelivery ? deliveryCharge.toFixed(2) : "0"}</span></li>
            <li>Discount <span>-${discount.toFixed(2)}</span></li>
            <li>Total <span>${totalAmount.toFixed(2)}</span></li>
          </ul>
          <button onClick={() => navigate("/checkout")}>Proceed Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Basket;
