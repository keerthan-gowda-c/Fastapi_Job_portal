
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
// import "./Sidebar.css";
import { useAuth } from "../../context/AuthContext";

const ROLE_LINKS = {
    jobseeker: [
        { to: "/jobseeker/dashboard", icon: "bi-grid-1x2", label: "Dashboard" },
        { to: "/saved-jobs", icon: "bi-bookmark-heart", label: "Saved Jobs" },
        { to: "/jobseeker/applications", icon: "bi-file-earmark-text", label: "My Applications" },
        { to: "/jobseeker/profile", icon: "bi-person-circle", label: "My Profile" },
    ],
    recruiter: [
        { to: "/recruiter-dashboard", icon: "bi-grid-1x2", label: "Dashboard" },
        { to: "/my-jobs", icon: "bi-briefcase", label: "My Jobs" },
        { to: "/recruiter/recruiter-application", icon: "bi-file-earmark-text", label: "Applications" },
    ],
};

function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(() => {
        try {
            return localStorage.getItem("jh-sidebar") === "collapsed";
        } catch {
            return false;
        }
    });

    const menuRef = useRef(null);
    const hasSidebar = Boolean(user);

    const links = ROLE_LINKS[user?.role] || [];
    const initial = (user?.full_name || "?").trim().charAt(0).toUpperCase();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const toggleCollapsed = () => {
        setCollapsed((prev) => {
            try {
                localStorage.setItem("jh-sidebar", prev ? "expanded" : "collapsed");
            } catch {
                // Storage unavailable
            }
            return !prev;
        });
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        document.body.classList.toggle("has-sidebar", hasSidebar);
        document.body.classList.toggle(
            "sidebar-collapsed",
            hasSidebar && collapsed
        );

        return () => {
            document.body.classList.remove("has-sidebar", "sidebar-collapsed");
        };
    }, [hasSidebar, collapsed]);

    const goToProfile = () => {
        navigate(user.role === "jobseeker" ? "/jobseeker/profile" : "/company/my-company")
    }

    return (
        <>
            <header className="jh-nav">
                <div className="jh-nav__inner">
                    <Link
                        className="jh-nav__brand"
                        to={user?.role === "recruiter" ? "/recruiter-dashboard" : user ? "/jobs" : "/"}
                    >
                        <span className="jh-nav__logo">💼</span>
                        <span>JobHive</span>
                    </Link>

                    <nav className="jh-nav__main" aria-label="Main navigation">
                        <NavLink
                            to="/jobs"
                            className={({ isActive }) =>
                                `jh-nav__link ${isActive ? "is-active" : ""}`
                            }
                        >
                            <i className="bi bi-briefcase"></i>
                            Jobs
                        </NavLink>

                        <NavLink
                            to="/companies/all"
                            className={({ isActive }) =>
                                `jh-nav__link ${isActive ? "is-active" : ""}`
                            }
                        >
                            <i className="bi bi-building"></i>
                            Companies
                        </NavLink>
                    </nav>

                    <div className="jh-nav__right">
                        {!user ? (
                            <div className="jh-dropdown" ref={menuRef}>
                                <button
                                    type="button"
                                    className="jh-btn jh-btn--accent"
                                    onClick={() => setMenuOpen((prev) => !prev)}
                                    aria-expanded={menuOpen}
                                >
                                    Get Started
                                    <i className="bi bi-chevron-down"></i>
                                </button>

                                {menuOpen && (
                                    <div className="jh-dropdown__menu">
                                        <Link
                                            to="/choose-login-role"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            to="/choose-role"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                type="button"
                                className="jh-nav__user"
                                onClick={goToProfile}
                                title={user.role === "jobseeker" ? "View profile" : "View company"}
                            >
                                <span className="jh-nav__user-avatar">{initial}</span>
                                <div className="jh-nav__user-info">
                                    <strong>{user.full_name}</strong>
                                    <small>
                                        {user.role === "jobseeker" ? "Job Seeker" : "Recruiter"}
                                    </small>
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {user && (
                <aside
                    className={`jh-side ${collapsed ? "is-collapsed" : ""}`}
                    aria-label="Dashboard navigation"
                >
                    <div className="jh-side__section">
                        <span className="jh-side__heading">WORKSPACE</span>

                        <nav className="jh-side__nav">
                            {links.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    title={collapsed ? link.label : undefined}
                                    className={({ isActive }) =>
                                        `jh-side__link ${isActive ? "is-active" : ""}`
                                    }
                                >
                                    <i className={`bi ${link.icon}`}></i>
                                    <span className="jh-side__label">{link.label}</span>
                                </NavLink>
                            ))}
                        </nav>
                    </div>

                    <div className="jh-side__footer">
                        <button
                            type="button"
                            className="jh-side__link jh-side__collapse"
                            onClick={toggleCollapsed}
                            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                        >
                            <i
                                className={`bi ${collapsed
                                        ? "bi-chevron-double-right"
                                        : "bi-chevron-double-left"
                                    }`}
                            ></i>
                            <span className="jh-side__label">
                                {collapsed ? "Expand" : "Collapse"}
                            </span>
                        </button>

                        <button
                            type="button"
                            className="jh-side__link jh-side__logout"
                            onClick={handleLogout}
                            title="Log out"
                        >
                            <i className="bi bi-box-arrow-right"></i>
                            <span className="jh-side__label">Log out</span>
                        </button>
                    </div>
                </aside>
            )}
        </>
    );
}

export default Navbar;
