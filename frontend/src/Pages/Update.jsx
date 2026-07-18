import React, { useEffect, useState } from 'react'
import { api } from './api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditProducts() {

    let navigate = useNavigate();

    let { id } = useParams();

    let token = JSON.parse(localStorage.getItem("token"));

    // states
    let [pname, setPname] = useState("");
    let [price, setPrice] = useState("");
    let [category, setCategory] = useState("");
    let [company, setCompany] = useState("");
    let [description, setDescription] = useState("");

    // image state
    let [image, setImage] = useState("");

    // old image show
    let [oldImage, setOldImage] = useState(null);



    // GET SINGLE PRODUCT
    let getSingleProduct = async () => {

        try {

            let { data } = await api.get(`/product/get/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            // console.log(data)
            // prefill data
            setPname(data.pname);
            setPrice(data.price);
            setCategory(data.category);
            setCompany(data.company);
            setDescription(data.description);

            // old image
            setOldImage(data.image);

        }

        catch (err) {

            console.log(err);

        }

    }



    useEffect(() => {

        getSingleProduct();

    }, []);



    // UPDATE PRODUCT
    let handleUpdate = async (e) => {

        e.preventDefault();

        try {

            let formData = new FormData();

            formData.append("pname", pname);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("company", company);
            formData.append("description", description);

            // image
            formData.append("image", image);

            let { data } = await api.put(

                `/product/edit/${id}`,

                formData,

                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }

            );

            toast.success(data.message, {
                autoClose: 2000
            });

            navigate("/products");

        }

        catch (err) {

            console.log(err);

            toast.error("Product not updated");

        }

    }



    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">
                            Edit Product
                        </h2>

                        <form onSubmit={handleUpdate}>

                            {/* PRODUCT NAME */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Product Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={pname}
                                    onChange={(e) => setPname(e.target.value)}
                                />

                            </div>



                            {/* PRICE */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Price
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />

                            </div>



                            {/* CATEGORY */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Category
                                </label>

                                <input
                                    type="text"
                                    list='categoryList'
                                    className="form-control"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
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

                            </div>



                            {/* COMPANY */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Company
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    list='companyList'
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                />

                                <datalist id='companyList'>

                                    <option value="TATA Steel"></option>
                                    <option value="Jindal South West"></option>
                                    <option value="Chandla Welding Works"></option>
                                    <option value="other"></option>

                                </datalist>

                            </div>


                            {/* DESCRIPTION */}
                            <div className="mb-3">

                                <label className="form-label">
                                    Description
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="4"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />

                            </div>



                            {/* OLD IMAGE */}

                            <div className="mb-3 text-center">

                                <img
                                    src={oldImage || null}
                                    alt=""
                                    width="200"
                                    className="img-fluid rounded"
                                />

                            </div>



                            {/* NEW IMAGE */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Upload New Image
                                </label>

                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />

                            </div>



                            <button className="btn btn-dark w-100">

                                Update Product

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default EditProducts;