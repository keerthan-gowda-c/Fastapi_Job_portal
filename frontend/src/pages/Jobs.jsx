import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function Jobs() {

    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);

    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");

    const [page, setPage] = useState(1);

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const fetchJobs = async () => {

        try {

            const response = await api.get("/jobs", {

                params: {
                    keyword,
                    location,
                    salary,
                    page,
                    limit: 10
                }

            });

            setJobs(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchJobs();

    }, [page]);

    const searchJobs = async () => {

        setPage(1);

        try {

            const params = {};

            if (keyword.trim() !== "") {
                params.keyword = keyword;
            }

            if (location.trim() !== "") {
                params.location = location;
            }

            if (salary !== "") {
                params.salary = salary;
            }

            params.page = 1;
            params.limit = 10;

            const response = await api.get("/jobs", {
                params
            });

            setJobs(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed to search jobs");

        }

    };

    const applyJob = async (jobId) => {

        try {

            await api.post(`/applications/jobs/${jobId}`);

            alert("Application submitted successfully");

        }

        catch (error) {

            console.log(error);

            alert(
                error.response?.data?.detail ||
                "Failed to apply"
            );

        }

    };

    const saveJob = async (jobId) => {

        try {

            await api.post(`/saved-jobs/${jobId}`);

            alert("Job saved successfully");

        }

        catch (error) {

            console.log(error);

            alert(
                error.response?.data?.detail ||
                "Failed to save job"
            );

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">
                    Available Jobs
                </h2>

                {/* Search */}

                <div className="card mb-4">

                    <div className="card-body">

                        <div className="row">

                            <div className="col-md-4">

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Job Title"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            searchJobs();
                                        }
                                    }}
                                />

                            </div>

                            <div className="col-md-3">

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            searchJobs();
                                        }
                                    }}
                                />

                            </div>
                            <div className="col-md-3">

                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Minimum Salary"
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            searchJobs();
                                        }
                                    }}
                                />
                            </div>



                            <div className="col-md-2">

                                <button
                                    className="btn btn-primary w-100"
                                    onClick={searchJobs}
                                >
                                    Search
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Jobs */}

                <div className="row">

                    {jobs.map((job) => (

                        <div
                            className="col-md-6 mb-4"
                            key={job.id}
                        >

                            <div className="card h-100 shadow">

                                <div className="card-body">

                                    <h4>{job.title}</h4>

                                    <p>{job.description}</p>

                                    <p>

                                        <strong>Location:</strong>{" "}

                                        {job.location}

                                    </p>

                                    <p>

                                        <strong>Salary:</strong>{" "}

                                        ₹{job.salary}

                                    </p>

                                    {!token ? (

                                        <button
                                            className="btn btn-primary"
                                            onClick={() =>
                                                navigate("/choose-login-role")
                                            }
                                        >
                                            Login to Apply
                                        </button>

                                    ) : role === "jobseeker" ? (

                                        <>
                                            <button
                                                className="btn btn-primary me-2"
                                                onClick={() =>
                                                    applyJob(job.id)
                                                }
                                            >
                                                Apply
                                            </button>

                                            <button
                                                className="btn btn-outline-secondary"
                                                onClick={() =>
                                                    saveJob(job.id)
                                                }
                                            >
                                                Save
                                            </button>
                                        </>

                                    ) : null}

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                {/* Pagination */}

                <div className="d-flex justify-content-center mt-4 mb-5">

                    <button
                        className="btn btn-outline-primary me-3"
                        disabled={page === 1}
                        onClick={() =>
                            setPage(page - 1)
                        }
                    >
                        Previous
                    </button>

                    <span className="align-self-center">

                        Page {page}

                    </span>

                    <button
                        className="btn btn-outline-primary ms-3"
                        onClick={() =>
                            setPage(page + 1)
                        }
                    >
                        Next
                    </button>

                </div>

            </div>

        </>

    );

}

export default Jobs;