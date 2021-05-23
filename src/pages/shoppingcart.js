import React, { useState } from 'react'
import CartItem from '../components/Cart-Item'

const ShoppingCart = ( { cart, setCart } ) => {

    //Define STATE for variable "subtotal"
    const [subtotal, setSubtotal] = useState(0)
   
    console.log("Welcome to ShoppingCart!!!")

    //"CLEAR THE CART" Function gets called by button 'onClick'
    const clearCart = () => {
        setCart([])
        setSubtotal(0)
    }

    // useEffect(() => {
    //     //rerender shopping cart
    //     console.log("Triggered useEffect on ShoppingCart")
    //     console.log("Cart looks like: ", cart)
    //     setCart(cart)

    //   },[cart])

    return (
        <div className='shoppingcart'>
            <h1>SHOPPING CART</h1>
            <br /> <br />
            <div className='cartitems'>
                {cart.length === 0 &&
                    <h3>No items in your cart</h3>
                }

                {/* {cart.map(item => (<p>{item}</p>))} */}

                {cart.map(mapItem => (<CartItem mapItem={mapItem} cart={cart} setCart={setCart} subtotal={subtotal} setSubtotal={setSubtotal} />))}

            </div>
            <br /> <br />
            {cart.length !== 0 &&
                <div> Subtotal  ${subtotal}

                </div>
            }
            <br /> <br />
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
            <br /> <br />
        </div>
    )
}

export default ShoppingCart