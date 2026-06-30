import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import Navbar from "../../../components/Navbar";


function CreateCompany(){
    const navigate = useNavigate();
    const[form,setForm] = useState({
        name:"",
        description:"",
        website:"",
        location:""
    })
    const handleChange = (e) => {
        setForm({
            ...form,[e.target.name]:e.target.value
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            await api.post("/companies/",form)
            alert("Company created successfully")
            navigate("/recruiter-dashboard")
        }
        catch(error){
            console.log(error);
            alert(error.response?.data?.detail || "Company creation failed")
        }
    }


 return (

        <>

        <Navbar />


        <div className="container mt-5">


            <div className="row justify-content-center">


                <div className="col-md-6">


                    <div className="card p-4">


                        <h2 className="mb-4">

                            Create Company

                        </h2>



                        <form onSubmit={handleSubmit}>


                            <input

                            className="form-control mb-3"

                            name="name"

                            placeholder="Company Name"

                            onChange={handleChange}

                            required

                            />



                            <textarea

                            className="form-control mb-3"

                            name="description"

                            placeholder="Company Description"

                            onChange={handleChange}

                            required

                            />



                            <input

                            className="form-control mb-3"

                            name="website"

                            placeholder="Website"

                            onChange={handleChange}

                            />



                            <input

                            className="form-control mb-3"

                            name="location"

                            placeholder="Location"

                            onChange={handleChange}

                            />



                            <button

                            className="btn btn-primary w-100"

                            >

                                Create Company

                            </button>


                        </form>


                    </div>


                </div>


            </div>


        </div>


        </>

    )

}


export default CreateCompany;