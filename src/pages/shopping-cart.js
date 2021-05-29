import React, { useState, useEffect } from 'react'
import Axios from "axios"
import { useHistory } from "react-router-dom"
import CartItem from '../components/Cart-Item'
import addNewDBCart from '../functions/AddNewDBCart.js'
import modifyDBCartItems from '../functions/ModifyDBCartItems'
import './shopping-cart.css'

const ShoppingCart = ( { cart, setCart, userID, userInfo, setUserInfo } ) => {

    //Define STATE for variable "subtotal"
    const [subtotal, setSubtotal] = useState(0)

    let history = useHistory()

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
    // Function to process the order. Add courses to the User's 'enrolled'
    // list, then clear the cart in both DB and state.

    const processOrder = ()=>{

        // Add the courses into the User's list of enrolled courses in the DB
        // First, fetch the existing list of enrolled courses, then add the
        // current list of cart items to it.
        if ((userID !== "") && (userInfo.accountType === "student")) {
            let tempNewList = []
            let alreadyEnrolledList = []
            let simplifiedCartList = []
            alreadyEnrolledList = userInfo.coursesLearning.enrolled
            if (cart.length !== 0) {
                // Make list of only the courseIds found in cart state
                for (let counter = 0; counter < cart.length; counter++) {
                    //Insert a new entry into the simplifiedCartList, just the courseID.
                    simplifiedCartList[counter] = cart[counter].courseID
                }
            }
            // Combine the two arrays into one, adding the new ShoppingCart
            // courses onto the list of existing courses already enrolled.
            // tempNewList = [...alreadyEnrolledList, simplifiedCartList]
            tempNewList = alreadyEnrolledList.concat(simplifiedCartList)

            // Perform update to DB. Remember that userID state (AUTH ID)
            // and userInfo._id are different values. User CARTS are stored
            // using their AUTH ID, but when working with the USER data
            // collection, we update records by their USERS document _id.
            const enrollInCourses = async () => {
                let statusMessage = "" 
                let userUpdateResponse = await Axios({
                        method: "PUT",
                        data: {
                            coursesLearning: {
                                enrolled: tempNewList,
                                bookmarked: userInfo.coursesLearning.bookmarked,
                                completed: userInfo.coursesLearning.completed,
                            },
                        },
                        withCredentials: true,
                        url: `/users/${userInfo._id}`,
                    })
                statusMessage = userUpdateResponse.statusText
                if (userUpdateResponse.status !== 200) {
                    // error!
                    console.log('We had an error trying to update. It was: ', statusMessage)
                    return (statusMessage)
                }
                else {
                    // Update to database was successful, proceed with
                    // updating the userInfo state and then clearing out
                    // the shopping cart. 
                    let tempUserInfo = userInfo
                    tempUserInfo.coursesLearning.enrolled = tempNewList
                    setUserInfo(tempUserInfo)

                    // Clear the DB cart
                    if (userID !== ""){
                        let newCartArray = []
                        modifyDBCartItems(userID,newCartArray)
                    }

                    // Clear the cart state
                    setCart([])
                    return (statusMessage)
                }
            }
            let updateStatus = enrollInCourses()

            // Send user to Student Dashboard
            history.push(`/student/${userID}`)
        }
    }
    // --------------------------------------------------------------------
    
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // This UseEffect function is used to build the CART state from an
    // existing/persisted CART record alread saved in the database for the
    // current user (if there is a user logged in). 
    useEffect(() => {
        // Using the currentUser ID, retrieve user's cart details
        // if they exist.
    
        // Only attempt to populate an EMPTY cart. Never overwrite the
        // cart state if it already has items.
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

                <h1> SHOPPING CART</h1>
                <h4> Welcome {userInfo.firstName}, here are the courses you are about to purchase:</h4>
                <div className='shopping-cart-items'>
                    {cart.length === 0 &&
                        <h3>No items in your cart</h3>
                    }
                    {cart.map(mapItem => {
                        return <div key={mapItem.courseID}><CartItem mapItem={mapItem} cart={cart} setCart={setCart} subtotal={subtotal} setSubtotal={setSubtotal} userID={userID} /></div>
                    })}
                </div>
                <br /> <br />
                {cart.length !== 0 &&
                    <div> Subtotal  ${subtotal} (+tax)
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
                        onClick={processOrder}
                    >
                        BUY NOW
                    </button>
                </div>
                <br /> <br />
            </div>
        </div>
    )
}

export default ShoppingCart