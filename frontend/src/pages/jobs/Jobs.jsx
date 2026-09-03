import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/layout/Navbar";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import JobCard from "../../components/jobs/JobCard";
import "./Jobs.css";

export default function Jobs() {

    const navigate = useNavigate();

    const { user, isAuthenticated } = useAuth();

    const role = user?.role;

    const [jobs, setJobs] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [page, setPage] = useState(1);

    const [appliedJobsIds, setAppliedJobIds] = useState([]);
    const [savedJobsIds, setSavedJobsIds] = useState([]);

    const [loading, setLoading] = useState(false);


    const fetchJobs = async () => {

        setLoading(true);

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

            console.error(
                "Failed to fetch jobs: ",
                error
            );

            toast.error(
                error.response?.data?.detail ||
                "Failed to load jobs"
            );

        }
        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchJobs();

    }, [page]);


    const searchJobs = () => {

        if (page === 1) {

            fetchJobs();

        }
        else {

            setPage(1);

        }

    };


    const applyJob = async (jobId) => {

        try {

            await api.post(
                `/applications/jobs/${jobId}`
            );

            setAppliedJobIds((prev) => [
                ...prev,
                jobId
            ]);

            toast.success(
                "Application submitted successfully"
            );

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

            await api.post(
                `/saved-jobs/${jobId}`
            );

            setSavedJobIds((prev) => [
                ...prev,
                jobId
            ]);

            toast.info(
                "Job saved successfully"
            );

        }
        catch (error) {

            console.log(error);

            toast.warning(
                error.response?.data?.detail ||
                "Failed to save job"
            );

        }

    };


    const fetchUserJobStatus = async () => {

        try {

            const [
                applicationsResponse,
                savedResponse
            ] = await Promise.all([
                api.get("/applications/me"),
                api.get("/saved-jobs/")
            ]);


            const appliedIds =
                applicationsResponse.data.map(
                    (application) =>
                        application.job.id
                );


            const savedIds =
                savedResponse.data.map(
                    (savedJob) =>
                        savedJob.job.id
                );


            setAppliedJobIds(appliedIds);

            setSavedJobIds(savedIds);

        }
        catch (error) {

            console.error(
                "Failed to fetch job status: ",
                error
            );

        }

    };


    useEffect(() => {

        if (
            isAuthenticated &&
            role === "jobseeker"
        ) {

            fetchUserJobStatus();

        }

    }, [
        isAuthenticated,
        role
    ]);


    const handleKeyDown = (e) => {

        if (e.key === "Enter") {

            searchJobs();

        }

    };


    return (

        <div className="jobs-page">

            <Navbar />


            <main className="jobs-container">

                {/* =====================================
                    PAGE HEADER
                ====================================== */}

                <section className="jobs-hero">

                    <div>

                        <span className="jobs-eyebrow">
                            CAREER OPPORTUNITIES
                        </span>

                        <h1>
                            Find Your
                            <span> Dream Job.</span>
                        </h1>

                        <p>
                            Discover opportunities that match
                            your skills, experience, and career goals.
                        </p>

                    </div>

                    <div className="jobs-hero-mark">
                        JOBS
                    </div>

                </section>


                {/* =====================================
                    SEARCH
                ====================================== */}

                <section className="jobs-search">

                    <div className="jobs-search__header">

                        <div>

                            <span>
                                SEARCH
                            </span>

                            <h2>
                                Find the right opportunity
                            </h2>

                        </div>

                        <small>
                            Refine your search below
                        </small>

                    </div>


                    <div className="jobs-search__fields">

                        {/* Keyword */}

                        <div className="jobs-field jobs-field--keyword">

                            <label>
                                JOB TITLE
                            </label>

                            <div className="jobs-input-wrapper">

                                <span className="jobs-input-icon">
                                    ⌕
                                </span>

                                <input
                                    type="text"
                                    placeholder="e.g. Python Developer"
                                    value={keyword}
                                    onChange={(e) =>
                                        setKeyword(
                                            e.target.value
                                        )
                                    }
                                    onKeyDown={handleKeyDown}
                                />

                            </div>

                        </div>


                        {/* Location */}

                        <div className="jobs-field">

                            <label>
                                LOCATION
                            </label>

                            <div className="jobs-input-wrapper">

                                <span className="jobs-input-icon">
                                    ⌖
                                </span>

                                <input
                                    type="text"
                                    placeholder="e.g. Bengaluru"
                                    value={location}
                                    onChange={(e) =>
                                        setLocation(
                                            e.target.value
                                        )
                                    }
                                    onKeyDown={handleKeyDown}
                                />

                            </div>

                        </div>


                        {/* Salary */}

                        <div className="jobs-field">

                            <label>
                                MINIMUM SALARY
                            </label>

                            <div className="jobs-input-wrapper">

                                <span className="jobs-input-icon">
                                    ₹
                                </span>

                                <input
                                    type="number"
                                    placeholder="e.g. 500000"
                                    value={salary}
                                    onChange={(e) =>
                                        setSalary(
                                            e.target.value
                                        )
                                    }
                                    onKeyDown={handleKeyDown}
                                />

                            </div>

                        </div>


                        {/* Search Button */}

                        <button
                            type="button"
                            className="jobs-search-button"
                            onClick={searchJobs}
                        >
                            Search
                            <span>→</span>
                        </button>

                    </div>

                </section>


                {/* =====================================
                    RESULTS HEADER
                ====================================== */}

                <div className="jobs-results-header">

                    <div>

                        <span>
                            OPPORTUNITIES
                        </span>

                        <h2>
                            Available Jobs
                        </h2>

                    </div>

                    {!loading && jobs.length > 0 && (

                        <p>
                            Showing {jobs.length} opportunities
                        </p>

                    )}

                </div>


                {/* =====================================
                    LOADING
                ====================================== */}

                {loading ? (

                    <div className="jobs-state">

                        <div className="jobs-loader"></div>

                        <p>
                            Finding opportunities...
                        </p>

                    </div>

                ) : jobs.length === 0 ? (

                    /* =====================================
                       EMPTY STATE
                    ====================================== */

                    <div className="jobs-empty">

                        <div className="jobs-empty__icon">
                            ⌕
                        </div>

                        <span className="jobs-eyebrow">
                            NO RESULTS
                        </span>

                        <h2>
                            No jobs found.
                        </h2>

                        <p>
                            Try changing your search criteria
                            or explore a different location.
                        </p>

                        <button
                            type="button"
                            onClick={() => {

                                setKeyword("");
                                setLocation("");
                                setSalary("");
                                setPage(1);

                            }}
                        >
                            Clear Search
                        </button>

                    </div>

                ) : (

                    /* =====================================
                       JOB LIST
                    ====================================== */

                    <div className="jobs-list">

                        {jobs.map((job) => (

                            <JobCard
                                key={job.id}
                                job={job}
                                isAuthenticated={isAuthenticated}
                                role={role}
                                onApply={applyJob}
                                onSave={saveJob}
                                isApplied={
                                    appliedJobsIds.includes(
                                        job.id
                                    )
                                }
                                isSaved={
                                    savedJobsIds.includes(
                                        job.id
                                    )
                                }
                            />

                        ))}

                    </div>

                )}


                {/* =====================================
                    PAGINATION
                ====================================== */}

                <div className="jobs-pagination">

                    <button
                        type="button"
                        disabled={
                            page === 1 ||
                            loading
                        }
                        onClick={() =>
                            setPage(
                                (previousPage) =>
                                    previousPage - 1
                            )
                        }
                    >
                        ← Previous
                    </button>


                    <div className="jobs-pagination__page">

                        <span>
                            PAGE
                        </span>

                        <strong>
                            {page}
                        </strong>

                    </div>


                    <button
                        type="button"
                        disabled={
                            loading ||
                            jobs.length < 10
                        }
                        onClick={() =>
                            setPage(
                                (previousPage) =>
                                    previousPage + 1
                            )
                        }
                    >
                        Next →
                    </button>

                </div>

            </main>

        </div>

    );

}