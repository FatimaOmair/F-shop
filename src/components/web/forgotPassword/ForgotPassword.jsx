import React, { useContext } from 'react'
import Input from '../../shared/Input.jsx'
import {useFormik} from 'formik' 
import {forgotPasswordSchema} from '../validation/validate.js'
import axios from 'axios'
import {  toast } from 'react-toastify';
import '../register/register.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/User.jsx'
export default function ForgotPassword() {
  const navigate=useNavigate();
  let {userToken,setUserToken}= useContext(UserContext)
  //console.log(userToken)
  
    const initialValues={
        email:"",
        password:"",
       code:"",
    }

    

   const onSubmit=async users=>{
             
        const {data}=await axios.patch(`https://ecommerce-node4.vercel.app/auth/forgotPassword`,users)
       // console.log(data) 
        if(data.message=="success"){
            localStorage.setItem('userToken',data.token)
           setUserToken(data.token)
            toast.success('Welcome! ', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            navigate('/login')
           
          }


}


    

    const formik = useFormik({
        initialValues,
        onSubmit,
       validationSchema: forgotPasswordSchema  ,
       
    })

    const inputs=[
    
        {
            id:'email',
            type:'email',
            name:'email',
            title:'User Email',
            value:formik.values.email,


        },
        {
            id:'password',
            type:'password',
            name:'password',
            title:'New Password',
            value:formik.values.password,

        },
        {
            id:'code',
            type:'text',  
            name:'code',
            title:'code',
            value:formik.values.code,

        },
      
      
      
    ]

    const renderInputs= inputs.map((input,index)=>
        <Input 
        type={input.type} 
        id={input.id} 
        name={input.name} 
        title={input.title} 
        key={index}
        value={input.value}
        errors={formik.errors}
        onChange={ formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched}
        />
    )
    
  return (
    <>
      
      <div className=' d-flex justify-content-center align-items-center bg1 vh-100 lobster'>
      
       <div className='style bg2 px-3 pb-2'  >
      <form onSubmit={formik.handleSubmit} >
      <h2 className='  text-center'>Verify</h2>
        {renderInputs}
         <button type="submit" className='rounded-pill border-0  bg1 p-2' disabled={!formik.isValid}>Verify</button>

        </form> 
        </div>
      </div>
    </>
  )
}
