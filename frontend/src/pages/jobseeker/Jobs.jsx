import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";

function Jobs() {

    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);

    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");

    const [page, setPage] = useState(1);

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const role = user?.role;
    const fetchJobs = async () => {

        try {

            const params = {
                page,
                limit: 10
            };

            if (keyword.trim() !== "") {
                params.keyword = keyword;
            }

            if (location.trim() !== "") {
                params.location = location;
            }

            if (salary !== "") {
                params.salary = salary;
            }

            const response = await api.get("/jobs", {
                params
            });

            setJobs(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchJobs();

    }, [page, keyword, location, salary]);

    const searchJobs = () => {

        setPage(1);

        fetchJobs();

    };

    const applyJob = async (jobId) => {

        try {

            await api.post(`/applications/jobs/${jobId}`);

            toast.success("Application submitted successfully");

        }

        catch (error) {

            console.log(error);

            toast.warning(
                error.response?.data?.detail ||
                "Failed to apply"
            );

        }

    };

    const saveJob = async (jobId) => {

        try {

            await api.post(`/saved-jobs/${jobId}`);

            toast.info("Job saved successfully");

        }

        catch (error) {

            console.log(error);

            toast.warning(
                error.response?.data?.detail ||
                "Failed to save job"
            );

        }

    };

    return (

        <>
            <Navbar />

            <div className="container py-5">

                {/* Heading */}

                <div className="text-center mb-5">

                    <h1 className="fw-bold">
                        Find Your Dream Job
                    </h1>

                    <p className="text-muted fs-5">
                        Search thousands of opportunities from top companies.
                    </p>

                </div>

                {/* Search */}

                <div className="card border-0 shadow-lg rounded-4 mb-5">

                    <div className="card-body p-4">

                        <div className="row g-3">

                            <div className="col-lg-4">

                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="🔍 Job Title"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") searchJobs();
                                    }}
                                />

                            </div>

                            <div className="col-lg-3">

                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="📍 Location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") searchJobs();
                                    }}
                                />

                            </div>

                            <div className="col-lg-3">

                                <input
                                    type="number"
                                    className="form-control form-control-lg"
                                    placeholder="💰 Minimum Salary"
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") searchJobs();
                                    }}
                                />

                            </div>

                            <div className="col-lg-2 d-grid">

                                <button
                                    className="btn btn-primary btn-lg rounded-pill"
                                    onClick={searchJobs}
                                >
                                    Search
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Jobs */}

                <div className="row g-4">

                    {jobs.map((job) => (

                        <div
                            className="col-lg-6"
                            key={job.id}
                        >

                            <div className="card border-0 shadow rounded-4 h-100">

                                <div className="card-body p-4">

                                    <div className="d-flex justify-content-between align-items-center mb-3">

                                        <h3 className="fw-bold mb-0">

                                            {job.title}

                                        </h3>

                                        <span className="badge bg-primary fs-6">

                                            New

                                        </span>

                                    </div>

                                    <p className="text-muted">

                                        {job.description}

                                    </p>

                                    <hr />

                                    <div className="row">

                                        <div className="col-6">

                                            <p className="mb-2">

                                                📍 <strong>Location</strong>

                                            </p>

                                            <p className="text-muted">

                                                {job.location}

                                            </p>

                                        </div>

                                        <div className="col-6">

                                            <p className="mb-2">

                                                💰 <strong>Salary</strong>

                                            </p>

                                            <p className="text-success fw-bold">

                                                ₹{job.salary}

                                            </p>

                                        </div>

                                    </div>

                                </div>

                                <div className="card-footer bg-white border-0 p-4">

                                    {!token ? (

                                        <button
                                            className="btn btn-primary rounded-pill w-100"
                                            onClick={() =>
                                                navigate("/choose-login-role")
                                            }
                                        >
                                            Login to Apply
                                        </button>

                                    ) : role === "jobseeker" ? (

                                        <div className="d-flex gap-2">

                                            <button
                                                className="btn btn-primary rounded-pill flex-fill"
                                                onClick={() =>
                                                    applyJob(job.id)
                                                }
                                            >
                                                Apply
                                            </button>

                                            <button
                                                className="btn btn-outline-secondary rounded-pill flex-fill"
                                                onClick={() =>
                                                    saveJob(job.id)
                                                }
                                            >
                                                Save
                                            </button>

                                        </div>

                                    ) : null}

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                {/* Pagination */}

                <div className="d-flex justify-content-center align-items-center mt-5">

                    <button
                        className="btn btn-outline-primary rounded-pill px-4"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        ← Previous
                    </button>

                    <span className="mx-4 fw-bold">

                        Page {page}

                    </span>

                    <button
                        className="btn btn-outline-primary rounded-pill px-4"
                        onClick={() => setPage(page + 1)}
                    >
                        Next →
                    </button>

                </div>

            </div>

        </>

    );

}

export default Jobs;