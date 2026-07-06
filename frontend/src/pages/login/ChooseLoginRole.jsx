import { useNavigate } from "react-router-dom";

function ChooseLoginRole() {

    const navigate = useNavigate();

    return (

        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-lg-10">

                    <div className="text-center mb-5">

                        <h1 className="display-4 fw-bold">
                            Welcome Back
                        </h1>

                        <p className="lead text-muted">
                            Choose how you would like to login
                        </p>

                    </div>

                    <div className="row g-4">

                        {/* Job Seeker */}

                        <div className="col-md-6">

                            <div className="card border-0 shadow-lg rounded-4 h-100">

                                <div className="card-body text-center p-5">

                                    <div
                                        className="rounded-circle bg-primary bg-opacity-10 d-inline-flex justify-content-center align-items-center mb-4"
                                        style={{
                                            width: "90px",
                                            height: "90px"
                                        }}
                                    >

                                        <i className="bi bi-person-workspace text-primary fs-1"></i>

                                    </div>

                                    <h3 className="fw-bold">
                                        Job Seeker
                                    </h3>

                                    <p className="text-muted mt-3">

                                        Search jobs, upload your resume,
                                        apply instantly, and track your
                                        applications.

                                    </p>

                                    <button
                                        className="btn btn-primary btn-lg rounded-pill px-5 mt-3"
                                        onClick={() =>
                                            navigate("/login/jobseeker")
                                        }
                                    >
                                        Continue
                                    </button>

                                </div>

                            </div>

                        </div>

                        {/* Recruiter */}

                        <div className="col-md-6">

                            <div className="card border-0 shadow-lg rounded-4 h-100">

                                <div className="card-body text-center p-5">

                                    <div
                                        className="rounded-circle bg-dark bg-opacity-10 d-inline-flex justify-content-center align-items-center mb-4"
                                        style={{
                                            width: "90px",
                                            height: "90px"
                                        }}
                                    >

                                        <i className="bi bi-building text-dark fs-1"></i>

                                    </div>

                                    <h3 className="fw-bold">
                                        Recruiter
                                    </h3>

                                    <p className="text-muted mt-3">

                                        Post jobs, manage applications,
                                        review resumes, and hire the
                                        best candidates.

                                    </p>

                                    <button
                                        className="btn btn-dark btn-lg rounded-pill px-5 mt-3"
                                        onClick={() =>
                                            navigate("/login/recruiter")
                                        }
                                    >
                                        Continue
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="text-center mt-5">

                        <button
                            className="btn btn-outline-secondary rounded-pill px-4"
                            onClick={() => navigate("/")}
                        >
                            ← Back to Home
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ChooseLoginRole;