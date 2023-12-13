import axios from "axios";
import React, { useContext } from "react";
import { cartContext } from "../context/Cart";
import { useQuery } from "react-query";
import Input from "../../shared/Input.jsx";
import { useFormik } from "formik";

import { toast } from "react-toastify";
export default function CreateOrder() {
  const { getCartContext } = useContext(cartContext);
  const getCart = async () => {
    const res = await getCartContext();
    return res;
  };
  let token = localStorage.getItem("userToken");
  const initialValues = {
    address: "",
    phone: "",
    couponName: "",
  };
  const onSubmit = async (info) => {
    try {
      const { data } = await axios.post(
        "https://ecommerce-node4.vercel.app/order",
        info,
        { headers: { Authorization: `Tariq__${token}` } }
      );
     
      if (data.message == "success") {
        toast.success("your order is successfully created!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validateOnBlur: true,
    validateOnChange: false,
  });

  const inputs = [
    {
      id: "address",
      type: "text",
      name: "address",
      title: "Address",
      value: formik.values.address,
    },
    {
      id: "phone",
      type: "number",
      name: "phone",
      title: "Phone Number",
      value: formik.values.phone,
    },
    {
      id: "couponName",
      type: "text",
      name: "couponName",
      title: "Coupon Name",
      value: formik.values.couponName,
    },
  ];
  const renderInputs = inputs.map((input, index) => (
    <Input
      type={input.type}
      name={input.name}
      id={input.id}
      title={input.title}
      value={input.value}
      key={index}
      errors={formik.errors}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched}
    />
  ));
  const { data, isLoading } = useQuery("cart", getCart);
  
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  let total = 0;
  return (
    <>
      <div className="  pt-5 lobster bg1">
        <div className="row">
          <div className="cart col-md-4">
            {data?.products
              ? data.products.map((product, index) => (
                  <React.Fragment key={index}>
                    <div className="pro pt-5  card m-3 text-center">
                    <img src={product.details.mainImage.secure_url} alt="" className="img-thumbnail w-100" />
                     <div className="card-body">
                      <h4>{product.details.name}</h4>
                      <h4>Discount: {product.details.discount}</h4>
                      <h4>Price: {product.details.price}</h4>
                      <h4>Final Price: {product.details.finalPrice}</h4>
                      <h4>Quantity: {product.quantity}</h4>
                    </div>
                    
                    {(total = total + product.details.finalPrice)}
                    </div>
                  </React.Fragment>
                ))
              : ""}
          </div>
          <div className="form col-md-8">
            <h2 className=" text-center ">CreateOrder</h2>
            <form onSubmit={formik.handleSubmit} className="p-4">
              {renderInputs}
              <div className="input-group my-4 d-block m-auto w-50 ">
                <input
                  type="submit"
                  className="submit btn btn-success m-auto w-50"
                  disabled={!formik.isValid}
                  value="Create Order"
                  
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
