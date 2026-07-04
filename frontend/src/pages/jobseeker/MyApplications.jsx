import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";

function MyApplications(){
    
    const[applications, setApplications] = useState([])

    useEffect(()=>{
        fetchApplications()
    },[])

    const fetchApplications = async () => {
        try{
            const response = await api.get("/applications/me")
            setApplications(response.data)
        }
        catch(error){
            console.log(error)
            alert("Failed to load applications")
        }
    }

    return(
        <>
        <Navbar/>

        <div className="container mt-4">
        <h2>My Applications</h2>
        {
            applications.length === 0 ?(
                <div className="alert alert-info">
                    You haven't applied for any jobs yet.
                </div>
            ):(
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Job</th>
                            <th>Status</th>
                            <th>Applied On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((application)=>(
                            <tr key={application.id}>
                                <td>{application.job.title}</td>
                                <td>{application.status}</td>
                                <td>
                                    {new Date(
                                        application.applied_at).toLocaleDateString()
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        }
        </div>
        </>
    )
}

export default MyApplications;