import React, { useState, useEffect } from 'react'
import CartItem from '../components/Cart-Item'

const ShoppingCart = ( {cart, setCart} ) => {
   
    React.useEffect(() => {
        console.log("localstorage.getItem("cart") = ")
        console.log(localStorage.getItem("cart"))
        const parsedCart = Number(localStorage.getItem("cart") || 0)
        console.log("parsedCart= ", parsedCart)
        setCart(parsedCart)
      }, [])
    
      React.useEffect(() => {
        localStorage.setItem("cart", cart)
      }, [cart])

    const removeCartItem = (courseID) => {
        setCart(cart => cart.filter((item) => item.courseID !== courseID)) 
    }

    const clearCart = () => {
        //setCart(cart => cart.filter((item) => item.courseID === 0))
        setCart(cart = [])
    }

    
    return (
        <div className='shoppingcart'>
            <h1>SHOPPING CART</h1>
            <br /> <br /> <hr />  <br />

            <br /> <br /> <hr />  <br />
            <div className='cartitems'>
                {cart.length === 0 &&
                    <h3>No items in your cart</h3>
                }
                {cart.map(item => (<CartItem removeCartItem={removeCartItem} item={item} />))}
            </div>
            <div>Subtotal</div>
            <br /> <br /> <br />
            <div>
                <button
                    className='clear-cart-button'
                    type='button'
                    disabled={cart.length === 0}
                    onClick={clearCart}
                >
                    CLEAR CART
                </button>
            
                <button 
                    className='checkout-button'
                    type='button'
                    disabled={cart.length === 0}
                    // onClick={checkOut}
                >
                    CHECKOUT
                </button>
            </div>
        </div>
    )
}

export default ShoppingCart