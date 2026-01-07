import React from 'react'
 
import Product from './Product'

const ProductGrid = ({products , loadcart}) => {
  return (
     <div className="products-grid">
       
       {

        products.map((elem)=>{
          return(
            <Product key={elem.id} elem={elem} loadcart={loadcart}/>
          )
        })






       }

       
      </div>
  )
}

export default ProductGrid
