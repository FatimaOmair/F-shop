import React, { useContext } from 'react'
import Input from '../../shared/Input.jsx'
import {useFormik} from 'formik' 
import {loginSchema} from '../validation/validate.js'
import axios from 'axios'
import {  toast } from 'react-toastify';
import '../register/register.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/User.jsx'
import SendCode from '../sendCode/SendCode.jsx'
export default function Loginn({saveCurrentUser}) {
  const navigate=useNavigate();
  let {userToken,setUserToken}= useContext(UserContext)
  console.log(userToken)
  if(userToken){
    navigate(-1)
  }

    const initialValues={
        email:"",
        password:"",
       
    }

   

   const onSubmit=async users=>{
             
        const {data}=await axios.post(`https://ecommerce-node4.vercel.app/auth/signin/`,users)
        console.log(data) 
        if(data.message=="success"){
            localStorage.setItem('userToken',data.token)
           setUserToken(data.token)
            toast.success('login success ', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            navigate('/')
           
          }


}


    

    const formik = useFormik({
        initialValues,
        onSubmit,
       validationSchema: loginSchema  ,
       
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
            title:'User Password',
            value:formik.values.password,

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
      <h2 className='  text-center'>Login</h2>
        {renderInputs}
         <button type="submit" className='rounded-pill border-0  bg1 p-2' disabled={!formik.isValid}>Login</button>
        <Link to='/sendCode'>
        <button type='button' className='rounded-pill border-0  bg1 p-2 m-1' >Forgot password</button>

        </Link>
        </form> 
        </div>
      </div>
    </>
  )
}
