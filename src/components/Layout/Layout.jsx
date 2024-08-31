
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';


export default function layout() {
    
  return (
    <>
     <Navbar/>
      <Outlet/>
    </>
  )
}
