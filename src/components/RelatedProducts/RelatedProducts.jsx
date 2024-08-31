import { useEffect, useState } from 'react';
import classes from './RelatedProducts.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Product from '../Product/Product';


export default function RelatedProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
 const{category}= useParams();
  
  async  function getRelatedProducts() {
    setIsLoading(true)
      try {
      const {data}=await  axios.get("https://ecommerce.routemisr.com/api/v1/products");
      
     const related= data.data.filter((product)=> product.category.name == category);
      setProducts(related)
      console.log(related);
      setError(null)
      } catch (error) {
        setError(error.response.data.message)
        setProducts([])
      } finally{
        setIsLoading(false)
      }
      
    }
  
    useEffect(()=>{
      getRelatedProducts();
    },[])
  return (
    <>
    <section className='py-20'>
    <div className='container mx-auto my-6 py-10 '>
       <h1 className='font-bold'>Related</h1>
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
