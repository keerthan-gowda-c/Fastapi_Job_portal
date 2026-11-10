import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/layout/Navbar";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import JobCard from "../../components/jobs/JobCard";
import useJobStore, { getJobsCacheKey, } from "../../store/jobStore";
import "./Jobs.css";
import useRecruiterApplicationsStore from "../../store/recruiterApplicationsStore";


const EMPTY_ARRAY = [];
export default function Jobs() {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const role = user?.role;
    const userId = user?.id;
    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [page, setPage] = useState(1);

    const params = useMemo(() => {
        const result = {
            page,
            limit: 10
        };
        if (keyword.trim() !== "") {
            result.keyword = keyword.trim();
        }
        if (location.trim() !== "") {
            result.location = location.trim();
        }
        if (salary !== "") {
            result.salary = salary;
        }
        return result;
    }, [page, keyword, location, salary]);

    const jobsKey = getJobsCacheKey(params);
    const jobs = useJobStore(
        (state) => state.jobsCache[jobsKey] ?? EMPTY_ARRAY
    );
    const loading = useJobStore(
        (state) => state.loadingKeys[jobsKey] ?? false
    );
    const fetchJobs = useJobStore(
        (state) => state.fetchJobs
    );
    const appliedJobsIds = useJobStore(
        (state) =>
            state.userJobStatus[String(userId)]?.appliedIds ?? EMPTY_ARRAY
    );
    const savedJobsIds = useJobStore(
        (state) =>
            state.userJobStatus[String(userId)]?.savedIds ?? EMPTY_ARRAY
    );
    const fetchUserJobStatus = useJobStore(
        (state) => state.fetchUserJobStatus
    );
    const markJobApplied = useJobStore(
        (state) => state.markJobApplied
    );
    const markJobSaved = useJobStore(
        (state) => state.markJobSaved
    );
    const invalidateApplications = useRecruiterApplicationsStore(
        (state) => state.invalidateApplications
    );
    useEffect(() => {
        fetchJobs(params).catch((error) => {
           toast.info(
                error.response?.data?.detail ||
                "It takes some time"
            );
        });
    }, [params, fetchJobs]);

    const searchJobs = () => {
        if (page === 1) {
            fetchJobs(params, true).catch((error) => {
            });
        }
        else {
            setPage(1);
        }
    };
    // Apply for a job.
    const applyJob = async (jobId) => {
        try {
            await api.post(
                `/applications/jobs/${jobId}`
            );
            markJobApplied(userId, jobId);
            invalidateApplications();
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

    // Save a job.
    const saveJob = async (jobId) => {
        try {
            await api.post(
                `/saved-jobs/${jobId}`
            );
            markJobSaved(userId, jobId);
            toast.success(
                "Job saved successfully"
            );
        }
        catch (error) {
            toast.warning(
                error.response?.data?.detail ||
                "Failed to save job"
            );
        }
    };

    useEffect(() => {
        if (
            isAuthenticated &&
            role === "jobseeker" &&
            userId != null
        ) {
            fetchUserJobStatus(userId).catch((error) => {
                console.error(
                    "Failed to fetch job status: ",
                    error
                );
            });
        }
    }, [
        isAuthenticated,
        role,
        userId,
        fetchUserJobStatus
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
                                    type="text"
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