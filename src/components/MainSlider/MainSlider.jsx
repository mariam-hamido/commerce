import { useEffect, useState } from 'react';
import classes from './MainSlider.module.css';
import img1 from '../../assets/images/grocery-banner.png';
import img2 from '../../assets/images/grocery-banner-2.jpeg';
import slider1 from '../../assets/images/slider-image-1.jpeg';
import slider2 from '../../assets/images/slider-image-2.jpeg';
import slider3 from '../../assets/images/slider-image-3.jpeg';
import Slider from "react-slick";


export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay:true,
  };

  const images=[
    {
    src:slider1,
    Label:"image 1"
    },
    {
      src:slider2,
      Label:"image 2"
      },
    {
      src:slider3,
      Label:"image 3"
    }
]
  return (
    <>
    <section className='py-20'>
    <div className='container mx-auto my-6 py-10 '>
       <div className='row'>
       <div className='w-2/3'>
       <Slider {...settings}>
       {images.map((imag,index)=> 
        (<img key={index} className='h-[400px]' src={imag.src}/>

        ))}
       
       
    </Slider>
       </div>
       <div className='w-1/3'>
       <img className='h-[200px]' src={img1}/>
       <img className='h-[200px]' src={img2}/>
       </div>
       </div>
    </div>
    </section>
    </>
  )
}
