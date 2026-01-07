import React, { useEffect, useState } from 'react'
import '../home/HomePage.css'
import axios from 'axios'
import Header from '../../components/Header'
 
import ProductGrid from './ProductGrid'
const HomePage = ({cart , loadcart}) => {

let [products,setproducts]=useState([])

 
  useEffect(()=>{
   const gethomedata= async()=>{

    const response= await axios.get('/api/products')
 
       setproducts(response.data)
   
     
   }
   gethomedata()
  },[])

   
  return (
    <>
   <title>Ecommerce-project
   </title>
     <Header cart={cart} loadcart={loadcart}/>

    <div className="home-page">
     <ProductGrid products={products} loadcart={loadcart}/>
    </div>
    </>
  )
}

export default HomePage
