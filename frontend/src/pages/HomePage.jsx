import { useNavigate } from "react-router-dom";

function HomePage() {

    const navigate = useNavigate();

    return (

        <div className="container mt-5">

            {/* Hero Section */}

            <div className="text-center mb-5">

                <h1 className="display-4 fw-bold">
                    Welcome to Job Portal
                </h1>

                <p className="lead mt-3">
                    Find your dream job or hire the perfect candidate.
                </p>

                <div className="mt-4">

                    <button
                        className="btn btn-info btn-lg me-3"
                        onClick={() => navigate("/jobs")}
                    >
                        Browse Jobs
                    </button>

                    <button
                        className="btn btn-primary btn-lg me-3"
                        onClick={() => navigate("/choose-login-role")}
                    >
                        Login
                    </button>

                    <button
                        className="btn btn-success btn-lg"
                        onClick={() => navigate("/choose-role")}
                    >
                        Register
                    </button>

                </div>

            </div>

            {/* Features */}

            <div className="row">

                <div className="col-md-4 mb-4">

                    <div className="card shadow h-100">

                        <div className="card-body text-center">

                            <h3>🔍 Find Jobs</h3>

                            <p className="mt-3">
                                Browse hundreds of job opportunities from
                                top companies.
                            </p>

                        </div>

                    </div>

                </div>

                <div className="col-md-4 mb-4">

                    <div className="card shadow h-100">

                        <div className="card-body text-center">

                            <h3>📄 Easy Apply</h3>

                            <p className="mt-3">
                                Upload your resume and apply for jobs
                                with one click.
                            </p>

                        </div>

                    </div>

                </div>

                <div className="col-md-4 mb-4">

                    <div className="card shadow h-100">

                        <div className="card-body text-center">

                            <h3>🏢 Recruit Talent</h3>

                            <p className="mt-3">
                                Recruiters can post jobs, review
                                applicants, and hire the best candidates.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {/* Footer */}

            <div className="text-center mt-5 mb-3">

                <hr />

                <p className="text-muted">
                    © 2025 Job Portal. All Rights Reserved.
                </p>

            </div>

        </div>

    );

}

export default HomePage;