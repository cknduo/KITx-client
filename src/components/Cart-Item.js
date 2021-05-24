import React, { useState, useEffect } from 'react'
import Axios from "axios"

import './Cart-Item.css'

const CartItem = ( {mapItem, cart, setCart, subtotal, setSubtotal} ) => {

  // Define STATE for variables to be displayed: "coursePhotoURL", "courseName", and "price"
  const [price, setPrice] = useState(0)
  const [courseName, setCourseName] = useState("")
  const [coursePhotoURL, setCoursePhotoURL] = useState("")

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // REMOVE ITEM FROM CART function, called by 'onClick' of X button
  const removeCartItem = (arrayItemID) => {     
    // Remove item from CART
    setCart(cart => cart.filter((item) => item.courseID !== arrayItemID)) 
    
    // NOTE: The following use of SPLICE was not working consistently.
    // As per recommendation, we will use FILTER instead.
    // RE: "You may see JavaScript projects use filter() instead of
    // splice() to remove elements from an array. The key difference
    // between these two approaches is that filter() creates a new
    // array. This means filter() is the better choice for applications
    // that rely on immutability, like React apps."
    //   OLD CODE:
    //   let index = cart.indexOf(arrayItemID)
    //   if (index > -1) {
    //     let updatedCart = cart.splice(index,1)
    //     setCart(updatedCart)
    //   }
  }
  //----------------------------------------------------------------------------

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // Function to update the CART state with information pulled from backend
  const populateCartDetails = (itemID, URL, title, cost) => {
    let indexInArray = cart.findIndex(item => item.courseID === itemID)
    if (indexInArray > -1) {
      // Update the Shopping Cart with related course details as required 
      
      // Create temporary copy of the object found in the array at the index specified above
      let tempObject = Object.assign({}, cart[indexInArray]) 
      // Update the price on the temporary object  
      tempObject.coursePrice = cost
      // Replace the array element's object in the temporary Cart
      cart[indexInArray] = tempObject
    }
  }
  //----------------------------------------------------------------------------

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // This is the MAIN Use-Effect function that retrieves current course-related
  // information from the backend and then accumulates the prices to be included
  // in the SUBTOTAL.
  useEffect(() => {
    const getCourseDetails = () => {
      Axios({
        method: "GET",
        withCredentials: true,
        url: `/courses/${mapItem.courseID}`,
      }).then((res) => {
        setPrice(res.data.coursePrice)
        setCourseName(res.data.courseName)

        //REPLACE LINE BELOW WITH THIS CODE WHEN URL is in DATABASE FILE ::  setCoursePhotoURL(res.data.coursePhotoURL)
        setCoursePhotoURL("https://www.trademarksandbrandsonline.com/media/image/unnamed-1--1.jpg")

        //REPLACE LINE BELOW WITH THIS CODE WHEN URL is in DATABASE FILE ::  populateCartDetails(res.data._id, res.data.coursePhotoURL, res.data.courseName, res.data.coursePrice)
        populateCartDetails(res.data._id, "https://www.trademarksandbrandsonline.com/media/image/unnamed-1--1.jpg", res.data.courseName, res.data.coursePrice)

        // pretend to update the subTotal on ShoppingCart to trigger a refresh
        setSubtotal(subtotal + res.data.coursePrice)
      })
    }
    getCourseDetails()
  },[cart])
  //----------------------------------------------------------------------------
  
  return(
    <div className='cart-item'>
      {!courseName &&
        <div className='cart-item'>
          <div className='image-container'> <img src={"https://cdn0.iconfinder.com/data/icons/mobile-ui-outline/512/__Folder_Not_Exist_Delete_Emty_Cross-512.png"} alt="course dne" width="200" height="150" /> </div>
          <span>This course ({mapItem.courseID}) no longer exists, please remove from cart.</span>
          <div className='remove-button' onClick=
            {() => removeCartItem(mapItem.courseID)} 
          >
            &#10005;</div>
        </div>
      }
      {courseName &&
        <div className='cart-item'>
          <div className='image-container'> <img src={`${coursePhotoURL}`} alt="course image" width="200" height="150" /> </div>
          <span className='title'>{courseName}</span>
          <span className='price'>${price}</span>
          <div className='remove-button' onClick=
            {() => removeCartItem(mapItem.courseID)} 
          >
            &#10005;</div>
        </div>
      } 
    </div>
  )
}

export default CartItem
