
import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa6";

import '../register/register.css'
import { cartContext } from "../context/Cart";
export default function Product() {
  const {productId} = useParams();
  const {addToCartContext} = useContext(cartContext);

  
  const getProduct = async () => {
    const  {data}  = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);

    console.log(data)
    //console.log(data.products);
    return data.product;
  };
  const { data, isLoading } = useQuery("product", getProduct);

  const addToCart=async(productId)=>{
    const res= await addToCartContext(productId) 
  //console.log(res) 
  }

  const getStars=(rating)=>{
    let stars = [];
    for(let i=0;i<rating;i++){
       stars.push(<FaStar color="yellow"/>);
    }
    while(stars.length<5){
      stars.push(<FaRegStar/>);
    }
    return stars;
  }


  if (isLoading) {
    return <h2>isLoading...</h2>;
  }
  return( 
  <div className="container lobster">
  <div className="row mt-2">
  <h2 className="mt-2 text-center ">{data.name}</h2>
       
  <div className=" img-thumbnail images h-50 ">
       <div className="border p-3">
       {data.subImages.map((img,index) =>
        <div className="images mt-4 text-center">
        <img src={img.secure_url}/>
        
       </div>

         )}
       <h2 className="text-danger text-center">{data.price}<span> </span>$</h2>

  
<div className=" ">
   
    <div className="justify-content-center text-center">
    <button className='btn btn-info ' onClick={()=>addToCart(data._id)}>Add To cart</button>
    

       </div>
    
    </div>  
 </div>
 
        <div className="my-5">
        <h2 className="text-center my-5 ">Pepole Feedback</h2>
        <div className="column">
          {data.reviews.map((review) => (
            <div className="card bg-dark mb-3 py-4">
              <img src={review.createdBy.image.secure_url} className={' rounded-circle m-auto'} />
              <div className="card-body text-center">
                <h5 className="card-title text-white">{review.createdBy.userName}</h5>
                <p className="card-text text-white">
                  {getStars(review.rating)}
                </p>
                <p className="card-text text-white">
                  <h6 className="">
                    {review.comment}
                  </h6>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="create_Review d-flex justify-content-center ">
        <Link className={'text-decoration-none d-flex bg-info py-3 px-2 mb-2 rounded text-black'} to={`products/:productId/review`}>Add your feedback!</Link>
        </div> 
   </div>

    </div>



   
    

  </div>
  </div>
  );
}






