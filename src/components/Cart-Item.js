import React, { useState, useEffect } from 'react'
import Axios from "axios"

import './Cart-Item.css'

const CartItem = ( {mapItem, cart, setCart, subtotal, setSubtotal} ) => {

  // Define STATED for building subtotal arrays
  const [itemsForSubtotal, setItemsForSubtotal] = useState([])
  const [finalList, setFinalList] = useState([500,500])

  // Define STATE for variables to be displayed: "coursePhotoURL", "courseName", and "price"
  const [price, setPrice] = useState(0)
  const [courseName, setCourseName] = useState("")
  const [coursePhotoURL, setCoursePhotoURL] = useState("")

  console.log("Welcome to CartItem!!!")
  console.log("State of itemsForSubtotal = ",itemsForSubtotal)

  // REMOVE ITEM FROM CART function, called by 'onClick' of X button
  const removeCartItem = (arrayItemID, cost) => { 

    // Update subtotal  
    setSubtotal(subtotal - cost)
    
    // Remove item from CART
    setCart(cart => cart.filter((item) => item !== arrayItemID)) 
    
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

  // Declare function for adding/pushing new price onto the "itemsForSubtotal" state array
  const addPriceToState = (newPrice, stateArray, setFunction) => setFunction(stateArray => [...stateArray, newPrice])


  // This is the MAIN Use-Effect function that retrieves current course-related
  // information from the backend and then accumulates the prices to be included
  // in the SUBTOTAL.
  useEffect(() => {
    console.log("Welcome to CartItem's MAIN UseEffect!")
    const getCourseDetails = () => {
      Axios({
        method: "GET",
        withCredentials: true,
        url: `/courses/${mapItem}`,
      }).then((res) => {
        console.log("Course info found, looks like: ")
        console.log(res.data)

        setPrice(res.data.coursePrice)
        setCourseName(res.data.courseName)
        // setCoursePhotoURL(res.data.coursePhotoURL)
        setCoursePhotoURL("https://www.trademarksandbrandsonline.com/media/image/unnamed-1--1.jpg")

        console.log("Price of this particular course is = ", res.data.coursePrice)

        // Add this item to our list of subTotal prices
        // let newListOfPrices = itemsForSubtotal.push(res.data.coursePrice)
        // setItemsForSubtotal(newListOfPrices)

        
        addPriceToState(res.data.coursePrice, itemsForSubtotal, setItemsForSubtotal)
        // setItemsForSubtotal( itemPrice => [...itemPrice, res.data.coursePrice])

        //setTempSubtotal(tempSubtotal + res.data.coursePrice)
        // updateSubtotal(res.data.coursePrice)
        // console.log("Finished updating SUBTOTAL state")
        
      })
    }
    getCourseDetails()
  },[cart])


  const sumOfItemsForSubtotal = (whichState) => {
    console.log("$$$$$$ Welcome to sumOfItemsForSubtotal!!!")
    let sum = 0
    console.log("STATE of itemsForSubtotal = ",whichState)
    if (whichState.length !== 0){
      for (let counter = 0; counter < whichState.length; counter++) {
        console.log("itemsForSubtotal at position ", counter)
        console.log(" is = ", whichState[counter])
        sum += whichState[counter]
        console.log("Rolling sum = ", sum)
      }
    }
    return sum
  }
  

  // When each cycle is complete, replace the REAL subtotal on ShoppingCart with
  // the temporary subtotal accumulated on this component
  
  useEffect(() => {
    console.log("++++++ Welcome To CartItem UseEffect for SubTotal Replacement!!!")
    console.log("itemsForSubtotal state = ",itemsForSubtotal)
    //let sumToMove = sumOfItemsForSubtotal(itemsForSubtotal)
    //setSubtotal(sumToMove)
    let priceFromList = () => {
      if(itemsForSubtotal.length !== 0)
      return (itemsForSubtotal[0])
    }
    addPriceToState(priceFromList,finalList,setFinalList)
  },[itemsForSubtotal])


  useEffect(() => {
    let sumToMove = sumOfItemsForSubtotal(finalList)
    setSubtotal(sumToMove)

  },[finalList])



  return(
    <div className='cart-item'>
      <div className='image-container'> <img src={`${coursePhotoURL}`} alt="course image" width="200" height="150" /> </div>
      <span className='title'>{courseName}</span>
      <span className='price'>${price}</span>
      <div className='remove-button' onClick=
        {() => removeCartItem(mapItem,price)}
        // Note: No longer use the following code. Replaced with single function call above.
        // {() => {
        //   console.log("courseID to be removed = ", mapItem);
        //   console.log("PriceToRemoveFromSubtotal = ", price);
        //   setSubtotal(subtotal - price);
        //   removeCartItem(mapItem);
        // }} 
      >
        &#10005;</div>
    </div>
  )
}

export default CartItem
