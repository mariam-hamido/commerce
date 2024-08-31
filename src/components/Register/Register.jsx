import { useState, useContext } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';




export default function register() {
  

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate()
  const {setAccessToken} =useContext(UserContext);


  const initialValues={
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:"",
  }

 async function handleRegister(formValues)
  {
    setIsLoading(true)
   try {
    const {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formValues);
    console.log(data)
// success
if (data.message==='success'){
  setAccessToken(data.token)
  
  navigate("/Login")
}

   } catch (error){
    setError(error.response.data.message)
    console.log(error);
   } finally{
    setIsLoading(false)
   }

  }

  const validationSchema= Yup.object().shape({
    name: Yup.string().min(3,'name must be more than 3 char').max(15).required('Name is required'),
    email: Yup.string().email().required(),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{2,8}$/,"password should satart with capital letter and contain char&numbers").required(),
    rePassword: Yup.string().oneOf([Yup.ref("password")],"repassword chould be exactly password you entered").required(),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/).required(),

  })

const formik = useFormik({
  initialValues,
  validationSchema,
  onSubmit:handleRegister,
})

    
  return (
    <>
    <section className='py-20'>
    <div className='container mx-auto my-6 py-10 '>
    <div className='max-w-xl mx-auto'>
    <h1 className='text-4xl font-bold mb-8'>Register:</h1>
    </div>
    {error&& <div className='alert-error max-w-xl mx-auto '>
    {error}
    </div>}
    <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">
    <div className="relative z-0 w-full mb-5 group">
        <input type="text"
         name="name"
          id="name" 
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
          placeholder=" " 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          />
        <label 
        htmlFor="name"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
       Enter your name
        </label>

       {formik.errors.name&& formik.touched.name &&(<span className='text-red-700'>{formik.errors.name}</span>) }
    </div>
    <div className="relative z-0 w-full mb-5 group">
        <input type="email"
         name="email"
          id="email" 
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
          placeholder=" " 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          />
        <label 
        htmlFor="email"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
       Enter your Email
        </label>
        {formik.errors.email&& formik.touched.email &&(<span className='text-red-700'>{formik.errors.email}</span>) }
    </div>
    
    <div className="relative z-0 w-full mb-5 group">
        <input type="password"
         name="password"
          id="password" 
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
          placeholder=" " 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          />
        <label 
        htmlFor="password"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
       Enter your password
        </label>
        {formik.errors.password&& formik.touched.password &&(<span className='text-red-700'>{formik.errors.password}</span>) }
    </div>
    
    <div className="relative z-0 w-full mb-5 group">
        <input type="password"
         name="rePassword"
          id="rePassword" 
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
          placeholder=" "
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.rePassword} 
          />
        <label 
        htmlFor="rePassword"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        Repassword
        </label>
        {formik.errors.rePassword&& formik.touched.rePassword &&(<span className='text-red-700'>{formik.errors.rePassword}</span>) }
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

    <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-green'>{isLoading?<i className='fas fa-spinner fa-spin'></i>:"register"}</button>
    </form>
    </div>
    </section>

    
    </>
  )
}
