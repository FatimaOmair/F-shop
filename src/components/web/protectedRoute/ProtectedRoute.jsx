import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {
   
    if(localStorage.getItem('userToken')==null){
       return <Navigate to='/login'/>
    }

return children
  
}
