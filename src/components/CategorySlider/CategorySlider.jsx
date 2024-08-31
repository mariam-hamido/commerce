import { useEffect, useState } from 'react';
import classes from './CategorySlider.module.css';
import axios from 'axios';
import Slider from "react-slick";


export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
  };
  
  async  function getCategories() {
    setIsLoading(true)
      try {
      const {data}=await  axios.get("https://ecommerce.routemisr.com/api/v1/categories");
      

      setCategories(data.data)
      console.log(data.data)
      setError(null)
      } catch (error) {
        setError(error.response.data.message)
        setCategories([])
      } finally{
        setIsLoading(false)
      }
      
    }
  
    useEffect(()=>{
      getCategories();
    },[])


  return (
    <>
    <section className='py-20'>
    <div className='container mx-auto my-6 py-10 '>
       <h1>category Slider</h1>
       
       <Slider {...settings}>
        {
        categories.map(category=>(<div key={category.id} >
          <img className={`mb-2 ${classes.categoryImg}`} src={category.image} alt=''/>
          <h2 className='mb-2'>{category.name}</h2>
          </div>
          ))
        }
     </Slider>
       </div>
    </section>
    </>
  )
}
