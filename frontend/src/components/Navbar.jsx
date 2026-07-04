import { use } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"))

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/")

    }
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link
                    className="navbar-brand"
                    to="/"
                >
                    Job Portal
                </Link>

                <div className="navbar-nav ms-auto">

                    {user?.role === "jobseeker" && (
                        <>
                            <Link
                                className="nav-link"
                                to="/jobs"
                            >
                                Jobs
                            </Link>

                            <Link
                                to="/jobseeker/profile"
                                className="btn btn-primary"
                            >
                                My Profile
                            </Link>

                            <Link
                                className="nav-link"
                                to="/saved-jobs"
                            >
                                Saved Jobs
                            </Link>

                            <Link
                                className="nav-link"
                                to="/jobseeker/applications"
                            >
                                Applications
                            </Link>
                            <Link
                                className="nav-link"
                                to="/jobseeker/dashboard"
                            >
                                Dashboard
                            </Link>
                        </>
                    )}

                    {user?.role === "recruiter" && (
                        <>
                            <Link
                                className="nav-link"
                                to="/recruiter-dashboard"
                            >
                                Dashboard
                            </Link>



                            <Link
                                className="nav-link"
                                to="/my-jobs"
                            >
                                My Jobs
                            </Link>
                        </>
                    )}

                    <button
                        className="btn btn-danger ms-3"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );
}

export default Navbar;