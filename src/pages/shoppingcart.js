import React, { useState, useEffect } from 'react'

// const ShoppingCart = () => (
//     <div>
//         You've reached the SHOPPING CART!
//     </div>
// )


const ShoppingCart = props => {

    console.log("just triggered the Shopping Cart screen!")

    const [cart, setCart] = useState([])

    useEffect(() => {
        const getCart = async () => {
            let response = await fetch('/carts/12345')
            let data = await response.json()
            setCart(data)
            console.log("As part of the UseEffect/getCart function, showing the DATA object...")
            console.log(data)
        }
        getCart()
        console.log("At the end of the UseEffect function, showing the CART object...")
        console.log(cart)
    }, []) 

    console.log("log CART, CART.cartID, and CART.cartItems objects prior to refresh of page ...")
    console.log(cart)
    console.log(cart.cartID)
    console.log(cart.cartItems)

    return (
        <div className='shoppingcart'>
            <h1>SHOPPING CART</h1>
            <br /> <hr />  <br />
            <div className='cartitems'>
                Cart ID = {cart.cartID}
                <br />
                <ul>
                    {cart.cartItems}
                </ul>
                {/* {cart.cartItems.map(item => (
                    <p>{item}</p>
                ))} */}

            </div>
        </div>
    )
}

export default ShoppingCart