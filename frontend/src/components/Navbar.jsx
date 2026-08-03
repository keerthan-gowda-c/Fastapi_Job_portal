import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

    };

    return (
 <nav className="navbar bg-dark fixed-top" data-bs-theme="dark">
    <div className="container ">

        <Link className="navbar-brand fw-bold align-items-center" to="/">
            💼 <span className="ms-2">JobHive</span>
        </Link>

        <div className="d-flex align-items-center ms-auto">

            <Link
                className="nav-link text-light me-4 nav-hover"
                to="/companies/all"
            >
                Companies
            </Link>

            {!user ? (
                <>
                    <Link
                        className="nav-link text-light me-3 nav-hover"
                        to="/login"
                    >
                        Login
                    </Link>

                    <Link
                        className="btn btn-primary rounded-pill px-4 fw-semibold"
                        to="/register"
                    >
                        Get Started
                    </Link>
                </>
            ) : (
                <>
                    <div className="d-flex align-items-center me-3">
{/* 
                        <div className="avatar-circle">
                            {user.full_name.charAt(0).toUpperCase()}
                        </div> */}

                        <span className="text-light user-name fw-semibold ms-2 d-none d-md-inline">
                            {user.full_name}
                        </span>

                    </div>

                    <button
                        className="menu-btn"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#menuOffcanvas"
                    >
                        <i className="bi bi-menu-button-fill fs-5"></i>
                    </button>
                </>
            )}

        </div>
            <div className="offcanvas offcanvas-end" style={{ "--bs-offcanvas-width": "300px" }} tabIndex="-1" id="menuOffcanvas" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title p-0" id="offcanvasNavbarLabel">💼 JobHive</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <hr />
                    <div className="offcanvas-body d-flex flex-column">

                        <div>
                            {user?.role === "jobseeker" && (
                                <ul className="navbar-nav w-100">

                                    <li className="nav-item">
                                        <Link className="nav-link py-0" to="/jobs">Jobs</Link>
                                    </li>
                                    <hr />
                                    <li className="nav-item">
                                        <Link className="nav-link py-0" to="/saved-jobs">Saved Jobs</Link>
                                    </li>
                                    <hr />

                                    <li className="nav-item">
                                        <Link className="nav-link py-0" to="/jobseeker/applications">
                                            Applications
                                        </Link>
                                    </li>
                                    <hr />

                                    <li className="nav-item">
                                        <Link className="nav-link py-0" to="/jobseeker/dashboard">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <hr />

                                    <li className="nav-item">
                                        <Link className="nav-link py-0" to="/jobseeker/profile">
                                            My Profile
                                        </Link>
                                    </li>
                                    <hr />

                                </ul>
                            )}

                            {user?.role === "recruiter" && (
                                <ul className="navbar-nav">

                                    <li className="nav-item">
                                        <Link className="nav-link py-0" to="/recruiter-dashboard">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <hr />

                                    <li className="nav-item">
                                        <Link className="nav-link py-0" to="/my-jobs">
                                            My Jobs
                                        </Link>
                                    </li>
                                    <hr />

                                    <li className="nav-item">
                                        <Link className="nav-link py-0" to="/recruiter/recruiter-application">
                                            Applications
                                        </Link>
                                    </li>
                                    <hr />

                                </ul>
                            )}

                        </div>
                        <div className="mt-auto">
                            <hr />

                            <button
                                className="btn btn-danger w-100"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </nav>

    );



}

export default Navbar;