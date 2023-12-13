
import React from 'react'
import Input from '../../shared/Input.jsx'
import {useFormik} from 'formik' 
import {sendCodeSchema} from '../validation/validate.js'
import axios from 'axios'
import {  toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom'

export default function SendCode() {
  const navigate=useNavigate();
    const initialValues={
        
        email:"",
        
    }

   

   const onSubmit=async users=>{
       
      
        const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`,users)
         
        
        if(data.message=="success"){
            
            toast.success('Code sent ,plz check your email ', {
                position: "bottom-center",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
                navigate('/forgotPassword');
          }


}


    

    const formik = useFormik({
        initialValues,
        onSubmit,
       validationSchema: sendCodeSchema  ,
       
    })

    const inputs=[
     
        {
            id:'email',
            type:'email',
            name:'email',
            title:'User Email',
            value:formik.values.email,


        }
       
      
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
      <form onSubmit={formik.handleSubmit}  className=''>
      <h2 className='  text-center'>Forgot Password</h2>
        {renderInputs}
         <button type="submit" className='rounded-pill border-0 m-auto bg1 p-2' disabled={!formik.isValid}>send code</button>
        </form> 
        </div>
      </div>
    </>
  )
}
