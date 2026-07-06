import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../api/axios";
import Navbar from "../../../components/Navbar";
import "./MyJobs.css";

function MyJobs() {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    const fetchJobs = async () => {
        try {
            const response = await api.get("/jobs/");
            setJobs(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteJob = async (id) => {
        const confirmDelete = window.confirm("Delete this job?");

        if (!confirmDelete) return;

        try {
            await api.delete(`/jobs/${id}`);

            alert("Job deleted successfully");

            fetchJobs();
        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.detail ||
                "Delete failed"
            );
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <>
            <Navbar />

            <div className="jobs-bg">

                <div className="container py-5">

                    {/* Header */}

                    <div className="jobs-header shadow-sm">

                        <div className="d-flex justify-content-between align-items-center flex-wrap">

                            <div>

                                <h2 className="fw-bold mb-1">
                                    My Job Listings
                                </h2>

                                <p className="text-muted mb-0">
                                    Manage all your active job postings.
                                </p>

                            </div>

                            <button
                                className="btn btn-primary mt-3 mt-md-0"
                                onClick={() => navigate("/job/create")}
                            >
                                + Post New Job
                            </button>

                        </div>

                    </div>

                    {jobs.length === 0 ? (

                        <div className="text-center mt-5">

                            <h4>No jobs posted yet.</h4>

                            <button
                                className="btn btn-primary mt-3"
                                onClick={() => navigate("/job/create")}
                            >
                                Create Your First Job
                            </button>

                        </div>

                    ) : (

                        <div className="row mt-4 g-4">

                            {jobs.map((job) => (

                                <div
                                    className="col-lg-6"
                                    key={job.id}
                                >

                                    <div className="card border-0 shadow-sm job-card">

                                        <div className="card-body">

                                            <div className="d-flex justify-content-between">

                                                <div>

                                                    <h4 className="fw-bold">
                                                        {job.title}
                                                    </h4>

                                                    <span className="badge bg-success">
                                                        Active
                                                    </span>

                                                </div>

                                            </div>

                                            <p className="text-muted mt-3">
                                                {job.description}
                                            </p>

                                            <div className="row mt-3">

                                                <div className="col-6">

                                                    <small className="text-muted">
                                                        Location
                                                    </small>

                                                    <h6>
                                                        📍 {job.location}
                                                    </h6>

                                                </div>

                                                <div className="col-6">

                                                    <small className="text-muted">
                                                        Salary
                                                    </small>

                                                    <h6 className="text-success">
                                                        ₹ {job.salary}
                                                    </h6>

                                                </div>

                                            </div>

                                            <hr />

                                            <div className="d-flex gap-2 flex-wrap">

                                                <button
                                                    className="btn btn-warning"
                                                    onClick={() =>
                                                        navigate(`/job/edit/${job.id}`)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => deleteJob(job.id)}
                                                >
                                                    Delete
                                                </button>

                                                <button
                                                    className="btn btn-outline-primary"
                                                    onClick={() =>
                                                        navigate(`/job/${job.id}/applications`)
                                                    }
                                                >
                                                    View Applicants
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </>
    );
}

export default MyJobs;