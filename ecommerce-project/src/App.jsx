import axios from 'axios';
import './App.css'
    import CheckoutPage from './Pages/checkout/CheckoutPage';
import HomePage from './Pages/home/HomePage'
import { Routes,Route } from 'react-router'
import OrdersPage from './Pages/orders/OrdersPage';
import { useEffect, useState } from 'react';
import Tracking from './Pages/home/Tracking';

function App() {

  let[cart,setCart]=useState([])

  const  loadcart = async ()=>{
    let resonse= await axios.get('/api/cart-items?expand=product')

        setCart(resonse.data)
   
    }

    useEffect(()=>{
       
      loadcart();
    },[])

  return (
    <>
   <Routes>
  <Route path='/' element={<HomePage cart={cart} loadcart={loadcart}/>} />
  <Route path='/checkout' element={<CheckoutPage cart={cart}  loadcart={loadcart}  />} />   
  <Route path='/orders' element={<OrdersPage cart={cart}  loadcart={loadcart} />} />
    <Route path='/tracking' element={<Tracking cart={cart}  loadcart={loadcart} />} />
   </Routes>     
    </>
  )
}
export default App;