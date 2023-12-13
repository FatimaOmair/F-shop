import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
export default function Orders() {
  let token = localStorage.getItem("userToken")
  const getOrder =async ()=>{
  const {data} = await axios.get("https://ecommerce-node4.vercel.app/order",
  { headers: { Authorization: `Tariq__${token}` } });
  return data;
  }
  const {data,isLoading} =useQuery("getOrder",getOrder);
 
  if(isLoading){
    return <h2>loading...</h2>
  }
  return (
    <div className="row">
  
      {data?.orders
        ? data.orders.map((order, index) => (
            <div className='col-md-4 card m-3 bg-dark text-white text-center' key={index}>
              <div className="pro pt-5">
                <h3>Address: {order.address}</h3>
                <h3>Phone Number: {order.phoneNumber}</h3>
                <h3>Final Price: {order.finalPrice}</h3>
                <h3>Order: {order.paymentType}</h3>
              </div>
            </div>
          ))
        : ""}
    </div>
   
  );
}