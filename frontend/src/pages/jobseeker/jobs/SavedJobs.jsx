import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/layout/Navbar";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import "./SavedJobs.css";

export default function SavedJobs() {

    const navigate = useNavigate();

    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [removingId, setRemovingId] = useState(null);


    const fetchSavedJobs = async () => {

        setLoading(true);

        try {

            const response = await api.get("/saved-jobs");

            setSavedJobs(response.data);

        }
        catch (error) {

            console.error("Failed to load saved jobs:", error);

            toast.warning(
                error.response?.data?.detail ||
                "Failed to load saved jobs"
            );

        }
        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchSavedJobs();

    }, []);


    const removeSavedJob = async (jobId) => {

        setRemovingId(jobId);

        try {

            await api.delete(`/saved-jobs/${jobId}`);

            setSavedJobs((currentJobs) =>
                currentJobs.filter(
                    (savedJob) =>
                        savedJob.job.id !== jobId
                )
            );

            toast.success("Job removed from saved jobs");

        }
        catch (error) {

            console.error(error);

            toast.warning(
                error.response?.data?.detail ||
                "Failed to remove job"
            );

        }
        finally {

            setRemovingId(null);

        }

    };


    return (

        <div className="jh-page">

            <Navbar />

            <main className="jh-saved-jobs">

                {/* Header */}

                <section className="jh-section-header">

                    <span className="jh-section-eyebrow">
                        Your Shortlist
                    </span>

                    <h1 className="jh-heading">
                        Saved Jobs
                    </h1>

                    <p className="jh-section-subtitle">
                        Jobs you've saved for later.
                    </p>

                </section>


                {/* Loading */}

                {loading ? (

                    <div className="jh-state">

                        <div className="jh-spinner"></div>

                        <p>
                            Loading saved jobs...
                        </p>

                    </div>

                ) : savedJobs.length === 0 ? (

                    /* Empty State */

                    <section className="jh-empty">

                        <div className="jh-empty__icon">
                            ♡
                        </div>

                        <h2>
                            No Saved Jobs
                        </h2>

                        <p>
                            Save jobs while browsing and they will
                            appear here.
                        </p>

                        <button
                            className="jh-btn jh-btn--primary"
                            onClick={() => navigate("/jobs")}
                        >
                            Browse Jobs
                            <span>→</span>
                        </button>

                    </section>

                ) : (

                    /* Saved Jobs */

                    <section className="jh-saved-jobs__grid">

                        {savedJobs.map((savedJob) => {

                            const job = savedJob.job;

                            return (

                                <article
                                    className="jh-saved-card"
                                    key={savedJob.id}
                                >

                                    {/* Card Content */}

                                    <div className="jh-saved-card__content">

                                        <div className="jh-saved-card__header">

                                            <div className="jh-saved-card__title">

                                                <h2>
                                                    {job.title}
                                                </h2>

                                                <p className="jh-location">
                                                    <span>📍</span>
                                                    {job.location}
                                                </p>

                                            </div>


                                            <span className="jh-saved-status">
                                                Saved
                                            </span>

                                        </div>


                                        <div className="jh-divider"></div>


                                        {/* Job Information */}

                                        <div className="jh-job-info">

                                            <div>

                                                <span className="jh-info-label">
                                                    Salary
                                                </span>

                                                <strong className="jh-salary">
                                                    ₹{job.salary}
                                                </strong>

                                            </div>


                                            <div>

                                                <span className="jh-info-label">
                                                    Employment Type
                                                </span>

                                                <strong>
                                                    {job.employment_type
                                                        ?.replaceAll("_", " ")
                                                    }
                                                </strong>

                                            </div>

                                        </div>

                                    </div>


                                    {/* Actions */}

                                    <div className="jh-saved-card__actions">

                                        <button
                                            className="jh-btn jh-btn--ghost"
                                            onClick={() =>
                                                navigate(
                                                    `/jobs/${job.id}`
                                                )
                                            }
                                        >
                                            View Details
                                            <span>→</span>
                                        </button>


                                        <button
                                            className="jh-btn jh-btn--danger-outline"
                                            disabled={
                                                removingId === job.id
                                            }
                                            onClick={() =>
                                                removeSavedJob(
                                                    job.id
                                                )
                                            }
                                        >

                                            {removingId === job.id ? (

                                                <>
                                                    <span className="jh-btn-spinner"></span>
                                                    Removing...
                                                </>

                                            ) : (

                                                <>
                                                    <span>×</span>
                                                    Remove
                                                </>

                                            )}

                                        </button>

                                    </div>

                                </article>

                            );

                        })}

                    </section>

                )}

            </main>

        </div>

    );

}