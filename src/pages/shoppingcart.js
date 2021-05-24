import React, { useState, useEffect } from 'react'
import Axios from "axios"

import CartItem from '../components/Cart-Item'
import addNewDBCart from '../functions/AddNewDBCart.js'

const ShoppingCart = ( { cart, setCart } ) => {

    //Define STATE for variable "subtotal"
    const [subtotal, setSubtotal] = useState(0)

    console.log("++Welcome to the ShoppingCart page!")
    console.log("+ Current CART state = ",cart)
    console.log("+ Current SUBTOTAL state = ",subtotal)

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // "CLEAR THE CART" Function gets called by button 'onClick'
    const clearCart = () => {
        setCart([])
        setSubtotal(0)
    }
    //---------------------------------------------------------------------

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Function to SUM up all Prices in cart
    const sumCart = () => {
        let sum = 0
        if (cart.length !== 0){
            for (let counter = 0; counter < cart.length; counter++) {
                sum += cart[counter].coursePrice
            }
        }
        setSubtotal(sum)
        return (sum)
    }
    //---------------------------------------------------------------------

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // This UseEffect function is used to build the CART state from an
    // existing/persisted CART record alread saved in the database for the
    // current user (if there is a user logged in). 
    useEffect(() => {
        // Get the userID from state, and retrieve user's cart details
        // if they exist.
        let userID = "12345"
        let tempCartArray = []
        const loadUserCartList = async () => {
            // let cartInfo = await getCart(userID)
            let getCart = await Axios({
                method: "GET",
                withCredentials: true,
                url: `/carts/${userID}`,
            })
            // If data is found, loop through the array of items
            // and add each item to the CART state with price = 0.
            if (getCart.data) {
                // Loop through the array of cart items in the DB
                if (getCart.data.cartItems.length !== 0){
                    for (let counter = 0; counter < getCart.data.cartItems.length; counter++) {
                        //Insert a new entry into the CART state, in proper format.
                        let objectToAdd = {
                            courseID: getCart.data.cartItems[counter],
                            coursePrice: 0, 
                        }
                        tempCartArray[counter] = objectToAdd
                    }
                }
                setCart(tempCartArray)
            }
            else {
                //Create an empty cart for user
                console.log("NO CART FOUND. Need to create empty one for DB.")
                const emptyArray = []
                addNewDBCart(userID,emptyArray)
            }
        }
        loadUserCartList()
    },[])
    //---------------------------------------------------------------------

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // This UseEffect function is used mainly to keep the SUBTOTAL
    // refreshed every time there is a change to the CART or after a cart
    // item's price has been populated from the backend.
    useEffect(() => {
    
        // Call the "sumCart" function above to do the heavy lifting.
        sumCart()
    
        // Moved the following call to the "setSubtotal" trigger function into "sumCart"
        // setSubtotal(sumCart())
    },[cart,subtotal])
    //---------------------------------------------------------------------

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