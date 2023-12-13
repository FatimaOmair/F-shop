import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../context/Cart'
import { useQuery } from 'react-query'
import { UserContext } from '../context/User'
import { Link, Outlet } from 'react-router-dom'
import '../register/register.css'
import style from './Profile.module.css'
export default function Profile() {


    
    let{getUserData,userData,loading}=useContext(UserContext)

    
   if(loading){
    return <p>loading ...</p>
   }

     const getData= async()=>{
        const res= await getUserData ();
        return res
    }
    
    const {data,isLoading}= useQuery('cart', getData)
   // console.log(' data1')
    //console.log(userData)

  return (

<div className="profile bg1 p-5 lobster">
     
      
  <div className={`${style.userData}`}>
    <Outlet/>
  </div>
  
    <div class="offcanvas offcanvas-start show text-bg-dark" tabindex="-1" id="offcanvasDark" aria-labelledby="offcanvasDarkLabel">
      
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasDarkLabel"><i>Your profile</i></h5>
    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvasDark" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div className='w-25'>
        <nav className=' '>
          <Link to='/profile'>Info</Link>
        <Link to='contact'>Contact</Link>
        <Link to='order'> Order</Link>
        </nav>
      </div>
  </div>
</div>
   
   
       

</div>

  )
}
