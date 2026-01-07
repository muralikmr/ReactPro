import React, { useState } from 'react'
import { formatMoney } from '../../utils/money';
import axios from 'axios';
const Product = ({elem, loadcart}) => {

    let[quantity,setQuantity]=useState(1);
  

    const addtocart=async  ()=>{
        await axios.post('/api/cart-items',{
        productId:elem.id,
         quantity
      })
     await loadcart();
     }

     const selcetQuantity=(e) => setQuantity(Number(e.target.value))



     
  return (
    <div>
    <div className="product-container" data-testId="product-container">
<div className="product-image-container">
 <img className="product-image" data-testId="product-image"
   src={elem.image} />
</div>

<div className="product-name limit-text-to-2-lines">
{elem.name}
</div>

<div className="product-rating-container">
 <img className="product-rating-stars"
   src={`images/ratings/rating-${elem.rating.stars*10}.png`} />
 <div className="product-rating-count link-primary text-danger" style={{color:"red"}}>
   ({elem.rating.count} left)
 </div>
</div>

<div className="product-price">
 {formatMoney(elem.priceCents)}
</div>

<div className="product-quantity-container">
 <select value={quantity}
  onChange={selcetQuantity}
 
 >
   <option value="1">1</option>
   <option value="2">2</option>
   <option value="3">3</option>
   <option value="4">4</option>
   <option value="5">5</option>
   <option value="6">6</option>
   <option value="7">7</option>
   <option value="8">8</option>
   <option value="9">9</option>
   <option value="10">10</option>
 </select>
</div>

<div className="product-spacer"></div>

<div className="added-to-cart">
 <img src="images/icons/checkmark.png" />
 Added
</div>

<button className="add-to-cart-button button-primary" data-testid="add-to-cart-button" onClick={addtocart}>
 Add to Cart
</button>
</div>
 </div>
  )
}

export default Product
