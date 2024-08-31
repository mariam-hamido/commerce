import { useEffect, useState } from 'react';
import classes from './Category.module.css';
import axios from 'axios';
import Loader from '../Loader/Loader';


export default function Category() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState([]);


  
  
  
  async function getCategory() {
    setIsLoading(true);
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
      setBrands(data.data);
      setError(null);
      
    } catch (error) {
      setError(error.response.data.message);
      setBrands([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategory();
  }, []);
    
  return (
    <>
    <section className='py-20'>
    <div className='container mx-auto'>
      <h1 className="text-3xl text-green-600 flex justify-center font-bold underline">All Categories</h1>
      <div className="row py-10">
        {isLoading ? <Loader /> :
          error ? <div className='alert-error'>{error}</div> :
            <div className='row'>
              {brands.map(category => (
                <div
                  className='w-1/3 px-4 mb-4  '
                  key={category.id}
                >
                  <img className={`mb-2 ${classes.categoryImg}`} src={category.image} alt={category.slug} />
                  <h2 className='text-lg font-semibold uppercase text-center mb-2 text-green-600'>{category.slug}</h2>
                </div>
              ))}
            </div>}
      </div>
    </div>
  </section>
    </>
  )
}
