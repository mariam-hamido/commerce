import { useContext, useEffect, useState } from 'react';
import classes from './VerifiyCode.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function VerifiyCode() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate()


 
  


  const initialValues={
    resetCode:"",
  }

 async function handleVerifyCode(formValues)
  {
    setIsLoading(true)
    console.log('Form Values:', formValues);
   try {
    const {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', formValues);
    console.log(data)
// success
if (data.status=="Success"){
   
   setTimeout(() => {
    toast.success(data.message)
   }, 1000);
   navigate("/Reset-password")
}

   } catch (error){
    setError(error.response.data.message)
    console.log(error);
   } finally{
    setIsLoading(false)
   }

  }

 

const formik = useFormik({
  initialValues,
  onSubmit:handleVerifyCode,
})
    
  return (
    <>
    <section className='py-20'>
    <div className='container mx-auto my-6 py-10 '>
    <div className='max-w-xl mx-auto'>
    <h1 className='text-4xl font-bold mb-8'>Enter Your Code:</h1>
    </div>
    {error&& <div className='alert-error max-w-xl mx-auto '>
    {error}
    </div>}
    <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">
    
    <div className="relative z-0 w-full mb-5 group">
        <input type="text"
         name="resetCode"
          id="resetCode" 
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
          placeholder=" " 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.resetCode}
          />
        <label 
        htmlFor="resetCode"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
       Enter your resetCode
        </label>
        {formik.errors.resetCode&& formik.touched.resetCode &&(<span className='text-red-700'>{formik.errors.resetCode}</span>) }
    </div>
    
    <div className='flex justify-between'>
   
    <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-green'>{isLoading?<i className='fas fa-spinner fa-spin'></i>:"Verify"}</button>
    </div>
    
    </form>
    </div>
    </section>
    </>
  )
}
