import React, { useContext } from 'react'
import { UserContext } from '../context/User'

export default function UserInfo() {

    let{userData,loading}=useContext(UserContext)
    if(loading){
        return <p>loading ...</p>
       }
    
  return (
    <div>   <div className='m-auto' style={{width: '18rem'}}>
    <img src={userData!=null?.image?.secure_url?userData.image.secure_url:<h2></h2>} className='img-thumbnail w-100'/>
      <div className='card-body text-center m-auto'>
  <h2 className='text-white'>{userData!=null?.userName?userData.userName:<h2></h2>}</h2>
  <h2 className='text-white'>{userData!=null?.phone?userData.phone:<h2></h2>}</h2>  

 </div>
 </div>
 
</div>
  )
}
