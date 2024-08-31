import { useContext, useEffect, useState } from 'react';
import classes from './Product.module.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';

export default function Product({products}) {

const {addToCart}=  useContext(CartContext);
    
async function addProductToCart(productId){
  const res= await addToCart(productId)
  if(res.status=="success"){
   // alert("product added successfully");
   toast.success(res.message)
  }else{
   toast.error("Some thing went wrong")
  }
 
 }

  return (
    <>

    <div className='w-1/6 px-4 mb-4 product'key={products.id}>
    <Link to={`/Product-details/${products.id}/${products.category.name}`}>
    <img className='mb-2' src={products.imageCover} alt={products.title}/>
    <span className='mb-2 text-green-600'>{products.category.name}</span>
    <h2 className='text-lg font-semibold truncate mb-2'>{products.title}</h2>
    <div className='flex justify-between text-gray-500 font-light'>
    <span>{products.price} EGP</span>
    <div>
     <i className='fas fa-star text-yellow-300'></i>
     <span>{products.ratingsAverage}</span>
    </div>
    </div>
    <div className='flex justify-end ' onClick={()=>addProductToWishList(products.id)}>
    <i className="fa-regular fa-heart"></i>
    </div>
    </Link>

   <button onClick={()=>addProductToCart(products.id)} className='btn btn-green w-full'>Add to cart</button>
  </div>
    </>
  )
}
