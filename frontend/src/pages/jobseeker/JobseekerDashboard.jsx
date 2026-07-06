import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

function JobseekerDashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <>
            <Navbar />

            <div className="container py-5">

                {/* Welcome Card */}

                <div className="card border-0 shadow-lg rounded-4 mb-5">

                    <div className="card-body p-5">

                        <h1 className="fw-bold">

                            Welcome,
                            <span className="text-primary">
                                {" "}{user?.full_name}
                            </span>

                        </h1>

                        <p className="lead text-muted mt-3">

                            Manage your profile, explore jobs,
                            track applications, and discover new
                            career opportunities.

                        </p>

                    </div>

                </div>

                <div className="row g-4">

                    {/* Profile */}

                    <div className="col-md-6 col-lg-3">

                        <div className="card border-0 shadow h-100 rounded-4">

                            <div className="card-body text-center p-4">

                                <div className="display-4 mb-3">

                                    👤

                                </div>

                                <h4 className="fw-bold">

                                    My Profile

                                </h4>

                                <p className="text-muted">

                                    Update your profile and resume.

                                </p>

                                <button
                                    className="btn btn-primary rounded-pill px-4"
                                    onClick={() =>
                                        navigate("/jobseeker/profile")
                                    }
                                >
                                    Open
                                </button>

                            </div>

                        </div>

                    </div>

                    {/* Browse Jobs */}

                    <div className="col-md-6 col-lg-3">

                        <div className="card border-0 shadow h-100 rounded-4">

                            <div className="card-body text-center p-4">

                                <div className="display-4 mb-3">

                                    💼

                                </div>

                                <h4 className="fw-bold">

                                    Browse Jobs

                                </h4>

                                <p className="text-muted">

                                    Explore the latest job opportunities.

                                </p>

                                <button
                                    className="btn btn-success rounded-pill px-4"
                                    onClick={() =>
                                        navigate("/jobs")
                                    }
                                >
                                    Browse
                                </button>

                            </div>

                        </div>

                    </div>

                    {/* Applications */}

                    <div className="col-md-6 col-lg-3">

                        <div className="card border-0 shadow h-100 rounded-4">

                            <div className="card-body text-center p-4">

                                <div className="display-4 mb-3">

                                    📄

                                </div>

                                <h4 className="fw-bold">

                                    Applications

                                </h4>

                                <p className="text-muted">

                                    View all applied jobs and status.

                                </p>

                                <button
                                    className="btn btn-warning rounded-pill px-4"
                                    onClick={() =>
                                        navigate("/jobseeker/applications")
                                    }
                                >
                                    View
                                </button>

                            </div>

                        </div>

                    </div>

                    {/* Saved Jobs */}

                    <div className="col-md-6 col-lg-3">

                        <div className="card border-0 shadow h-100 rounded-4">

                            <div className="card-body text-center p-4">

                                <div className="display-4 mb-3">

                                    ❤️

                                </div>

                                <h4 className="fw-bold">

                                    Saved Jobs

                                </h4>

                                <p className="text-muted">

                                    View jobs you saved for later.

                                </p>

                                <button
                                    className="btn btn-info text-white rounded-pill px-4"
                                    onClick={() =>
                                        navigate("/saved-jobs")
                                    }
                                >
                                    Open
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Motivation Section */}

                <div className="card mt-5 border-0 bg-primary text-white rounded-4 shadow-lg">

                    <div className="card-body text-center p-5">

                        <h2 className="fw-bold">

                            🚀 Your Next Opportunity Awaits!

                        </h2>

                        <p className="lead mt-3">

                            Keep your profile updated and apply to
                            jobs that match your skills.

                        </p>

                        <button
                            className="btn btn-light btn-lg rounded-pill px-5 mt-3"
                            onClick={() => navigate("/jobs")}
                        >
                            Find Jobs
                        </button>

                    </div>

                </div>

            </div>

        </>
    );

}

export default JobseekerDashboard;