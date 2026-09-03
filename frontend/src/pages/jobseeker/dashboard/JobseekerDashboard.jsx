import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/layout/Navbar";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import "./JobseekerDashboard.css"

export default function JobseekerDashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchApplications = async () => {

        try {

            const response = await api.get("/applications/me");

            setApplications(response.data);

        }
        catch (error) {

            console.error(
                "Failed to load application statistics:",
                error
            );

            toast.warning(
                "Unable to load application statistics"
            );

        }
        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchApplications();

    }, []);


    const totalApplications = applications.length;

    const pendingApplications = applications.filter(
        (application) =>
            application.status === "pending"
    ).length;

    const shortlistedApplications = applications.filter(
        (application) =>
            application.status === "shortlisted"
    ).length;

    const hiredApplications = applications.filter(
        (application) =>
            application.status === "hired"
    ).length;


    return (

        <div className="js-dashboard">

            <Navbar />

            <main className="js-dashboard__main">

                {/* Welcome */}

                <section className="js-welcome">

                    <div className="js-welcome__content">

                        <span className="js-eyebrow">
                            Job Seeker Dashboard
                        </span>

                        <h1 className="js-welcome__title">

                            Welcome,

                            <span>
                                {" "}{user?.full_name}
                            </span>

                        </h1>

                        <p className="js-welcome__text">

                            Manage your profile, discover opportunities,
                            and keep track of your job applications.

                        </p>

                    </div>

                    <div className="js-welcome__icon">
                        <i className="bi bi-person-workspace"></i>
                    </div>

                </section>


                {/* Application Statistics */}

                <section className="js-stats">

                    {/* Total */}

                    <div className="js-stat">

                        <div className="js-stat__content">

                            <span className="js-stat__label">
                                Total Applications
                            </span>

                            <strong className="js-stat__number">

                                {loading ? (
                                    <span className="js-spinner"></span>
                                ) : (
                                    totalApplications
                                )}

                            </strong>

                        </div>

                        <div className="js-stat__icon js-stat__icon--primary">
                            <i className="bi bi-file-earmark-text"></i>
                        </div>

                    </div>


                    {/* Pending */}

                    <div className="js-stat">

                        <div className="js-stat__content">

                            <span className="js-stat__label">
                                Pending
                            </span>

                            <strong className="js-stat__number">

                                {loading ? (
                                    <span className="js-spinner"></span>
                                ) : (
                                    pendingApplications
                                )}

                            </strong>

                        </div>

                        <div className="js-stat__icon js-stat__icon--warning">
                            <i className="bi bi-hourglass-split"></i>
                        </div>

                    </div>


                    {/* Shortlisted */}

                    <div className="js-stat">

                        <div className="js-stat__content">

                            <span className="js-stat__label">
                                Shortlisted
                            </span>

                            <strong className="js-stat__number">

                                {loading ? (
                                    <span className="js-spinner"></span>
                                ) : (
                                    shortlistedApplications
                                )}

                            </strong>

                        </div>

                        <div className="js-stat__icon js-stat__icon--accent">
                            <i className="bi bi-star-fill"></i>
                        </div>

                    </div>


                    {/* Hired */}

                    <div className="js-stat">

                        <div className="js-stat__content">

                            <span className="js-stat__label">
                                Hired
                            </span>

                            <strong className="js-stat__number">

                                {loading ? (
                                    <span className="js-spinner"></span>
                                ) : (
                                    hiredApplications
                                )}

                            </strong>

                        </div>

                        <div className="js-stat__icon js-stat__icon--success">
                            <i className="bi bi-check-circle-fill"></i>
                        </div>

                    </div>

                </section>


                {/* Quick Actions */}

                <section className="js-actions">

                    <div className="js-section-heading">

                        <div>

                            <span className="js-eyebrow">
                                Get Started
                            </span>

                            <h2>
                                Quick Actions
                            </h2>

                        </div>

                    </div>


                    <div className="js-action-grid">

                        {/* Profile */}

                        <article className="js-action-card">

                            <div className="js-action-card__icon">
                                <i className="bi bi-person-circle"></i>
                            </div>

                            <h3>
                                My Profile
                            </h3>

                            <p>
                                Update your profile and resume.
                            </p>

                            <button
                                className="js-btn js-btn--primary"
                                onClick={() =>
                                    navigate("/jobseeker/profile")
                                }
                            >
                                Open Profile
                                <i className="bi bi-arrow-right"></i>
                            </button>

                        </article>


                        {/* Browse Jobs */}

                        <article className="js-action-card">

                            <div className="js-action-card__icon">
                                <i className="bi bi-briefcase-fill"></i>
                            </div>

                            <h3>
                                Browse Jobs
                            </h3>

                            <p>
                                Find your next opportunity.
                            </p>

                            <button
                                className="js-btn js-btn--primary"
                                onClick={() =>
                                    navigate("/jobs")
                                }
                            >
                                Find Jobs
                                <i className="bi bi-arrow-right"></i>
                            </button>

                        </article>


                        {/* Applications */}

                        <article className="js-action-card">

                            <div className="js-action-card__icon">
                                <i className="bi bi-file-earmark-text"></i>
                            </div>

                            <h3>
                                Applications
                            </h3>

                            <p>
                                Track your applications and status.
                            </p>

                            <button
                                className="js-btn js-btn--primary"
                                onClick={() =>
                                    navigate(
                                        "/jobseeker/applications"
                                    )
                                }
                            >
                                View Applications
                                <i className="bi bi-arrow-right"></i>
                            </button>

                        </article>


                        {/* Saved Jobs */}

                        <article className="js-action-card">

                            <div className="js-action-card__icon">
                                <i className="bi bi-bookmark-heart-fill"></i>
                            </div>

                            <h3>
                                Saved Jobs
                            </h3>

                            <p>
                                View jobs saved for later.
                            </p>

                            <button
                                className="js-btn js-btn--primary"
                                onClick={() =>
                                    navigate("/saved-jobs")
                                }
                            >
                                View Saved
                                <i className="bi bi-arrow-right"></i>
                            </button>

                        </article>

                    </div>

                </section>


                {/* CTA */}

                <section className="js-cta">

                    <div className="js-cta__icon">
                        <i className="bi bi-rocket-takeoff"></i>
                    </div>

                    <div className="js-cta__content">

                        <span className="js-eyebrow">
                            Keep Moving Forward
                        </span>

                        <h2>
                            Your Next Opportunity Awaits
                        </h2>

                        <p>
                            Keep your profile updated and apply to
                            jobs that match your skills.
                        </p>

                    </div>

                    <button
                        className="js-btn js-btn--light"
                        onClick={() =>
                            navigate("/jobs")
                        }
                    >
                        Find Jobs
                        <i className="bi bi-arrow-right"></i>
                    </button>

                </section>

            </main>

        </div>

    );

}