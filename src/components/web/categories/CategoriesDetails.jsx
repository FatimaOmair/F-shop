import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../register/register.css'

export default function CategoriesDetails() {

    const {categoryId}=useParams();
    const getCategoryDetails=async()=>{
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`)
        return data.products

    }
    const {data,isLoading}= useQuery('category_details',getCategoryDetails)
    console.log(categoryId)

    if(isLoading){
        return <h2>loading....</h2>
      }
  return (
    <div className='products text-center bg1  lobster row py-5'>

  {data.length?data.map((product)=>
  
  <div className="product  " key={product._id}>

    <div className="card bg-black m-auto " style={{width: '18rem', height:'35rem'}}>
   <img src={product.mainImage.secure_url} alt="" className='img-thumbnail w-100' />
  <div className="card-body">
  <h3 className='text-white'>{product.name}</h3>
  <Link to={`/products/${product._id}`} style={{ textDecoration: "none", color:'white'}}>Details...</Link>
  </div>
</div>

    
  </div>
  
  ):<h2>No product</h2>}
    </div>
   
  )
}
