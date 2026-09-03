import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/layout/Navbar";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "./JobDetails.css";

export default function JobDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const { user, isAuthenticated } = useAuth();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);


    const fetchJob = async () => {

        try {

            const response = await api.get(`/jobs/${id}`);

            setJob(response.data);

        } catch (error) {

            console.error("Failed to fetch job:", error);

            toast.error(
                error.response?.data?.detail ||
                "Failed to load job"
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchJob();

    }, [id]);


    const applyJob = async () => {

        try {

            await api.post(`/applications/jobs/${job.id}`);

            toast.success(
                "Application submitted successfully"
            );

        } catch (error) {

            console.error(error);

            toast.warning(
                error.response?.data?.detail ||
                "Failed to apply"
            );

        }

    };


    const saveJob = async () => {

        try {

            await api.post(`/saved-jobs/${job.id}`);

            toast.info(
                "Job saved successfully"
            );

        } catch (error) {

            console.error(error);

            toast.warning(
                error.response?.data?.detail ||
                "Failed to save job"
            );

        }

    };


    /* =========================================
       LOADING
    ========================================= */

    if (loading) {

        return (

            <div className="job-details-page">

                <Navbar />

                <main className="job-details-container">

                    <div className="job-details-state">

                        <div className="job-details-loader"></div>

                        <p>
                            Loading job details...
                        </p>

                    </div>

                </main>

            </div>

        );

    }


    /* =========================================
       JOB NOT FOUND
    ========================================= */

    if (!job) {

        return (

            <div className="job-details-page">

                <Navbar />

                <main className="job-details-container">

                    <div className="job-not-found">

                        <div className="job-not-found__icon">
                            !
                        </div>

                        <span className="job-details-label">
                            JOB
                        </span>

                        <h1>
                            Job not found.
                        </h1>

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

                {/* Back */}

                <button
                    type="button"
                    className="job-back"
                    onClick={() => navigate("/jobs")}
                >
                    ← Back to Jobs
                </button>


                {/* Job Header */}

                <section className="job-header">

                    <div className="job-header__main">

                        <div className="job-company-icon">
                            ▣
                        </div>

                        <div className="job-header__content">

                            <span className="job-details-label">
                                JOB OPPORTUNITY
                            </span>

                            <h1>
                                {job.title}
                            </h1>

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


                {/* Main Content */}

                <div className="job-details-grid">

                    {/* Job Information */}

                    <section className="job-main-card">

                        {/* Overview */}

                        <div className="job-overview">

                            <div className="job-overview-item">

                                <span className="job-overview-icon">
                                    ⌖
                                </span>

                                <div>

                                    <span>
                                        LOCATION
                                    </span>

                                    <strong>
                                        {job.location}
                                    </strong>

                                </div>

                            </div>


                            <div className="job-overview-item">

                                <span className="job-overview-icon">
                                    ₹
                                </span>

                                <div>

                                    <span>
                                        SALARY
                                    </span>

                                    <strong>
                                        ₹{job.salary}
                                    </strong>

                                </div>

                            </div>


                            <div className="job-overview-item">

                                <span className="job-overview-icon">
                                    ◉
                                </span>

                                <div>

                                    <span>
                                        RECRUITER
                                    </span>

                                    <strong>
                                        {job.recruiter?.full_name}
                                    </strong>

                                </div>

                            </div>

                        </div>


                        <div className="job-divider"></div>


                        {/* Description */}

                        <div className="job-description-section">

                            <div className="job-section-heading">

                                <span className="job-section-number">
                                    01
                                </span>

                                <div>

                                    <span>
                                        ROLE
                                    </span>

                                    <h2>
                                        Job Description
                                    </h2>

                                </div>

                            </div>


                            <p className="job-description">

                                {job.description}

                            </p>

                        </div>

                    </section>


                    {/* Action Card */}

                    {(!isAuthenticated) ? (

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
                                        navigate(
                                            "/choose-login-role"
                                        )
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