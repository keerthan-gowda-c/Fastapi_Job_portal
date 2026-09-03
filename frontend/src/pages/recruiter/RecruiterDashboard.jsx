
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios";
import Navbar from "../../components/layout/Navbar";
import "./RecruiterDashboard.css";


function RecruiterDashboard() {

    const navigate = useNavigate();

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);


    const fetchDashboard = async () => {

        try {

            const response = await api.get("/dashboard/recruiter");

            setStats(response.data);

        }
        catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.detail ||
                "Failed to load recruiter dashboard"
            );

        }
        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchDashboard();

    }, []);


    if (loading) {

        return (

            <>
                <Navbar />

                <div className="container py-5">

                    <div className="text-center py-5">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        />

                        <p className="text-muted mt-3">
                            Loading dashboard...
                        </p>

                    </div>

                </div>
            </>

        );

    }


    if (!stats) {

        return (

            <>
                <Navbar />

                <div className="container py-5">

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body text-center py-5">

                            <i className="bi bi-exclamation-circle fs-1 text-danger"></i>

                            <h4 className="fw-bold mt-3">
                                Unable to load dashboard
                            </h4>

                            <p className="text-muted">
                                Please try again.
                            </p>

                            <button
                                className="btn btn-primary rounded-pill px-4"
                                onClick={fetchDashboard}
                            >
                                Try Again
                            </button>

                        </div>

                    </div>

                </div>
            </>

        );

    }


    return (

        <>
            <Navbar />

            <div className="dashboard-bg">

                <div className="container py-5">

                    {/* Header */}

                    <div className="dashboard-header shadow-sm rounded-4 p-4 mb-5">

                        <div className="d-md-flex justify-content-between align-items-center">

                            <div>

                                <h2 className="fw-bold mb-1">
                                    Recruiter Dashboard
                                </h2>

                                <p className="text-muted mb-0">
                                    Manage companies, jobs and track hiring progress.
                                </p>

                            </div>


                            <div className="mt-3 mt-md-0 d-flex flex-wrap gap-2">

                                {stats.companies > 0 ? (

                                    <button
                                        className="btn btn-outline-primary px-4 rounded-pill"
                                        onClick={() =>
                                            navigate("/company/my-company")
                                        }
                                    >
                                        <i className="bi bi-building me-2"></i>
                                        View Company
                                    </button>

                                ) : (

                                    <button
                                        className="btn btn-primary px-4 rounded-pill"
                                        onClick={() =>
                                            navigate("/company/create")
                                        }
                                    >
                                        <i className="bi bi-plus-lg me-2"></i>
                                        Create Company
                                    </button>

                                )}


                                <button
                                    className="btn btn-success px-4 rounded-pill"
                                    onClick={() =>
                                        navigate("/job/create")
                                    }
                                >
                                    <i className="bi bi-plus-lg me-2"></i>
                                    Post Job
                                </button>


                                <button
                                    className="btn btn-outline-dark px-4 rounded-pill"
                                    onClick={() =>
                                        navigate("/my-jobs")
                                    }
                                >
                                    <i className="bi bi-briefcase me-2"></i>
                                    Manage Jobs
                                </button>

                            </div>

                        </div>

                    </div>


                    {/* Overview */}

                    <h5 className="fw-bold mb-3">
                        Overview
                    </h5>


                    <div className="row g-4">

                        <Card
                            title="Companies"
                            value={stats.companies ?? 0}
                            color="primary"
                            icon="bi-building"
                            onClick={() =>
                                navigate("/company/my-company")
                            }
                        />

                        <Card
                            title="Jobs"
                            value={stats.jobs ?? 0}
                            color="success"
                            icon="bi-briefcase"
                            onClick={() =>
                                navigate("/my-jobs")
                            }
                        />

                        <Card
                            title="Applications"
                            value={stats.applications ?? 0}
                            color="warning"
                            icon="bi-file-earmark-text"
                            onClick={() =>
                                navigate("/recruiter/recruiter-application")
                            }
                        />

                        <Card
                            title="Hire Rate"
                            value={`${stats.hire_rate ?? 0}%`}
                            color="info"
                            icon="bi-graph-up"
                        />

                    </div>


                    {/* Application Status */}

                    <h5 className="fw-bold mt-5 mb-3">
                        Application Status
                    </h5>


                    <div className="row g-4">

                        <Card
                            title="Pending"
                            value={stats.pending ?? 0}
                            color="secondary"
                            icon="bi-hourglass-split"
                        />

                        <Card
                            title="Shortlisted"
                            value={stats.shortlisted ?? 0}
                            color="primary"
                            icon="bi-person-check"
                        />

                        <Card
                            title="Hired"
                            value={stats.hired ?? 0}
                            color="success"
                            icon="bi-check-circle"
                        />

                        <Card
                            title="Rejected"
                            value={stats.rejected ?? 0}
                            color="danger"
                            icon="bi-x-circle"
                        />

                    </div>


                    {/* Quick Action */}

                    <div className="card border-0 shadow-sm rounded-4 mt-5">

                        <div className="card-body p-4">

                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">

                                <div>

                                    <h5 className="fw-bold">
                                        Manage Applications
                                    </h5>

                                    <p className="text-muted mb-md-0">
                                        Review candidates and update application statuses.
                                    </p>

                                </div>

                                <button
                                    className="btn btn-primary rounded-pill px-4 mt-3 mt-md-0"
                                    onClick={() =>
                                        navigate("/recruiter/recruiter-application")
                                    }
                                >
                                    View Applications
                                    <i className="bi bi-arrow-right ms-2"></i>
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>

    );

}


function Card({
    title,
    value,
    color,
    icon,
    onClick
}) {

    return (

        <div className="col-lg-3 col-md-6">

            <div
                className={`card dashboard-card border-0 shadow-sm h-100 ${
                    onClick ? "dashboard-card-clickable" : ""
                }`}
                onClick={onClick}
                role={onClick ? "button" : undefined}
            >

                <div className="card-body position-relative">

                    <div className={`top-line bg-${color}`}></div>


                    <div className="d-flex justify-content-between align-items-start">

                        <div>

                            <p className="text-muted fw-semibold mb-2">
                                {title}
                            </p>

                            <h2 className="fw-bold display-6 mb-0">
                                {value}
                            </h2>

                        </div>


                        <i
                            className={`bi ${icon} text-${color} fs-2`}
                        ></i>

                    </div>

                </div>

            </div>

        </div>

    );

}


export default RecruiterDashboard;