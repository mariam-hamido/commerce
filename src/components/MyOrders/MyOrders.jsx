import { useContext, useEffect, useState } from 'react';
import classes from './MyOrders.module.css';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';

export default function myOrders() {
    
const{userId}= useContext(CartContext);
console.log(userId);
async    function getMyOrders() {
       

        try {
          const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)

          console.log(data);

        } catch (error) {
          console.log(error);
        }

    }

    useEffect(() => {
    userId&&   getMyOrders();
    }, [userId])

  return (
    <>
      <h1>myOrders</h1>
    </>
  )
}
