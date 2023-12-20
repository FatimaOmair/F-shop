import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import Input from "../shared/Input";
import axios from "axios";
import { toast } from "react-toastify";

export default function Review() {
  const { productId } = useParams();
  let navigate = useNavigate();
  let token = localStorage.getItem("userToken");
  const initialValues = {
    comment: "",
    rating: "",
  };


  const onSubmit = async (comment) => {
    try {
      const { data } = await axios.post( `${import.meta.env.VITE_API_URL}/products/${productId}/review`,
        comment,
        { headers: { Authorization: `Tariq__${token}` } }  );

      console.log(data);

      if (data.message == "success") {
        toast.success("your comment is created", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate(`/products/${productId}`);
      }
    } catch (error) {
      console.log(error);
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
      id: "comment",
      type: "text",
      name: "comment",
      title: "Comment",
      value: formik.values.comment,
    },
    {
      id: "rating",
      type: "number",
      name: "rating",
      title: "Rating",
      value: formik.values.rating,
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

  return (
    <>
      <div className="container m-auto w-50 pt-5 lobster">
        <h2 className=" text-center">Publish your feedback !</h2>
        <form
          onSubmit={formik.handleSubmit}
          className="p-4" encType="multipart/form-data">
          {renderInputs}

          <div className="input-group  d-block text-center  my-5">
            <input type="submit" className=" text-black bg-info border-0 rounded p-2 " value="my Feedback"/>
          </div>
        </form>
      </div>
    </>
  );
}


