import React from 'react'
import { formatMoney } from '../../utils/money';
import dayjs from 'dayjs';
import axios from 'axios';
const DeliveryOptions = ({deliveryOpitons,cartItem,loadcart}) => {
 
  
 const updateDeliveryOption = async (deliveryOptionId) => {
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      deliveryOptionId: deliveryOptionId
    });
    await loadcart();
  };

  return (
    <div className="delivery-options">
    <div className="delivery-options-title">
      Choose a delivery option:
    </div>
    {deliveryOpitons.map((deliveryOption) => {
      let priceString = "FREE Shipping";

      if (deliveryOption.priceCents > 0) {
        priceString = `${formatMoney(
          deliveryOption.priceCents
        )}- Shipping`;
      }

       return (
        <div key={deliveryOption.id} className="delivery-option" onClick={() => updateDeliveryOption(deliveryOption.id)}>
          <input
            type="radio"
            checked={
              deliveryOption.id === cartItem.deliveryOptionId
            }
            className="delivery-option-input"
            name={`delivery-option-${cartItem.productId}`}
          />
          <div>
           <div className="delivery-option-date">
  {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
    "dddd, MMMM D"
  )}
</div>
            <div className="delivery-option-price">
              {priceString}
            </div>
          </div>
        </div>
      );
    })}
  </div>
  )
}
export default DeliveryOptions;