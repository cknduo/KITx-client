import React, {useState} from 'react'
import './Cart-Item.css'

const CartItem = ( {item, removeCartItem} ) => {

  return(
    <div className='cart-item'>
      <div className='image-container'> <img src={`${item.imageURL}`}/> </div>
      <span className='title'>{item.courseTitle}</span>
      <span className='price'>{item.price}</span>
      <div className='remove-button' onClick={() => removeCartItem(item.courseID)}>&#10005;</div>
    </div>
  )
}

export default CartItem
