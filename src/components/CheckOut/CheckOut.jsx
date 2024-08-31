import { useState, useContext } from 'react';
import { useFormik } from 'formik';

import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';




export default function CheckOut() {
  
 const {getPayment,cartId}=useContext(CartContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate()
  const {setAccessToken} =useContext(UserContext);
  const [isOnline, setIsOnline] = useState(false)


  const initialValues={
   details:"",
    phone:"",
    city:"",
  };

 async function handleCheckOut(values)
  {

   console.log("submit",values)
  
   const url=isOnline?`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5174`:`https:ecommerce.routemisr.com/api/v1/orders/${cartId}`
  const res=await getPayment(url,values)
  if(res.status==="success"){
    
    if(isOnline){
      window.location.href=res.session.url
    }else{
 toast.success("payment success")
     setTimeout(() => {
      navigate("/allOrders")
     },5000)
    }
    
   console.log('data',res.session.url)
   
  }else{
  //  
  }
  }

  const validationSchema= Yup.object().shape({
    details: Yup.string().required('Details is required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/).required(),
    city: Yup.string().min(3).required('City is required'),

  })

const formik = useFormik({
  initialValues,
  validationSchema,
  onSubmit:handleCheckOut,
})

    
  return (
    <>
    <section className='py-20'>
    <div className='container mx-auto my-6 py-10 '>
    <div className='max-w-xl mx-auto'>
    <h1 className='text-4xl font-bold mb-8'>CheckOut:</h1>
    </div>
    
    <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">
    <div className="relative z-0 w-full mb-5 group">
    <input type="details"
     name="details"
      id="details" 
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
      placeholder=" " 
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.details}
      />
    <label 
    htmlFor="details"
    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
   Enter your details
    </label>
    {formik.errors.details&& formik.touched.details &&(<span className='text-red-700'>{formik.errors.details}</span>) }
</div>
    
    <div className="relative z-0 w-full mb-5 group">
        <input type="text"
         name="phone"
          id="phone" 
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
          placeholder=" "
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone} 
          />
        <label 
        htmlFor="phone"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
       Enter your phone
        </label>
        {formik.errors.phone&& formik.touched.phone &&(<span className='text-red-700'>{formik.errors.phone}</span>) }
    </div>

    <div className="relative z-0 w-full mb-5 group">
    <input type="city"
     name="city"
      id="city" 
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
      placeholder=" " 
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.city}
      />
    <label 
    htmlFor="city"
    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
   Enter your city
    </label>
    {formik.errors.city&& formik.touched.city &&(<span className='text-red-700'>{formik.errors.city}</span>) }
</div>

<input type='checkbox' name=''  id=''  onClick={()=>setIsOnline(!isOnline)} />
<label htmlFor='isOnline'>online payment</label>

    <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-green w-full'>{

      isOnline? 'pay online' : 'pay cash'
    }
    </button>
    </form>
    </div>
    </section>

    
    </>
  )
}

