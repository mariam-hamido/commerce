import { useContext, useEffect } from "react"
import { CartContext } from "../../Context/CartContext"
import { UserContext } from "../../Context/UserContext";
import products from './../Products/Products';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { data } from "autoprefixer";


export default function cart() {
  const {getCart,cartDetails,setCartDetails,numOfCartItems,removeFromCart,updateQuantity,removeCartItems}=  useContext(CartContext);
const {accessToken}=  useContext(UserContext)


async function getCartDetails() {
const res=  await getCart();
  if(res.status=='sucess'){
    setCartDetails(res.data);
    console.log(res);
  }else{
    console.log(res);
  }
}
 async function removeProductFromCart(productId) {
 const res=   await  removeFromCart(productId)
 if(res.status=='success'){
   getCartDetails();
   toast.success('product removed successfully')
   console.log(res);
 }else{
    toast.error('some thing went wrong')
   console.log(res);
 }
}

async function removeCart(){
    const res=   await  removeCartItems()
    if(res.message==="success"){

      getCartDetails();
      toast.success('producs removed successfully')
      console.log("succes",res);
    }else{
       toast.error('some thing went wrong')
      console.log("err  ",res);
    }
}

async function updateProductQuantity(productId,count) {
    const res=   await  updateQuantity(productId,count)

    if(res.status=='success'){
      getCartDetails();
      toast.success('quantity updated successfully')
      console.log(res);
    }else{
       toast.error('some thing went wrong')
      console.log(res);
    }
   }

useEffect(() => {
 accessToken&& getCartDetails();

  return () => {
   
  }
}, [accessToken]);


  return (
    <>
      
<section className="py-20">
  <div className="container mx-auto ">
  <h1 className="text-3xl font-bold mb-2"> Cart</h1>
  {
    cartDetails&&
    <>
    <div className="flex justify-end my-5">
    <button onClick={()=>removeCart(data)} className="text-end font-medium text-red-600 dark:text-red-500 hover:underline">Remove All Items</button>
    </div>
    
    <div className="flex justify-between">
        <h4 className="text-lg">Total Items:<span className="text-green-600">{numOfCartItems}</span> </h4>
        <h4 className="text-lg ">Total price:<span className="text-green-600">{cartDetails.totalCartPrice} LE</span></h4>
    </div>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
                Product
            </th>
            <th scope="col" className="px-6 py-3">
                Qty
            </th>
            <th scope="col" className="px-6 py-3">
                Price
            </th>
            <th scope="col" className="px-6 py-3">
                Action
            </th>
        </tr>
    </thead>
    <tbody>
    {
        cartDetails.products.map((product)=>(
            <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4">
                <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title}/>
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {product.product.title}
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center">
                    <button onClick={() => updateProductQuantity(product.product.id,product.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                        </svg>
                    </button>
                    <div>
                    {product.count}
                    </div>
                    <button onClick={() => updateProductQuantity(product.product.id,product.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                        </svg>
                    </button>
                </div>
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {product.price} LE
            </td>
            <td className="px-6 py-4">
                <button onClick={()=>removeProductFromCart(product.product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
            </td>
        </tr>
        ))
    }
        
       
    </tbody>
</table>
</div>

<Link to={"/checkout"} className="btn btn-green block w-full my-10 text-center font-bold">CheckOut</Link>
</>}
  
  </div>
</section>


    </>
  )
}
