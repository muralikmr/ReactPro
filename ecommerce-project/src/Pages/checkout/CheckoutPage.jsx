import React, { useEffect, useState } from 'react'
import '../checkout/CheckoutPage.css'
import  '../checkout-header.css'
 
import axios from 'axios'
 
import OrderSummary from './OrderSummary'
import PaymentSummary from './PaymentSummary'
const CheckoutPage = ({cart , loadcart}) => {
  const[deliveryOpitons,setDeliveryOptions]=useState([])

  let[paymentSummary,setPaymentSummary]=useState(null)

  useEffect(()=>{
   
   const fetchcheckoutdata= async ()=>{
   let response= await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
    
      setDeliveryOptions(response.data)
        response= await axios.get('/api/payment-summary')
   
      setPaymentSummary(response.data)
       
   }
 fetchcheckoutdata();
  },[cart])

  return (
    <>  
      <title>Checkout</title>
      <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <a href="/">
            <img className="logo" src="images/logo.png" />
            <img className="mobile-logo" src="images/mobile-logo.png" />
          </a>
        </div>

        <div className="checkout-header-middle-section">  
          Checkout (<a className="return-to-home-link"
            href="/">3 items</a>)
        </div>

        <div className="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png" />
        </div>
      </div>
    </div>

    <div className="checkout-page">
      <div className="page-title">Review your order</div>

      <div className="checkout-grid">
      <OrderSummary cart={cart} deliveryOpitons={deliveryOpitons}  loadcart={loadcart}/>
 
         <PaymentSummary paymentSummary={paymentSummary} loadcart={loadcart} />
      </div>
    </div>
      
    </>
  )
}

export default CheckoutPage
  