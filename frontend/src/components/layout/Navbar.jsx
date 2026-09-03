import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const menuRef = useRef(null);

    const handleLogout = () => {
        logout();
        setDrawerOpen(false);
        navigate("/");
    };

    // close the "Get Started" dropdown on outside click
    useEffect(() => {
        function onClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    }, []);

    // lock body scroll while the mobile drawer is open
    useEffect(() => {
        document.body.style.overflow = drawerOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [drawerOpen]);

    return (
        <nav className="jh-nav">
            <div className="jh-nav__inner">
                <Link className="jh-nav__brand" to={user ? "/jobs" : "/"}>
                    💼 <span>JobHive</span>
                </Link>

                <div className="jh-nav__right">
                    <Link className="jh-nav__link jh-nav__link--desktop" to="/companies/all">
                        Companies
                    </Link>

                    {!user ? (
                        <div className="jh-dropdown" ref={menuRef}>
                            <button
                                type="button"
                                className="jh-btn jh-btn--accent jh-btn--sm"
                                onClick={() => setMenuOpen((v) => !v)}
                                aria-expanded={menuOpen}
                            >
                                Get started
                                <span className={`jh-dropdown__caret ${menuOpen ? "is-open" : ""}`}>▾</span>
                            </button>

                            {menuOpen && (
                                <ul className="jh-dropdown__menu">
                                    <li>
                                        <Link
                                            className="jh-dropdown__item"
                                            to="/choose-login-role"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Log in
                                        </Link>
                                    </li>
                                    <li className="jh-dropdown__divider" />
                                    <li>
                                        <Link
                                            className="jh-dropdown__item"
                                            to="/choose-role"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Register
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </div>
                    ) : (
                        <>
                            {user.role === "jobseeker" && (
                                <Link className="jh-nav__link jh-nav__link--desktop" to="/jobs">
                                    Jobs
                                </Link>
                            )}

                            <span className="jh-nav__name">{user.full_name}</span>

                            <button
                                type="button"
                                className="jh-nav__menu-btn"
                                onClick={() => setDrawerOpen(true)}
                                aria-label="Open menu"
                            >
                                ☰
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile / account drawer */}
            {drawerOpen && (
                <div className="jh-drawer-overlay" onClick={() => setDrawerOpen(false)}>
                    <aside
                        className="jh-drawer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Menu"
                    >
                        <div className="jh-drawer__header">
                            <h5 className="jh-drawer__title">💼 JobHive</h5>
                            <button
                                type="button"
                                className="jh-drawer__close"
                                onClick={() => setDrawerOpen(false)}
                                aria-label="Close menu"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="jh-drawer__body">
                            {user?.role === "jobseeker" && (
                                <ul className="jh-drawer__list">
                                    <li><Link to="/jobs" onClick={() => setDrawerOpen(false)}>Jobs</Link></li>
                                    <li><Link to="/saved-jobs" onClick={() => setDrawerOpen(false)}>Saved jobs</Link></li>
                                    <li><Link to="/jobseeker/applications" onClick={() => setDrawerOpen(false)}>Applications</Link></li>
                                    <li><Link to="/jobseeker/dashboard" onClick={() => setDrawerOpen(false)}>Dashboard</Link></li>
                                    <li><Link to="/jobseeker/profile" onClick={() => setDrawerOpen(false)}>My profile</Link></li>
                                </ul>
                            )}

                            {user?.role === "recruiter" && (
                                <ul className="jh-drawer__list">
                                    <li><Link to="/recruiter-dashboard" onClick={() => setDrawerOpen(false)}>Dashboard</Link></li>
                                    <li><Link to="/my-jobs" onClick={() => setDrawerOpen(false)}>My jobs</Link></li>
                                    <li><Link to="/recruiter/recruiter-application" onClick={() => setDrawerOpen(false)}>Applications</Link></li>
                                </ul>
                            )}

                            <div className="jh-drawer__footer">
                                <button
                                    type="button"
                                    className="jh-btn jh-btn--danger jh-btn--block"
                                    onClick={handleLogout}
                                >
                                    Log out
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            )}
        </nav>
    );
}

export default Navbar;