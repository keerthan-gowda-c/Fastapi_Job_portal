
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../api/axios";
import Navbar from "../../../components/layout/Navbar";
import "./MyJobs.css";
import { toast } from "react-toastify";

export default function MyJobs() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    const navigate = useNavigate();

    const fetchJobs = async () => {

        try {

            const response = await api.get("/jobs/my-jobs");

            setJobs(response.data);

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.detail ||
                "Failed to load jobs"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        fetchJobs();

    }, []);

    const deleteJob = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this job?"
        );

        if (!confirmDelete) return;

        setDeletingId(id);

        try {

            await api.delete(`/jobs/${id}`);

            toast.success("Job deleted successfully");

            setJobs((prevJobs) =>
                prevJobs.filter((job) => job.id !== id)
            );

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.detail ||
                "Delete failed"
            );

        } finally {

            setDeletingId(null);

        }
    };

    const formatEmploymentType = (type) => {

        if (!type) return "Not specified";

        return type
            .replaceAll("_", " ")
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase());

    };

    if (loading) {

        return (
            <>
                <Navbar />

                <div className="d-flex justify-content-center align-items-center vh-100">

                    <div className="text-center">

                        <div className="spinner-border text-primary"></div>

                        <p className="mt-3 text-muted">
                            Loading your jobs...
                        </p>

                    </div>

                </div>
            </>
        );

    }

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
                                    Manage all your job postings.
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

                    {/* Empty State */}

                    {jobs.length === 0 ? (

                        <div className="card border-0 shadow-sm rounded-4 text-center mt-5">

                            <div className="card-body py-5">

                                <div className="display-4 mb-3">
                                    💼
                                </div>

                                <h4 className="fw-bold">
                                    No Jobs Posted Yet
                                </h4>

                                <p className="text-muted">
                                    Create your first job posting to start
                                    receiving applications.
                                </p>

                                <button
                                    className="btn btn-primary rounded-pill px-4 mt-2"
                                    onClick={() => navigate("/job/create")}
                                >
                                    + Create Your First Job
                                </button>

                            </div>

                        </div>

                    ) : (

                        <div className="row mt-4 g-4">

                            {jobs.map((job) => (

                                <div
                                    className="col-lg-6"
                                    key={job.id}
                                >

                                    <div className="card border-0 shadow-sm job-card h-100">

                                        <div className="card-body p-4">

                                            {/* Title */}

                                            <div className="d-flex justify-content-between align-items-start">

                                                <div>

                                                    <h4 className="fw-bold mb-2">
                                                        {job.title}
                                                    </h4>

                                                    <span className="badge bg-success">
                                                        Active
                                                    </span>

                                                </div>

                                                <span className="badge bg-light text-dark border">
                                                    #{job.id}
                                                </span>

                                            </div>

                                            {/* Description */}

                                            <p className="text-muted mt-3">

                                                {job.description}

                                            </p>

                                            <hr />

                                            {/* Job Information */}

                                            <div className="row g-3">

                                                <div className="col-md-4">

                                                    <small className="text-muted d-block">
                                                        Location
                                                    </small>

                                                    <strong>
                                                        📍 {job.location}
                                                    </strong>

                                                </div>

                                                <div className="col-md-4">

                                                    <small className="text-muted d-block">
                                                        Salary
                                                    </small>

                                                    <strong className="text-success">
                                                        ₹ {job.salary}
                                                    </strong>

                                                </div>

                                                <div className="col-md-4">

                                                    <small className="text-muted d-block">
                                                        Employment
                                                    </small>

                                                    <strong>
                                                        {formatEmploymentType(
                                                            job.employment_type
                                                        )}
                                                    </strong>

                                                </div>

                                            </div>

                                            <hr />

                                            {/* Actions */}

                                            <div className="d-flex gap-2 flex-wrap">

                                                <button
                                                    className="btn btn-warning"
                                                    onClick={() =>
                                                        navigate(
                                                            `/job/edit/${job.id}`
                                                        )
                                                    }
                                                    disabled={
                                                        deletingId === job.id
                                                    }
                                                >
                                                    ✏️ Edit
                                                </button>

                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                        deleteJob(job.id)
                                                    }
                                                    disabled={
                                                        deletingId === job.id
                                                    }
                                                >

                                                    {deletingId === job.id ? (
                                                        <>
                                                            <span
                                                                className="spinner-border spinner-border-sm me-2"
                                                                role="status"
                                                                aria-hidden="true"
                                                            ></span>

                                                            Deleting...
                                                        </>
                                                    ) : (
                                                        "🗑️ Delete"
                                                    )}

                                                </button>

                                                <button
                                                    className="btn btn-outline-primary"
                                                    onClick={() =>
                                                        navigate(
                                                            `/recruiter/job-applicants/${job.id}`
                                                        )
                                                    }
                                                    disabled={
                                                        deletingId === job.id
                                                    }
                                                >
                                                    👥 View Applicants
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


