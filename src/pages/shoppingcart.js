import React, { useState, useEffect } from 'react'
import Axios from "axios"

import CartItem from '../components/Cart-Item'
// import CourseDetails from '../pages/course-details'
import addNewDBCart from '../functions/AddNewDBCart.js'
import modifyDBCartItems from '../functions/ModifyDBCartItems'
import getUserInfo from '../functions/GetUserInfo'


const ShoppingCart = ( { cart, setCart, userID } ) => {

    //Define STATE for variable "subtotal"
    const [subtotal, setSubtotal] = useState(0)

    // Define USER Information if exists
    let userFirstName = ""
    let currentUser = ""
    // currentUser = userID
    currentUser = "12345"
    // currentUser = "67890"

    // Retrieve userName from DB
    if (currentUser !== "") {
        // userFirstName = getUserInfo(currentUser)   
    }
    userFirstName = "Pam"
    // let currentUser = "60ab2fc2f7d205756ee946f4"
    // let userFirstName = "Westley"

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // "CLEAR THE CART" Function gets called by button 'onClick'
    const clearCart = () => {
        setCart([])
        if (currentUser !== ""){
            let newCartArray = []
            // modifyDBCartItems(currentUser,newCartArray)  
        }
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
        // Using the currentUser ID, retrieve user's cart details
        // if they exist.

        // As a precaution, update UserName field here
        // currentUser = userID
    
        // Only attempt to populate an EMPTY cart. Never overwrite a
        // cart that already has items.
        if (cart.length === 0) {
            let tempCartArray = []
            const loadUserCartList = async () => {
                // let cartInfo = await getCart(currentUser)
                let getCart = await Axios({
                    method: "GET",
                    withCredentials: true,
                    url: `/carts/${currentUser}`,
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
                    addNewDBCart(currentUser,emptyArray)
                }
            }
            loadUserCartList()
        }
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

    })  // Call this effect EVERY TIME!

    // },[cart,subtotal])
    //---------------------------------------------------------------------

    return (
        <div className='shoppingcart'>
            <h1> SHOPPING CART</h1>
            <h4> Welcome {userFirstName}, here are the courses you are about to purchase:</h4>
            <br /> <br />
            <div className='cartitems'>
                {cart.length === 0 &&
                    <h3>No items in your cart</h3>
                }
                {cart.map(mapItem => {
                    return <div key={mapItem.courseID}><p><CartItem mapItem={mapItem} cart={cart} setCart={setCart} subtotal={subtotal} setSubtotal={setSubtotal} /></p></div>
                })}
            </div>
            <br /> <br />
            {cart.length !== 0 &&
                <div> Subtotal  ${subtotal}
                </div>
            }
            <br /><br /><br />
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