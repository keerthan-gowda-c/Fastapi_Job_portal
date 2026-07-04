import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import api from "../../api/axios";

function SavedJobs(){
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        fetchSavedJobs();
    }, [])
    const fetchSavedJobs = async () => {
        try {
            const response = await api.get("/saved-jobs")
            setSavedJobs(response.data)
        }
        catch (error) {
            alert(error)
        }
    }

    const removeSavedJob = async (jobId) => {
        try {
            await api.delete(`/saved-jobs/${jobId}`)
            fetchSavedJobs();
        }
        catch (error) {
            alert(error.response?.data?.detail)
        }
    }


    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <div className="card shadow">

                    <div className="card-header bg-primary text-white">
                        <h3 className="mb-0">Saved Jobs</h3>
                    </div>

                    <div className="card-body">

                        {savedJobs.length === 0 ? (

                            <div className="text-center py-4">
                                <h5>No saved jobs found.</h5>
                            </div>

                        ) : (

                            <table className="table table-bordered table-hover">

                                <thead className="table-dark">

                                    <tr>
                                        <th>Job Title</th>
                                        <th>Location</th>
                                        <th>Salary</th>
                                        <th>Action</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {savedJobs.map((savedJob) => (

                                        <tr key={savedJob.id}>

                                            <td>{savedJob.job.title}</td>

                                            <td>{savedJob.job.location}</td>

                                            <td>₹ {savedJob.job.salary}</td>

                                            <td>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        removeSavedJob(savedJob.job.id)
                                                    }
                                                >
                                                    Remove
                                                </button>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        )}

                    </div>

                </div>

            </div>
        </>
    )
}

export default SavedJobs;