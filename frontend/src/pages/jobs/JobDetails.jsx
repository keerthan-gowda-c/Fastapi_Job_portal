
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import api from "../../api/axios";
import Navbar from "../../components/layout/Navbar";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "./JobDetails.css";
import useJobStore from "../../store/jobStore";
import useSavedJobsStore from "../../store/savedJobsStore";
import useMyApplicationsStore from "../../store/myApplicationsStore";

export default function JobDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();

    const cachedJob = useJobStore((state) =>
        Object.values(state.jobsCache)
            .flat()
            .find((item) => String(item.id) === String(id))
    );

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    const markJobApplied = useJobStore((state) => state.markJobApplied);
    const markJobSaved = useJobStore((state) => state.markJobSaved);
    const fetchUserJobStatus = useJobStore((state) => state.fetchUserJobStatus);

    const invalidateApplications = useMyApplicationsStore(
        (state) => state.invalidateApplications
    );

    const invalidateSavedJobs = useSavedJobsStore(
        (state) => state.invalidateSavedJobs
    );

    const clearUserJobStatus = useJobStore(
        (state) => state.clearUserJobStatus
    );

    useEffect(() => {
        let cancelled = false;

        const fetchJob = async () => {
            setLoading(true);
            setJob(null);

            if (cachedJob) {
                setJob(cachedJob);
                setLoading(false);
                return;
            }

            try {
                const response = await api.get(`/jobs/${id}`);

                if (!cancelled) {
                    setJob(response.data);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error("Failed to fetch job:", error);

                    toast.error(
                        error.response?.data?.detail ||
                        "Failed to load job"
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchJob();

        return () => {
            cancelled = true;
        };
    }, [id, cachedJob]);

    useEffect(() => {
        if (isAuthenticated && user?.role === "jobseeker" && user?.id != null) {
            fetchUserJobStatus(user.id).catch((error) => {
                console.error("Failed to fetch job status:", error);
            });
        }
    }, [isAuthenticated, user?.role, user?.id, fetchUserJobStatus]);

    const applyJob = async () => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        if (user?.role !== "jobseeker") {
            toast.warning("Only jobseekers can apply for jobs");
            return;
        }

        try {
            await api.post(`/applications/jobs/${job.id}`);

            markJobApplied(user.id, job.id);
            invalidateApplications();

            toast.success("Application submitted successfully");
        } catch (error) {
            console.error(error);

            toast.warning(
                error.response?.data?.detail ||
                "Failed to apply"
            );
        }
    };

    const saveJob = async () => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        if (user?.role !== "jobseeker") {
            toast.warning("Only jobseekers can save jobs");
            return;
        }

        try {
            await api.post(`/saved-jobs/${job.id}`);

            markJobSaved(user.id, job.id);
            invalidateApplications();

            toast.success("Job saved successfully");
        } catch (error) {
            console.error(error);

            toast.warning(
                error.response?.data?.detail ||
                "Failed to save job"
            );
        }
    };

    if (loading) {
        return (
            <div className="job-details-page">
                <Navbar />

                <main className="job-details-container">
                    <div className="job-details-state">
                        <div className="job-details-loader"></div>
                        <p>Loading job details...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="job-details-page">
                <Navbar />

                <main className="job-details-container">
                    <div className="job-not-found">
                        <div className="job-not-found__icon">!</div>

                        <span className="job-details-label">
                            JOB
                        </span>

                        <h1>Job not found.</h1>

                        <p>
                            The job you're looking for could not
                            be found or may no longer be available.
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/jobs")}
                        >
                            ← Browse Jobs
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="job-details-page">
            <Navbar />

            <main className="job-details-container">
                <button
                    type="button"
                    className="job-back"
                    onClick={() => navigate("/jobs")}
                >
                    ← Back to Jobs
                </button>

                <section className="job-header">
                    <div className="job-header__main">
                        <div className="job-company-icon">
                            ▣
                        </div>

                        <div className="job-header__content">
                            <span className="job-details-label">
                                JOB OPPORTUNITY
                            </span>

                            <h1>{job.title}</h1>

                            <button
                                type="button"
                                className="job-company-link"
                                onClick={() =>
                                    navigate(
                                        `/companies/details/${job.company.id}`
                                    )
                                }
                            >
                                {job.company?.name}
                                <span>↗</span>
                            </button>
                        </div>
                    </div>

                    <div className="job-type-badge">
                        {job.employment_type}
                    </div>
                </section>

                <div className="job-details-grid">
                    <section className="job-main-card">
                        <div className="job-overview">
                            <div className="job-overview-item">
                                <span className="job-overview-icon">
                                    ⌖
                                </span>

                                <div>
                                    <span>LOCATION</span>
                                    <strong>{job.location}</strong>
                                </div>
                            </div>

                            <div className="job-overview-item">
                                <span className="job-overview-icon">
                                    ₹
                                </span>

                                <div>
                                    <span>SALARY</span>
                                    <strong>
                                        {job.salary || "Not Disclosed"}
                                    </strong>
                                </div>
                            </div>

                            <div className="job-overview-item">
                                <span className="job-overview-icon">
                                    ◉
                                </span>

                                <div>
                                    <span>RECRUITER</span>
                                    <strong>
                                        {job.recruiter?.full_name}
                                    </strong>
                                </div>
                            </div>
                        </div>

                        <div className="job-divider"></div>

                        <div className="job-description-section">
                            <div className="job-section-heading">
                                <div>
                                    <span>
                                        ROLE : {job.title}
                                    </span>

                                    <h5>Job Description</h5>
                                </div>
                            </div>

                            <div
                                className="job-description job-description-formatted"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(
                                        job.description || ""
                                    )
                                }}
                            />
                        </div>
                    </section>

                    {!isAuthenticated ? (
                        <aside className="job-action-card">
                            <span className="job-section-number">
                                02
                            </span>

                            <span className="job-action-label">
                                READY TO APPLY?
                            </span>

                            <h2>
                                Take the next step in your career.
                            </h2>

                            <p>
                                Login to your JobHive account to
                                apply for this opportunity.
                            </p>

                            <div className="job-actions">
                                <button
                                    type="button"
                                    className="job-action-primary"
                                    onClick={() =>
                                        navigate("/choose-login-role")
                                    }
                                >
                                    Login to Apply
                                    <span>→</span>
                                </button>
                            </div>
                        </aside>
                    ) : user?.role === "jobseeker" ? (
                        <aside className="job-action-card">
                            <span className="job-section-number">
                                02
                            </span>

                            <span className="job-action-label">
                                APPLICATION
                            </span>

                            <h2>
                                Interested in this opportunity?
                            </h2>

                            <p>
                                Apply now or save this job for
                                later.
                            </p>

                            <div className="job-actions">
                                <button
                                    type="button"
                                    className="job-action-primary"
                                    onClick={applyJob}
                                >
                                    Apply Now
                                    <span>→</span>
                                </button>

                                <button
                                    type="button"
                                    className="job-action-secondary"
                                    onClick={saveJob}
                                >
                                    Save Job
                                </button>
                            </div>
                        </aside>
                    ) : null}
                </div>
            </main>
        </div>
    );
}
