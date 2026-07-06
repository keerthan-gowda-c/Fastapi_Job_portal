import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow sticky-top">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold fs-3"
                    to="/"
                >
                    💼 Job Portal
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav ms-auto align-items-center">

                        {/* Jobseeker */}

                        {user?.role === "jobseeker" && (

                            <>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/jobs"
                                    >
                                        Jobs
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/saved-jobs"
                                    >
                                        Saved Jobs
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/jobseeker/applications"
                                    >
                                        Applications
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/jobseeker/dashboard"
                                    >
                                        Dashboard
                                    </Link>

                                </li>

                                <li className="nav-item ms-2">

                                    <Link
                                        className="btn btn-primary rounded-pill px-3"
                                        to="/jobseeker/profile"
                                    >
                                        My Profile
                                    </Link>

                                </li>

                            </>

                        )}

                        {/* Recruiter */}

                        {user?.role === "recruiter" && (

                            <>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/recruiter-dashboard"
                                    >
                                        Dashboard
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/my-jobs"
                                    >
                                        My Jobs
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/recruiter/recruiter-application"
                                    >
                                        Applications
                                    </Link>

                                </li>

                            </>

                        )}

                        {/* User */}

                        {user && (

                            <li className="nav-item ms-4">

                                <span className="text-light fw-semibold">

                                    👋 {user.full_name}

                                </span>

                            </li>

                        )}

                        {/* Logout */}

                        {user && (

                            <li className="nav-item ms-3">

                                <button
                                    className="btn btn-danger rounded-pill px-4"
                                    onClick={logout}
                                >
                                    Logout
                                </button>

                            </li>

                        )}

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;