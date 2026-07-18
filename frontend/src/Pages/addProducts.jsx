import React, { useState } from 'react'
import './addProducts.css'
import { api } from "./api"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AddProducts() {

  let [formData, SetFormData] = useState({
    pname: "",
    price: "",
    company: "",
    category: "",
    description: ""
  });

  // IMAGE STATE
  let [image, setImage] = useState("");

  let token = JSON.parse(localStorage.getItem("token"));

  let navigate = useNavigate();

  const handleChange = (e) => {

    SetFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      let userId = JSON.parse(localStorage.getItem("user"))._id;

      // FORMDATA
      let dataForm = new FormData();

      dataForm.append("pname", formData.pname);
      dataForm.append("price", formData.price);
      dataForm.append("company", formData.company);
      dataForm.append("category", formData.category);
      dataForm.append("description", formData.description);

      // IMAGE
      dataForm.append("image", image);

      dataForm.append("userId", userId);

      let { data } = await api.post(
        "/product/add",
        dataForm,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      toast.success(data.message, { autoClose: 2200 });

      if (data.success) {

        setTimeout(() => {
          navigate("/products")
        }, 2700)

      }

    }
    catch (err) {

      if (err.response?.data?.message) {

        err.response?.data?.message.forEach((error) => {
          toast.error(error.msg);
        })

      }

    }

  }

  return (

    <div>

      <form
        action=""
        onSubmit={handleSubmit}
        className='product-form mt-5'
      >

        <div className="product-feild">

          <h1>Add Products</h1>

          <br />

          <input
            type="text"
            name="pname"
            placeholder='Enter Product Name'
            value={formData.pname}
            onChange={handleChange}
          />

          <br />

          <input
            type="text"
            name="price"
            placeholder='Enter Price'
            value={formData.price}
            onChange={handleChange}
          />

          <br />

          <input
            className='data-lists'
            name="company"
            list='companyList'
            placeholder='Enter Company'
            value={formData.company}
            onChange={handleChange}
          />

          <datalist id='companyList'>

            <option value="TATA Steel"></option>
            <option value="Jindal South West"></option>
            <option value="Chandla Welding Works"></option>
            <option value="other"></option>

          </datalist>

          <br />

          <input
            className='data-lists'
            list='categoryList'
            name="category"
            placeholder='Enter Category'
            value={formData.category}
            onChange={handleChange}
          />

          <datalist id='categoryList'>

            <option value="Single Door Frame"></option>
            <option value="Double Door Frame"></option>
            <option value="Window Frame"></option>
            <option value="Main Gate"></option>
            <option value="Sliding Gate"></option>
            <option value="Stair Railing"></option>
            <option value="Balcony Railing"></option>
            <option value="Window Grill"></option>
            <option value="other"></option>

          </datalist>

          <br />

          <textarea
            name="description"
            className="form-control"
            rows="4"
            placeholder="Enter Product Description"
            onChange={handleChange}
          />

          <br />

          {/* IMAGE INPUT */}

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <br /><br />

          <button type="submit">
            Add Products
          </button>

        </div>

      </form>

    </div>

  )
}

export default AddProducts; 