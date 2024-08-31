import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const CartContext =createContext();



export default function CartContextProvider({children}){

 const {accessToken}=  useContext(UserContext);
 const [numOfCartItems, setNumOfCartItems] = useState()
 const [cartId, setcartId] = useState()
 const [userId, setUserId] = useState()
 const [cartDetails, setCartDetails] = useState(null)
 
    const endPoint=`https://ecommerce.routemisr.com/api/v1/cart`;

    const headers={
        token: accessToken,
    }

    useEffect(() => {
        accessToken&& getCart();
       
         return () => {
          
         }
       }, [accessToken]);

async function getCart(){
    try {
    const {data}= await axios.get(endPoint,{headers})
    console.log("cart",data)
    setNumOfCartItems(data.numOfCartItems)
    setCartDetails(data.data);
    setcartId(data.data._id)
    setUserId(data.data.cartOwner)
    return data
    } catch (error) {
        return error
    }
}

async function addToCart(productId) {
    try {
    const{data}= await   axios.post(endPoint,{productId},{headers})
    console.log(data)
    setNumOfCartItems(data.numOfCartItems)
    setCartDetails(data.data)
    setcartId(data.data._id)
    setUserId(data.data.cartOwner)
    return data;
    } catch (error) {
        console.log(error);
        return error.response.data.message;
    }
}

async function removeFromCart(productId) {
    try{
        const {data} = await axios.delete(`${endPoint}/${productId}`,{headers})
        setNumOfCartItems(data.numOfCartItems)
        setCartDetails(data.data)
        setcartId(data.data._id)
        setUserId(data.data.cartOwner)
        return data
    } catch (error) {
        console.log(error)
        return error.response.data.message
    }
}

async function removeCartItems(){
    try {
        const {data} = await axios.delete(endPoint,{headers})
        setNumOfCartItems(data.numOfCartItems)
        setCartDetails(data.data)
        console.log(data)
       return data

    } catch (error) {
        console.log(error)
        return error.response.data.message
    }
}

async function updateQuantity(productId,count) {
    try{
        const {data} = await axios.put(`${endPoint}/${productId}`,{count},{headers})
        setNumOfCartItems(data.numOfCartItems)
        setCartDetails(data.data)
        setcartId(data.data._id)
        setUserId(data.data.cartOwner)
        return data
    } catch (error) {
        console.log(error)
        return error.response.data.message
    }
}

async function getPayment(url,shippingAddress){
    try{
        const {data}= await axios.post(url,{shippingAddress},{headers})
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
        return error.response.data.message
    }
}

    return <CartContext.Provider value={{numOfCartItems,cartDetails,addToCart, getCart,removeFromCart,updateQuantity,getPayment,cartId,userId,removeCartItems}}>
    {children}
    </CartContext.Provider>

}