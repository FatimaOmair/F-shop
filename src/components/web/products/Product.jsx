
import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import '../register/register.css'
import { cartContext } from "../context/Cart";
export default function Product() {
  const {productId} = useParams();
  const {addToCartContext} = useContext(cartContext);

  
  const getProduct = async () => {
    const  {data}  = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);

    
    //console.log(data.products);
    return data.product;
  };
  const { data, isLoading } = useQuery("product", getProduct);

  const addToCart=async(productId)=>{
    const res= await addToCartContext(productId) 
  //console.log(res) 
}
  if (isLoading) {
    return <h2>isLoading...</h2>;
  }
  return( 
  <div className="container ">
  <div className="row mt-2">
  <div className="col-md-4 img-thumbnail images ">
       {data.subImages.map((img,index) =>
        <div className="images mt-4 text-center">
        <img src={img.secure_url}/>
        
       </div>
    //    <React.Fragment key={index}>
    //    {/* <ReactImageMagnify {...{
    //     smallImage: {
    //         alt: 'Wristwatch by Ted Baker London',
    //         isFluidWidth: true,
    //         src: img.secure_url,
    //     },
    //     largeImage: {
    //         src: img.secure_url,
    //         width: 1000,
    //         height: 1500,
            

    //     },
    //     enlargedImageContainerClassName:{
    //         width:1000,
    //         height:1500
    //     },
    //      //enlargedImagePosition:'over',
    //     isHintEnabled: true,
    // }} />
    //  */}
    // </React.Fragment>
 
      
       )}
       

    </div>
  
    <div className="col-md-8 border ">
        <h2 className="mt-2 text-center ">{data.name}</h2>
        <h2 className="text-danger text-center">{data.price}</h2>
        <div className="justify-content-center text-center">
        <button className='btn btn-info ' onClick={()=>addToCart(data._id)}>Add To cart</button>

        </div>
    </div> 
   </div> 
  </div>
  );
}






