import React, { useState, useEffect } from 'react'
import Axios from "axios"
import modifyDBCartItems from '../functions/ModifyDBCartItems'
import ImageCourseMaterial from './Image-CourseMaterial'


import './Cart-Item.css'

const CartItem = ( {mapItem, cart, setCart, subtotal, setSubtotal, userID} ) => {

  // Define STATE for variables to be displayed: "coursePhotoURL", "courseName", and "price"
  const [price, setPrice] = useState(0)
  const [courseName, setCourseName] = useState("")
  const [coursePhotoURL, setCoursePhotoURL] = useState("")

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // REMOVE ITEM FROM CART function, called by 'onClick' of X button
  const removeCartItem = (arrayItemID) => {  

    // Define what the newly updated cart array should look like when done   
    let newCartArray = (cart.filter((item) => item.courseID !== arrayItemID))
    
    // Remove item from CART
    setCart(newCartArray) 
    // setCart(cart => cart.filter((item) => item.courseID !== arrayItemID)) 
    
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

    // Remove the cart item from the DB, but before you do, remember to scrub
    // the data and remove the coursePrices. The DB only stores a list of courseIDs,
    // it does not include related prices like the cart STATE does.
    
    let scrubbedArray = []
    if (newCartArray.length !== 0){
      for (let counter = 0; counter < newCartArray.length; counter++) {
          //Insert a new entry into the scrubbedArray, just the courseID.
          scrubbedArray[counter] = newCartArray[counter].courseID
      }
    }

    if (userID !== ""){
      modifyDBCartItems(userID,scrubbedArray)
    }

    // Trigger the Subtotal refresh on the main Shopping Cart page for safe measure
    setSubtotal(0)
 
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

        setCoursePhotoURL(res.data.courseImage.fileID)
        // setCoursePhotoURL("https://www.trademarksandbrandsonline.com/media/image/unnamed-1--1.jpg")

        populateCartDetails(res.data._id, res.data.courseImage.fileID, res.data.courseName, res.data.coursePrice)
        // populateCartDetails(res.data._id, "https://www.trademarksandbrandsonline.com/media/image/unnamed-1--1.jpg", res.data.courseName, res.data.coursePrice)

        // Trigger a refresh of the subTotal on ShoppingCart
        setSubtotal(subtotal + res.data.coursePrice)
        console.log("res.data.courseImage for this line is: ",res.data.courseImage )
        console.log("res.data.courseImage.fileID for this line is: ",res.data.courseImage.fileID )
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
          {/*<div className='image-container'> <ImageCourseMaterial imageFileID={coursePhotoURL} /> </div>*/}
          <div className='image-container'> <img src={`/courseMaterial/image/${coursePhotoURL}`} alt="course image" width="200px" /> </div> 
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
