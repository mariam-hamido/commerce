
import Navbar from './../Navbar/Navbar';
import Footer from './../footer/footer';
import { Outlet } from 'react-router-dom';


export default function layout() {
    
  return (
    <>
     <Navbar/>
      <Outlet/>
     <Footer/>
    </>
  )
}
