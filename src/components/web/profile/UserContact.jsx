import React, { useContext } from 'react'
import { UserContext } from '../context/User'

export default function UserContact() {
    let{userData,loading}=useContext(UserContext)
    if(loading){
        return <p>loading ...</p>
       }
    
  return (
    <div className="user-contact  text-center p-5">
    <h6 className='text-white border  btn'>{userData!=null?.email?userData.email:<h2></h2>}</h6>  
    </div>
  )
}
