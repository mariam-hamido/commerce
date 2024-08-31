import { useContext } from 'react';
import logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';


export default function navbar() {
  const {accessToken,setAccessToken}=  useContext(UserContext);
  const {numOfCartItems}= useContext(CartContext);

  function handleLogout(){
    localStorage.removeItem("accessToken");
    setAccessToken(null);
  }
  return (
    <>
      <nav className='bg-gray-100 text-center lg:fixed top-0 right-0 left-0 py-2 items-center z-10'>
      <div className='container justify-between mx-auto py-2 flex flex-col lg:flex-row items-center'>
      <div className='flex flex-col lg:flex-row'>
      <img width={110} src={logo} alt='fresh cart logo'/>
      
      {accessToken&& <ul className='flex flex-col lg:flex-row items-center'>
        <li className='py-2' ><NavLink className='mx-2  text-lg text-slate-900 font-light'to=''>Home</NavLink></li>
        <li className='py-2' ><NavLink className='mx-2  text-lg text-slate-900 font-light'to='Products'>Products</NavLink></li>
        <li className='py-2' ><NavLink className='mx-2  text-lg text-slate-900 font-light'to='Brands'>Brands</NavLink></li>
        <li className='py-2' ><NavLink className='mx-2  text-lg text-slate-900 font-light'to='Category'>Categories</NavLink></li>
        <li className='py-2' >
        <NavLink className='mx-2  text-lg text-slate-900 font-light'to='Cart'>
        <button type="button" className="relative inline-flex items-center  text-m font-medium text-center   focus:ring-4 focus:outline-none ">
        <i className='fas fa-cart-shopping text-2xl'></i>
        <span className="sr-only">Notifications</span>
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{numOfCartItems}</div>
        </button>
        </NavLink>
        </li>
      </ul>}
      
      </div>
      <div>
      <ul className='flex flex-col lg:flex-row items-center'>
      {
        accessToken ?
       (<>
        <li className='py-2'><Link className='mx-2 py-2 text-lg text-slate-900 font-light' onClick={handleLogout}>Logout</Link></li>  
        </>
        ):(<>

        <li className='py-2'><NavLink className='mx-2 py-2 text-lg text-slate-900 font-light'to='Login'>Login</NavLink></li>
        <li className='py-2'><NavLink className='mx-2 py-2 text-lg text-slate-900 font-light'to='Register'>Register</NavLink></li>
        </>)}
        
        
        <li className='py-2 flex items-center'>
            <i className='fab mx-2 fa-instagram'> </i>
            <i className='fab mx-2 fa-facebook'> </i>
            <i className='fab mx-2 fa-tiktok'> </i>
            <i className='fab mx-2 fa-twitter'> </i>
            <i className='fab mx-2 fa-youtube'> </i>
        </li>
      </ul>
      </div>
      </div>
      </nav>
    </>
  )
}
