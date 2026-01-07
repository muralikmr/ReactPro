import React, { Fragment, useEffect, useState } from "react";
import '../orders/OrdersPage.css'
 import Header from "../../components/Header";
import axios from "axios";
 import dayjs from "dayjs";
 import { formatMoney } from "../../utils/money";
 import { Link } from "react-router";
const OrdersPage = ({cart,loadcart}) => {
  const[orders,setOrders]=useState([])

  useEffect(()=>{

    axios.get('/api/orders?expand=products')
    .then((response)=>{
      setOrders(response.data)
  

    })

  },[])
  return (
    <>
    <title>Orders</title>
    <Header cart={cart} loadcart={loadcart}/>
      <div className="header">
        <div className="left-section">
          <a href="/" className="header-link">
            <img className="logo" src="images/logo-white.png" />
            <img className="mobile-logo" src="images/mobile-logo-white.png" />
          </a>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" />

          <button className="search-button">
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <a className="orders-link header-link" href="/orders">
            <span className="orders-text">Orders</span>
          </a>

          <a className="cart-link header-link" href="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">3</div>
            <div className="cart-text">Cart</div>
          </a>
        </div>
      </div>

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

          <div className="orders-grid">
        {
          orders.map((order)=>{
            return(
              <>
                     <div key={order.id} className="order-container">
            <div className="order-header">
              <div className="order-header-left-section">
                <div className="order-date">
                  <div className="order-header-label">Order Placed:</div>
                  <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
                </div>
                <div className="order-total">
                  <div className="order-header-label">Total:</div>
                  <div>{formatMoney(order.totalCostCents)}</div>
                </div>
              </div>

              <div className="order-header-right-section">
                <div className="order-header-label">Order ID:</div>
                <div> {order.id}</div>
              </div>
            </div>

            <div className="order-details-grid">
            {
              order.products.map((orderproduct)=>{
                return(
                  <Fragment key={orderproduct.product.id}> 
                      <div className="product-image-container">
                <img src= {orderproduct.product.image} />
              </div>

              <div className="product-details">
                <div className="product-name">
                  {orderproduct.product.name}
                </div>
                <div className="product-delivery-date">
                Arriving on: {dayjs(orderproduct.product.estimatedDeliveryTimeMs).format("dddd, MMMM D")}

                </div>
                <div className="product-quantity">Quantity: {orderproduct.quantity}</div>
                <button className="buy-again-button button-primary">
                  <img
                    className="buy-again-icon"
                    src="images/icons/buy-again.png"
                  />
                  <span className="buy-again-message">Add to Cart</span>
                </button>
              </div>

              <div className="product-actions">
            <Link
  to="/tracking"
  state={{
    orderId: order.id,
    deliveryDate: orderproduct.product.estimatedDeliveryTimeMs,
    status: "Quality Check",
    product: {
      name: orderproduct.product.name,
      image: orderproduct.product.image,
      quantity: orderproduct.quantity,
    },
  }}
>
  <button className="track-package-button button-secondary">
    Track package
  </button>
</Link>
 
              </div>
                  </Fragment>
                )
              })
            }

              
            </div>
          </div>
              </>
            )
          })
        }
        </div>  
      </div>
    </>
  );
};

export default OrdersPage;
