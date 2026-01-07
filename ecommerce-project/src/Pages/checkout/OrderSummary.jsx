import React from "react";
import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import DeliveryOptions from "./DeliveryOptions";
import axios from "axios";
const OrderSummary = ({cart,deliveryOpitons , loadcart}) => {
  return (
    <div className="order-summary">
      {deliveryOpitons.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOption = deliveryOpitons.find(
            (deliveryOpiton) => {
              return deliveryOpiton.id === cartItem.deliveryOptionId;
            }
          );
          const DeleteCartItem=async()=>{
          await  axios.delete(`/api/cart-items/${cartItem.productId}`)
          await loadcart();
          }

          return (
            <div key={cartItem.productId} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{" "}
                {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd,MMMM D"
                )}
              </div>

              <div className="cart-item-details-grid">
                <img className="product-image" src={cartItem.product.image} />

                <div className="cart-item-details">
                  <div className="product-name">{cartItem.product.name}</div>
                  <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                  </div>
                  <div className="product-quantity">
                    <span>
                      Quantity:{" "}
                      <span className="quantity-label">
                        {cartItem.quantity}
                      </span>
                    </span>
                    <span className="update-quantity-link link-primary">
                      Update
                    </span>
                    <span className="delete-quantity-link link-primary" onClick={DeleteCartItem}>
                      Delete
                    </span>
                  </div>
                </div>

                  <DeliveryOptions cartItem={cartItem} deliveryOpitons={deliveryOpitons} loadcart={loadcart} />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default OrderSummary;
