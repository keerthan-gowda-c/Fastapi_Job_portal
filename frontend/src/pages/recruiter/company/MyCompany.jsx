import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import Navbar from "../../../components/Navbar";
import { toast } from "react-toastify";

function MyCompany(){
    const[company, setCompany] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        fetchCompany()
    },[])

    const fetchCompany = async () =>{
        try{ 
            const response = await api.get("/companies/me")
            setCompany(response.data)
        }
        catch(error){
            console.log(error)
            toast.warning(error.response?.data?.detail || "Failed to load Company")

        }
    }

    const deleteCompany = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this company?"
        )
        if(!confirmDelete) return;

        try{
            await api.delete(`/companies/${company.id}`)
            toast.success("Company deleted successfully")
            navigate("/recruiter-dashboard")
        }
        catch(error){
            toast.warning(error.response?.data?.detail || "Failed to delete company")
        }
    }
    if(!company){
        return(
            <>
            <Navbar/>
            <div className="container mt-5">
                    Loading...
                </div>
            </>
        )
    }

    return(
        <>
        <Navbar/>

         <div className="container mt-5">

                <div className="card shadow">

                    <div className="card-header">
                        <h2>My Company</h2>
                    </div>

                    <div className="card-body">

                        <h4>{company.name}</h4>

                        <p>
                            <strong>Description:</strong>
                            <br />
                            {company.description}
                        </p>

                        <p>
                            <strong>Website:</strong>
                            <br />
                            {company.website}
                        </p>

                        <p>
                            <strong>Location:</strong>
                            <br />
                            {company.location}
                        </p>

                        <button
                            className="btn btn-primary me-2"
                            onClick={() =>
                                navigate("/company/edit-company")
                            }
                        >
                            Edit
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={deleteCompany}
                        >
                            Delete
                        </button>

                    </div>

                </div>

            </div>
        </>

    )
}

export default MyCompany;