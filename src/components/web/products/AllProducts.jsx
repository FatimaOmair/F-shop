
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Products() {
  const [pro, setpro] = useState();
  const [isLoading, setIsLoading] = useState(true);
  let[page,setPage]=useState(1);
  const getProducts = async (page) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}`);
     
      setpro(data);
      
      setIsLoading(false);
    } catch (error) {
      console.log(error)
      setIsLoading(false);
    }
  };

  const getPage = async (pageNumber) => {
    setPage(pageNumber);
    setIsLoading(true);
    await getProducts(pageNumber);
  };

  useEffect(() => {
    getProducts(page);
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="container">
      <div className="row">
      {pro?.products
        ? pro.products.map((prod, index) => (
           <div className="container">
            <div className="row">
               
                <div className=' card m-3 bg-dark text-white text-center' key={index}>
              <div className="pro pt-5">
                <h3>Name: {prod.name}</h3>
                <h6>Slug: {prod.slug}</h6>
                <h6>Discription: {prod.description}</h6>
                <h6 className='text-success'>Status: {prod.status}</h6>
                <img src={prod.mainImage.secure_url}/>
              </div>
           
                </div>
            </div>
           </div>
          ))
        : ""}
         <div className=' d-flex justify-content-center my-5'>
        <nav aria-label="Page navigation example w-50">
          <ul className="pagination">
            <li className="page-item">
              <button className="page-link" onClick={() => getPage(page - 1)} disabled={page === 1}>
              «
              </button>
            </li>
            {Array.from({ length:pro.total / pro.page }).map((_, index) => (
              <li className="page-item" key={index}>
                <button className="page-link" onClick={() => getPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button className="page-link" onClick={() => getPage(page + 1)} disabled={page === pro.total / pro.page}>
              »
              </button>
            </li>
          </ul>
        </nav>
        </div>
      </div>
    </div>
   
  );
}
