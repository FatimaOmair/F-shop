import React from 'react'
import Input from '../../shared/Input.jsx'
import {useFormik} from 'formik' 
import {registerSchema} from '../validation/validate.js'
import axios from 'axios'
import {  toast } from 'react-toastify';
import './register.css'
export default function Register() {

    const initialValues={
        userName:"",
        email:"",
        password:"",
        image:null
    }

    const handelFieldChange=event=>{
                      console.log(event)
                      formik.setFieldValue('image', event.target.files[0])
    }

   const onSubmit=async users=>{
        const formData=new FormData();
        formData.append("userName",users.userName);
        for(let data of formData.entries()){
            console.log(data); //to know what inside form data and print it in console
        }
        formData.append("email",users.email);
        formData.append("password",users.password);
        formData.append("image",users.image);
             
        const {data}=await axios.post(`https://ecommerce-node4.vercel.app/auth/signup/`,formData) 
        if(data.message=="success"){
            formik.resetForm();
            toast.success('account created successfuly, plz verify your email login ', {
                position: "bottom-center",
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
       validationSchema: registerSchema  ,
       
    })

    const inputs=[
        {
            id:'username',
            type:'text',
            name:'userName',
            title:'User Name',
            value:formik.values.userName,

        },
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
        {
            id:'image',
            type:'file',
            name:'image',
            title:'User image',
            onChange:handelFieldChange

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
        onChange={input.onChange || formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched}
        />
    )
    
  return (
    <>
      
      <div className=' d-flex justify-content-center align-items-center bg1 vh-100 lobster'>
      
       <div className='style bg2 px-3 pb-2'  >
      <form onSubmit={formik.handleSubmit} encType='multipart/form-data' className=''>
      <h2 className='  text-center'>Register</h2>
        {renderInputs}
         <button type="submit" className='rounded-pill border-0 m-auto bg1 p-2' disabled={!formik.isValid}>Register</button>
        </form> 
        </div>
      </div>
    </>
  )
}
