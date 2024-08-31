import { useContext, useEffect, useState } from 'react';
import classes from './ProductDetails.module.css';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';


export default function ProductDetails() {

  const [productDetails, setProductDetails] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {addToCart}=useContext(CartContext);

  const {id}=useParams();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async  function getProductDetails(id) {
    setIsLoading(true)
      try {
      const {data}=await  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      console.log(data.data);
      setProductDetails(data.data)
      setError(null)
      } catch (error) {
        setError(error.response.data.message)
        setProductDetails([])
      } finally{
        setIsLoading(false)
      }
      
    }
  
    useEffect(()=>{
      getProductDetails(id);
    },[id])

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
    
        {
          isLoading?
          <Loader></Loader>
          :
          error?
          <div className='alert-error'>{error}</div>
          :
          <section className='py-20'>
          <div className='container mx-auto'>
            <div className='row items-center'>
              <div className='w-1/3 px-4'>
              <Slider {...settings}>
              {
                productDetails?.images?.map((src,index)=>(
                  <img key={index} src={src} alt={productDetails.title}/>
                ))
              }
           
            </Slider>
              {/*<img src={productDetails.imageCover} alt=''/>*/}
              </div>
              <div className='w-2/3 px-4'>
              <h1 className='mb-2 font-bold uppercase'>{productDetails.title}</h1>
              <p className='mb-2  text-gray-500 font-light'>{productDetails.description}</p>
              <div className='flex justify-between text-gray-500 font-light mb-2'>
              <div>
              <p>{productDetails?.category?.name} </p>
              <span>{productDetails.price} EGP</span>
              </div>
              <div>
               <i className='fas fa-star text-yellow-300'></i>
               <span>{productDetails.ratingsAverage}</span>
              </div>
              </div>
              <div className='flex justify-end py-3'>
              <i className="fa-regular fa-heart"></i>
              </div>
              <button  onClick={()=>addProductToCart(productDetails.id)} className='btn btn-green w-full'>Add to cart</button>
              </div>
              
            </div>
          </div>
          <RelatedProducts/>
      </section>
      

    }

   
    
    
    
    </>
  )
}
