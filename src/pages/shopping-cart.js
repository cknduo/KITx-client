import React, { useState, useEffect } from 'react'
import Axios from "axios"

import CartItem from '../components/Cart-Item'
import addNewDBCart from '../functions/AddNewDBCart.js'
import modifyDBCartItems from '../functions/ModifyDBCartItems'
import './shopping-cart.css'

const ShoppingCart = ( { cart, setCart, userID } ) => {

    //Define STATE for variable "subtotal"
    const [subtotal, setSubtotal] = useState(0)
    // const [userFirstName, setUserFirstName] = useState("")

    // let currentUser = "60a2ece8201b091de34f1902"
    let userFirstName = "Hard CODED"
    // setUserFirstName("Hard CODED")


    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // "CLEAR THE CART" Function gets called by button 'onClick'
    const clearCart = () => {

        // Update cart STATE
        setCart([])
        
        // Update DB
        if (userID !== ""){
            let newCartArray = []
            modifyDBCartItems(userID,newCartArray)
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
    // useEffect(() => {
    //     // Define USER Information if exists
    //     // let currentUser = ""
    //     // let userFirstName = ""

    //     // Get userID from STATE and find related FirstName of user.
    //     // currentUser = userID
    //     // currentUser = Object.assign({}, userID)

    //     //currentUser = "60a2ece8201b091de34f1902"
    //     if (userID !== "") {
            
    //         // setUserFirstName(getUserInfo(userID))  // Retrieve userName from DB
    //         console.log("FirstName returned to main program from function call = ", userFirstName)

    //         let DBUsersname = ""
    //         const getUserInfo = async () => {
    //             const getRes = await Axios({
    //                 method: "GET",
    //                 withCredentials: true,
    //                 url: `/users/${userID}`, 
    //             })
            
    //             DBUsersname = getRes.data.firstName
    //             if(DBUsersname !== userFirstName){
    //                 setUserFirstName(DBUsersname)
    //             }
    //             console.log("1. usersname = ",DBUsersname)
    //         }
    //         getUserInfo()
            
    //         console.log("2. state of user name = ", userFirstName)

    //     }
    //     else {
    //         console.log("running ELSE condition")
    //         currentUser = "12345"
    //         setUserFirstName("12345 USERID STATE NOT FOUND")        
    //     }
    // },[]) // call only first time page loads after being navigated to
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

        
        if ((userID !== "") && (cart.length === 0)) {
            let tempCartArray = []
            let loadUserCartList = async () => {
                let getCart = await Axios({
                    method: "GET",
                    withCredentials: true,
                    url: `/carts/${userID}`,
                })
                // If data is found, loop through the array of items
                // and add each item to the CART state with price = 0.
                console.log("cart info for user, or getCart.data = ",getCart.data)
                if (getCart.data) { // A cart was found for this user in the DB!
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
                else { // No cart was found for this user in DB
                    console.log("NO CART FOUND. Need to create empty one for DB.")
                    // Create an empty cart for user
                    addNewDBCart(userID,tempCartArray)
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
        <div className='shopping-cart'>
            <div className='shopping-cart-container'>
                <h4> Welcome {userID}, here are the courses you are about to purchase:</h4>
                <div className='shopping-cart-items'>
                    {cart.length === 0 &&
                        <h3>No items in your cart</h3>
                    }
                    {cart.map(mapItem => {
                        return (
                            <div key={mapItem.courseID}>
                                <CartItem mapItem={mapItem} cart={cart} setCart={setCart} subtotal={subtotal} setSubtotal={setSubtotal} userID={userID} />
                            </div>
                        )
                    })}
                </div>
                {cart.length !== 0 &&
                    <div> Subtotal  ${subtotal}</div>
                }
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
        </div>
    )
}

export default ShoppingCart