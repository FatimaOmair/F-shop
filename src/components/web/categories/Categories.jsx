import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './categories.css'
import { Navigation, Pagination,Autoplay} from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../register/register.css'
import { Link } from 'react-router-dom';
import { cartContext } from '../context/Cart';
export default function Categories() {
// const [categories, setCategories]=useState([])
// const [isLoading,setIsLoding] = useState(true);
// const getCategories= async()=>{

//   try{ const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/categories`)
//          setCategories(data.categories)
//         }
//          catch(error){
//           console.log(error)
        
//          }finally{
//           setIsLoding(false)
//          }
 
// }

// useEffect(()=>{

//   getCategories()
// },[])

// if(isLoading){
//   return <h2>loading....</h2>
// }
const getCategories= async()=>{
  const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=8`)
  return data

 
}


const {data,isLoading} =useQuery('web-categories',getCategories)
if(isLoading){
  return <h2>loading....</h2>
}
  return (
      
<div className=' lobster py-5'>
    <div className="container ">
      {/* <div className="row">
      {categories.length?categories.map((category)=>
    <div className="col-lg-4" key={category._id}>
    <img src={category.image.secure_url} alt="" />
   <h2>{category.name}</h2>
    </div>
  ):"No category found"}
      </div> */}

      {/* <div className="row">
        {data?.categories.length? data?.categories.map((category)=>
        <div className='col-lg-4' key={category._id}>
           <img src={category.image.secure_url} />
           <h2>{category.name}</h2>
        </div>
        ) :<h2>"No data found"</h2>}
      </div> */}

<Swiper
   modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={5.5}
      navigation
      loop={true}
      autoplay={{delay:5000}}

      pagination={{ clickable: true, el:'.swiper-custom-pagination' }}

      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
       {data?.categories.length? data?.categories.map((category)=>
      <SwiperSlide key={category._id}>
        <Link to={`/products/category/${category._id}`} style={{textDecoration:'none'}}>
        <div className="category">
      <img src={category.image.secure_url} className= 'img-fluid '/>
       <h2 className='fs-6 '>{category.name}</h2>
       </div>
        </Link>
       </SwiperSlide>
      
      ) :<h2>"No data found"</h2>}
    </Swiper>
    <div className='swiper-custom-pagination'></div>


    </div>
    </div>
  )
  
}
