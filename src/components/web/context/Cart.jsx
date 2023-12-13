import {  createContext, useState } from "react";
import axios from "axios";
import {  toast } from 'react-toastify';
 export const cartContext=createContext(null)



export function CartContextProvider({children}){
let  [count,setCount]=useState(0)
const addToCartContext=async(productId) =>{
try{
    const token= localStorage.getItem('userToken')
    const {data}=await  axios.post(`${import.meta.env.VITE_API_URL}/cart`,
    
    {productId},
    {headers:{Authorization:`Tariq__${token}`}}
    
    )
    //console.log(token)
    if(data.message=="success"){
        toast.success('product added successfully ', {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }
    return data
}
catch(error){
console.log(error)
}
}
const getCartContext=async()=>{
   try{
    const token = localStorage.getItem('userToken')
    const {data}=await  axios.get(`${import.meta.env.VITE_API_URL}/cart`,
    {headers:{Authorization:`Tariq__${token}`}}
   
    )
    setCount(++count)
    return data

   } 
   catch(error){
    console.log(error)
   }
}

const removeItemContext=async(productId)=>{
 try{
const token =localStorage.getItem('userToken')
const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,
{productId},
{headers:{Authorization:`Tariq__${token}`}})

return data
}

catch(error){
    console.log("error")
      console.log(error)
}}

const clearCartContext=async()=>{
    try{
        const token =localStorage.getItem('userToken')
        console.log(token)
        const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,{},
        {headers:{"Authorization":`Tariq__${token}`}})
        
        return data
        }
        
        catch(error){
            console.log("error")
              console.log(error.message)
              
        } 
}

const incraseQuantity=async(productId)=>{
    try{
        const token =localStorage.getItem('userToken')
        const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
        {productId},
        {headers:{Authorization:`Tariq__${token}`}})
        
        return data
        }
        
        catch(error){
            console.log("error")
              console.log(error)
        } 
}

const decraseQuantity=async(productId)=>{
    try{
        const token =localStorage.getItem('userToken')
        const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
        {productId},
        {headers:{Authorization:`Tariq__${token}`}})
        
        return data
        }
        
        catch(error){
            console.log("error")
              console.log(error)
        } 
}

    return <cartContext.Provider value={{addToCartContext,getCartContext,removeItemContext,setCount,clearCartContext,incraseQuantity,decraseQuantity}}> 
        {children}
        </cartContext.Provider>;}


