import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import Navbar from "../../../components/Navbar";
import { toast } from "react-toastify";

function EditCompany(){
    const navigate = useNavigate()

    const[form, setForm] = useState({
        name:"",
        description: "",
        website: "",
        location: "",
    })
    useEffect(()=>{
        fetchCompany()
    },[])

    const fetchCompany = async () =>{
        try{
            const response = await api.get("/companies/me")
            setForm({
                name: response.data.name || "",
                description: response.data.description || "",
                website: response.data.website || "",
                location: response.data.location || "",

            })
        }
        catch(error){
            console.log(error)
        }
    }
    const handleChange = (e) =>{
        setForm({
            ...form,[e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            await api.patch("/companies/me",form)
            toast.success("Company Updated successfully")
            navigate("/company/my-company")
        }
        catch(error){
            toast.error(error.response?.data?.detail || "Failed to update")
        }
    }

    return(
        <>
        
     <Navbar />

            <div className="container mt-5">

                <div className="card shadow">

                    <div className="card-header">
                        <h2>Edit Company</h2>
                    </div>

                    <div className="card-body">

                        <form
                            onSubmit={handleSubmit}
                        >

                            <input
                                className="form-control mb-3"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Company Name"
                            />

                            <textarea
                                className="form-control mb-3"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Description"
                            />

                            <input
                                className="form-control mb-3"
                                name="website"
                                value={form.website}
                                onChange={handleChange}
                                placeholder="Website"
                            />

                            <input
                                className="form-control mb-3"
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                placeholder="Location"
                            />

                            <button
                                className="btn btn-primary"
                            >
                                Update Company
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
}

export default EditCompany;