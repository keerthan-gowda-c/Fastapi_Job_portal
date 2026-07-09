import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./RecruiterDashboard.css";


function RecruiterDashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);

    const fetchDashboard = async () => {
        try {
            const response = await api.get("/dashboard/recruiter");
            setStats(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    if (!stats) {
        return (
            <>
                <Navbar />
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="spinner-border text-primary"></div>
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
                    <div className="dashboard-header shadow-sm rounded-4 p-4 mb-4">
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
                                        className="btn btn-outline-primary px-4"
                                        onClick={() => navigate("/company/my-company")}
                                    >
                                        🏢 View Company
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-primary px-4"
                                        onClick={() => navigate("/company/create")}
                                    >
                                        + Create Company
                                    </button>
                                )}

                                <button
                                    className="btn btn-success px-4"
                                    onClick={() => navigate("/job/create")}
                                >
                                    + Post Job
                                </button>

                                <button
                                    className="btn btn-outline-dark px-4"
                                    onClick={() => navigate("/my-jobs")}
                                >
                                    Manage Jobs
                                </button>

                            </div>
                        </div>
                    </div>

                    {/* Statistics */}

                    <h5 className="fw-bold mb-3">
                        Overview
                    </h5>

                    <div className="row g-4">

                        <Card
                            title="Companies"
                            value={stats.companies}
                            color="primary"
                        />

                        <Card
                            title="Jobs"
                            value={stats.jobs}
                            color="success"
                        />

                        <Card
                            title="Applications"
                            value={stats.applications}
                            color="warning"
                        />

                        <Card
                            title="Hire Rate"
                            value={`${stats.hire_rate}%`}
                            color="info"
                        />

                    </div>

                    <h5 className="fw-bold mt-5 mb-3">
                        Application Status
                    </h5>

                    <div className="row g-4">

                        <Card
                            title="Pending"
                            value={stats.pending}
                            color="secondary"
                        />

                        <Card
                            title="Shortlisted"
                            value={stats.shortlisted}
                            color="primary"
                        />

                        <Card
                            title="Hired"
                            value={stats.hired}
                            color="success"
                        />

                        <Card
                            title="Rejected"
                            value={stats.rejected}
                            color="danger"
                        />

                    </div>

                </div>
            </div>
        </>
    );
}

function Card({ title, value, color }) {
    return (
        <div className="col-lg-3 col-md-6">

            <div className="card dashboard-card border-0 shadow-sm h-100">

                <div className="card-body">

                    <div className={`top-line bg-${color}`}></div>

                    <p className="text-muted fw-semibold mb-2">
                        {title}
                    </p>

                    <h2 className="fw-bold display-6">
                        {value}
                    </h2>

                </div>

            </div>

        </div>
    );
}

export default RecruiterDashboard;