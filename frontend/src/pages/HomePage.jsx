import { useNavigate } from "react-router-dom";

function HomePage() {

    const navigate = useNavigate();

    return (

        <div className="container py-5">

            {/* Hero Section */}

            <div className="row align-items-center py-5">

    <div className="col-lg-6">

        <span className="badge bg-primary fs-6 px-3 py-2 mb-3">
            🚀 #1 Job Portal
        </span>

        <h1 className="display-3 fw-bold mb-4">
            Find Your <span className="text-primary">Dream Job</span>
        </h1>

        <p className="lead text-muted mb-4">
            Connect with top companies, apply instantly,
            and build your career with confidence.
        </p>

        <div>

            <button
                className="btn btn-primary btn-lg px-4 me-3 shadow"
                onClick={() => navigate("/jobs")}
            >
                Browse Jobs
            </button>

            <button
                className="btn btn-outline-primary btn-lg px-4 me-3"
                onClick={() => navigate("/choose-login-role")}
            >
                Login
            </button>

            <button
                className="btn btn-success btn-lg px-4 shadow"
                onClick={() => navigate("/choose-role")}
            >
                Register
            </button>

        </div>

    </div>

    <div className="col-lg-6 text-center">

        <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800"
            className="img-fluid rounded-4 shadow-lg"
            alt="Job Portal"
        />

    </div>

</div>

{/* Statistic section */}

<div className="row text-center my-5">

    <div className="col-md-3">

        <div className="card border-0 shadow-lg rounded-4">

            <div className="card-body">

                <h2 className="fw-bold text-primary">
                    500+
                </h2>

                <p className="text-muted">
                    Jobs
                </p>

            </div>

        </div>

    </div>

    <div className="col-md-3">

        <div className="card border-0 shadow-lg rounded-4">

            <div className="card-body">

                <h2 className="fw-bold text-success">
                    120+
                </h2>

                <p className="text-muted">
                    Companies
                </p>

            </div>

        </div>

    </div>

    <div className="col-md-3">

        <div className="card border-0 shadow-lg rounded-4">

            <div className="card-body">

                <h2 className="fw-bold text-warning">
                    5K+
                </h2>

                <p className="text-muted">
                    Job Seekers
                </p>

            </div>

        </div>

    </div>

    <div className="col-md-3">

        <div className="card border-0 shadow-lg rounded-4">

            <div className="card-body">

                <h2 className="fw-bold text-danger">
                    95%
                </h2>

                <p className="text-muted">
                    Success Rate
                </p>

            </div>

        </div>

    </div>

</div>

            {/* Features */}

            <h2 className="text-center fw-bold mb-5">
    Why Choose Us?
</h2>

<div className="row g-4">

    <div className="col-md-4">

        <div className="card border-0 shadow-lg rounded-4 h-100">

            <div className="card-body text-center p-5">

                <div className="display-4 mb-3">
                    🔍
                </div>

                <h4 className="fw-bold">
                    Find Jobs
                </h4>

                <p className="text-muted">
                    Browse thousands of verified job
                    opportunities from trusted companies.
                </p>

            </div>

        </div>

    </div>

    <div className="col-md-4">

        <div className="card border-0 shadow-lg rounded-4 h-100">

            <div className="card-body text-center p-5">

                <div className="display-4 mb-3">
                    📄
                </div>

                <h4 className="fw-bold">
                    Easy Apply
                </h4>

                <p className="text-muted">
                    Upload your resume and apply with
                    one click.
                </p>

            </div>

        </div>

    </div>

    <div className="col-md-4">

        <div className="card border-0 shadow-lg rounded-4 h-100">

            <div className="card-body text-center p-5">

                <div className="display-4 mb-3">
                    🏢
                </div>

                <h4 className="fw-bold">
                    Top Recruiters
                </h4>

                <p className="text-muted">
                    Connect directly with recruiters and
                    leading organizations.
                </p>

            </div>

        </div>

    </div>

</div>
            {/* Footer */}

            <footer className="bg-dark text-white mt-5 rounded-4">

    <div className="container py-5 text-center">

        <h3 className="fw-bold">
            JobHive
        </h3>

        <p className="text-light">

            Connecting talent with opportunities.

        </p>

        <hr className="bg-light"/>

        <small>

            © 2026 JobHive. All rights reserved | Built with React + FastAPI

        </small>

    </div>

</footer>

        </div>

    );

}

export default HomePage;