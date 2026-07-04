import { useEffect,useState } from "react";

import api from "../api/axios";
import Navbar from "../components/Navbar";

function Jobs(){

    const[jobs, setJobs] = useState([])
    const fetchJobs = async() => {
        try{
            const response = await api.get("/jobs/");
            setJobs(response.data)
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetchJobs();
    })

    const applyjob = async(jobId) => {
        
        try{
            await api.post(`/applications/jobs/${jobId}`)
            alert("Application submitted successfully")
        }
        catch(error){
            console.log(error)
            alert(error.response?.data?.detail)

        }
    }

    const saveJob = async(jobId) => {
        try{
            await api.post(`/saved-jobs/${jobId}`)
            alert("Job saved successfully")
        }
        catch(error){
            console.log(error)
            alert(error.response?.data?.detail || "Failed to save job")
        }
    }

    
    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">
                    Available Jobs
                </h2>

                <div className="row">

                    {jobs.map((job) => (

                        <div
                            className="col-md-6 mb-4"
                            key={job.id}
                        >

                            <div className="card h-100">

                                <div className="card-body">

                                    <h4>
                                        {job.title}
                                    </h4>

                                    <p>
                                        {job.description}
                                    </p>

                                    <p>
                                        <strong>
                                            Location:
                                        </strong>{" "}
                                        {job.location}
                                    </p>

                                    <p>
                                        <strong>
                                            Salary:
                                        </strong>{" "}
                                        ₹{job.salary}
                                    </p>

                                    <button
                                        className="btn btn-primary me-2"
                                        onClick={()=>applyjob(job.id)}
                                    >
                                        Apply
                                    </button>

                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={()=>saveJob(job.id)}
                                    >
                                        Save
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>
        </>

    );

}

export default Jobs;
