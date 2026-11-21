import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/layout/Navbar";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import JobCard from "../../components/jobs/JobCard";
import useJobStore, { getJobsCacheKey } from "../../store/jobStore";
import "./Jobs.css";
import useRecruiterApplicationsStore from "../../store/recruiterApplicationsStore";

const EMPTY_ARRAY = [];
const PAGE_SIZE = 12;

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
        const result = { page, limit: PAGE_SIZE };
        if (keyword.trim() !== "") result.keyword = keyword.trim();
        if (location.trim() !== "") result.location = location.trim();
        if (salary !== "") result.salary = salary;
        return result;
    }, [page, keyword, location, salary]);

    const jobsKey = getJobsCacheKey(params);
    const jobs = useJobStore((state) => state.jobsCache[jobsKey] ?? EMPTY_ARRAY);
    const loading = useJobStore((state) => state.loadingKeys[jobsKey] ?? false);
    const fetchJobs = useJobStore((state) => state.fetchJobs);
    const appliedJobsIds = useJobStore(
        (state) => state.userJobStatus[String(userId)]?.appliedIds ?? EMPTY_ARRAY
    );
    const savedJobsIds = useJobStore(
        (state) => state.userJobStatus[String(userId)]?.savedIds ?? EMPTY_ARRAY
    );
    const fetchUserJobStatus = useJobStore((state) => state.fetchUserJobStatus);
    const markJobApplied = useJobStore((state) => state.markJobApplied);
    const markJobSaved = useJobStore((state) => state.markJobSaved);
    const invalidateApplications = useRecruiterApplicationsStore(
        (state) => state.invalidateApplications
    );

    useEffect(() => {
        fetchJobs(params).catch((error) => {
            toast.info(error.response?.data?.detail || "It takes some time");
        });
    }, [params, fetchJobs]);

    useEffect(() => {
        if (isAuthenticated && role === "jobseeker" && userId != null) {
            fetchUserJobStatus(userId).catch((error) => {
                console.error("Failed to fetch job status: ", error);
            });
        }
    }, [isAuthenticated, role, userId, fetchUserJobStatus]);

    const searchJobs = () => {
        if (page === 1) {
            fetchJobs(params, true).catch(() => {});
        } else {
            setPage(1);
        }
    };

    // Apply for a job.
    const applyJob = async (jobId) => {
        try {
            await api.post(`/applications/jobs/${jobId}`);
            markJobApplied(userId, jobId);
            invalidateApplications();
            toast.success("Application submitted successfully");
        } catch (error) {
            console.log(error);
            toast.warning(error.response?.data?.detail || "Failed to apply");
        }
    };

    // Save a job.
    const saveJob = async (jobId) => {
        try {
            await api.post(`/saved-jobs/${jobId}`);
            markJobSaved(userId, jobId);
            toast.success("Job saved successfully");
        } catch (error) {
            toast.warning(error.response?.data?.detail || "Failed to save job");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        searchJobs();
    };

    const clearAll = () => {
        setKeyword("");
        setLocation("");
        setSalary("");
        setPage(1);
    };

    const activeFilters = [
        keyword.trim() && { label: keyword.trim(), icon: "bi-search", clear: () => setKeyword("") },
        location.trim() && { label: location.trim(), icon: "bi-geo-alt", clear: () => setLocation("") },
        salary !== "" && { label: `₹${salary}+`, icon: "bi-currency-rupee", clear: () => setSalary("") },
    ].filter(Boolean);

    return (
        <div className="jobs-page">
            <Navbar />

            <main className="jobs-container">
                {/* Header + search */}
                <section className="jobs-hero">
                    <div className="jobs-hero__text">
                        <h1>Find your next job</h1>
                        <p>Search by title, location or minimum salary. Results update as you type.</p>
                    </div>

                    <form className="jobs-search" onSubmit={handleSubmit}>
                        <div className="jobs-field">
                            <label htmlFor="jobs-keyword">Job title</label>
                            <div className="jobs-input">
                                <i className="bi bi-search" />
                                <input
                                    id="jobs-keyword"
                                    type="text"
                                    placeholder="e.g. Python Developer"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="jobs-field">
                            <label htmlFor="jobs-location">Location</label>
                            <div className="jobs-input">
                                <i className="bi bi-geo-alt" />
                                <input
                                    id="jobs-location"
                                    type="text"
                                    placeholder="e.g. Bengaluru"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="jobs-field">
                            <label htmlFor="jobs-salary">Minimum salary</label>
                            <div className="jobs-input">
                                <i className="bi bi-currency-rupee" />
                                <input
                                    id="jobs-salary"
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="e.g. 500000"
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                />
                            </div>
                        </div>

                        <button type="submit" className="jobs-search__btn">
                            Search
                        </button>
                    </form>
                </section>

                {/* Results header */}
                <div className="jobs-results-header">
                    <div>
                        <h2>Available jobs</h2>
                        {!loading && jobs.length > 0 && (
                            <p>
                                Showing {jobs.length} job{jobs.length === 1 ? "" : "s"} on page {page}
                            </p>
                        )}
                    </div>

                    {activeFilters.length > 0 && (
                        <div className="jobs-filters">
                            {activeFilters.map((f) => (
                                <button
                                    key={f.label}
                                    type="button"
                                    className="jobs-filter"
                                    onClick={() => {
                                        f.clear();
                                        setPage(1);
                                    }}
                                    aria-label={`Remove filter ${f.label}`}
                                >
                                    <i className={`bi ${f.icon}`} />
                                    {f.label}
                                    <i className="bi bi-x" />
                                </button>
                            ))}
                            <button type="button" className="jobs-filters__clear" onClick={clearAll}>
                                Clear all
                            </button>
                        </div>
                    )}
                </div>

                {/* Results */}
                {loading ? (
                    <div className="jobs-list" aria-busy="true">
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="jobs-skel" />
                        ))}
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="jobs-empty">
                        <span className="jobs-empty__icon">
                            <i className="bi bi-search" />
                        </span>
                        <h2>No jobs found</h2>
                        <p>Try a different title, or search a nearby location.</p>
                        <button type="button" className="jobs-btn" onClick={clearAll}>
                            Clear search
                        </button>
                    </div>
                ) : (
                    <div className="jobs-list">
                        {jobs.map((job) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                isAuthenticated={isAuthenticated}
                                role={role}
                                onApply={applyJob}
                                onSave={saveJob}
                                isApplied={appliedJobsIds.includes(job.id)}
                                isSaved={savedJobsIds.includes(job.id)}
                            />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                <nav className="jobs-pagination" aria-label="Pagination">
                    <button
                        type="button"
                        className="jobs-btn jobs-btn--ghost"
                        disabled={page === 1 || loading}
                        onClick={() => setPage((p) => p - 1)}
                    >
                        <i className="bi bi-chevron-left" /> Previous
                    </button>

                    <span className="jobs-pagination__page">
                        Page <strong>{page}</strong>
                    </span>

                    <button
                        type="button"
                        className="jobs-btn jobs-btn--ghost"
                        disabled={loading || jobs.length < PAGE_SIZE}
                        onClick={() => setPage((p) => p + 1)}
                    >
                        Next <i className="bi bi-chevron-right" />
                    </button>
                </nav>
            </main>
        </div>
    );
}