import { useEffect, useState } from 'react';
import classes from './RecentProducts.module.css';
import axios from 'axios';
import Loader from './../Loader/Loader';
import Product from '../Product/Product';

export default function RecentProducts() {

const [products, setProducts] = useState([]);
const [error, setError] = useState(null);
const [isLoading, setIsLoading] = useState(false);

async  function getRecentProducts() {
  setIsLoading(true)
    try {
    const {data}=await  axios.get("https://ecommerce.routemisr.com/api/v1/products");
    console.log(data.data);
    setProducts(data.data)
    setError(null)
    } catch (error) {
      setError(error.response.data.message)
      setProducts([])
    } finally{
      setIsLoading(false)
    }
    
  }

  useEffect(()=>{
    getRecentProducts();
  },[])
    
  return (
    <>
    <section className='py-20'>
    <div className='container mx-auto my-6 py-10 '>
{
  isLoading ? <Loader></Loader>
  :
  error ? <div className='alert-error'>{error}</div>
  :
       <div className='row'>
       {
        products.map(products=> (
         <Product key={products.id} products={products}></Product>
        ))
       }
       </div>}
    </div>
    </section>
    </>
  )
}
