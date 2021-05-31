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
    // list, AND also add the userID into each course's list of enrolled
    // students. 
    // When all that is done, clear the cart in both DB and state.

    const processOrder = ()=>{

        if ((userID !== "") && (userInfo.accountType === "student")) {

            // Add the courses into the User's list of enrolled courses in the DB
            // First, fetch the existing list of enrolled courses, then add the
            // current list of cart items to it.
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

            const enrollInCourses = async () => {
                // Perform updates to USERS DB. Remember that userID state (AUTH ID)
                // and userInfo._id are different values. User CARTS are stored
                // using their AUTH ID, but when working with the USER data
                // collection, we update records by their USERS document _id.
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
                    console.log('We had an error trying to update the USER. It was: ', statusMessage)
                    return (statusMessage)
                }
                else {
                    // Update to USERS database was successful, now
                    // update the userInfo state.
                    let tempUserInfo = userInfo
                    tempUserInfo.coursesLearning.enrolled = tempNewList
                    setUserInfo(tempUserInfo)

                    // Now attempt to update each course in the DB to add the
                    // current user into its list of enrolled students.

                    // let tempStudentArray = []
                    // let currentCourse = ""

                    let statusDB = 200
                    if (simplifiedCartList.length !== 0) {
                        // Iterate through the simplified cart list and update the course
                        // to add the current user to its list of enrolled students.
                        let loopCounter = 0
                        while ((loopCounter < simplifiedCartList.length) && (statusDB === 200)) {
                            // Attempt update to COURSE
                            let courseUpdateResponse = await Axios({
                                method: "PUT",
                                data: {
                                    $push: { studentIDs: userInfo._id },
                                },
                                withCredentials: true,
                                url: `/courses/${simplifiedCartList[loopCounter]}`,
                            })
                            statusMessage = courseUpdateResponse.statusText
                            statusDB = courseUpdateResponse.status
                            loopCounter += 1
                        }
                    }
                    if (statusDB !== 200) {
                        // error!
                        console.log('We had an error trying to update the COURSE. It was: ', statusMessage)
                        return (statusMessage)
                    }
                    else{  // All updates successful
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
            }
            let messageToLog = enrollInCourses()
            console.log("Result of Enrollment process = ", messageToLog)

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
                <div className='shopping-cart-user'>
                    <h4> Welcome {userInfo.firstName}, here are the courses you are about to purchase:</h4>                    
                </div>
                <div className='shopping-cart-clear-btn'>
                    <button
                        className='clear-btn'
                        type='button'
                        disabled={cart.length === 0}
                        onClick={clearCart}
                    >
                        CLEAR CART
                    </button>
                </div>
                <div className='shopping-cart-items'>
                    <div className='shopping-cart-items-header'>
                        <h4 className='cart-header-course'>Course</h4>
                        <h4 className='cart-header-price'>Price</h4>
                        <h4 className='cart-header-remove'>Remove</h4>
                    </div>
                    <div className='shopping-cart-items-content'>
                        {cart.length === 0 &&
                            <p className='shopping-cart-no-items'>There are no items in your cart.</p>
                        }
                        {cart.map(mapItem => {
                            return (
                                <div key={mapItem.courseID}>
                                    <CartItem mapItem={mapItem} cart={cart} setCart={setCart} subtotal={subtotal} setSubtotal={setSubtotal} userID={userID} />
                                </div>
                            )
                        })}                        
                    </div>
                </div>
                <div className='shopping-cart-subtotal'>
                    {cart.length !== 0 &&
                        <div> Subtotal: ${subtotal}.00 + shipping fee + tax</div>
                    }                    
                </div>
                <div className='shopping-cart-checkout-btn'>
                    <button 
                        className='checkout-btn'
                        type='button'
                        disabled={cart.length === 0}
                        onClick={processOrder}
                    >
                        BUY NOW
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart