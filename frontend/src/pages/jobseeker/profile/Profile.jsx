import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../api/axios";
import Navbar from "../../../components/layout/Navbar";
import "./Profile.css";

const formatDate = (value) => {
    if (!value) return "Present";
    return new Date(value).toLocaleDateString("en-IN", { month: "short", year: "numeric" });
};

const formatRange = (start, end) => {
    if (!start && !end) return "Date not specified";
    return `${formatDate(start)} - ${formatDate(end)}`;
};

const sortByRecentDate = (items, endField, startField) =>
    [...items].sort((a, b) => {
        const dateA = new Date(a[endField] || a[startField] || 0);
        const dateB = new Date(b[endField] || b[startField] || 0);
        return dateB - dateA;
    });

function Section({ icon, title, hint, children }) {
    return (
        <section className="pf-card">
            <div className="pf-card__head">
                <span className="pf-card__icon">
                    <i className={`bi ${icon}`} />
                </span>
                <div>
                    <h2>{title}</h2>
                    <p>{hint}</p>
                </div>
            </div>
            {children}
        </section>
    );
}

export default function Profile() {
    const [user, setUser] = useState(null);
    const [candidate, setCandidate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchProfile = useCallback(async () => {
        setLoading(true);
        setError(false);

        try {
            const [userResponse, candidateResponse] = await Promise.all([
                api.get("/users/me"),
                api.get("/candidates/me"),
            ]);
            setUser(userResponse.data);
            setCandidate(candidateResponse.data);
        } catch (err) {
            console.error("Profile loading error:", err.response?.data || err);
            setError(true);
            toast.error(err.response?.data?.detail || "Failed to load profile. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    if (loading) {
        return (
            <>
                <Navbar />
                <main className="pf">
                    <div className="pf-skel" style={{ height: 200 }} />
                    <div className="pf-layout">
                        <div className="pf-skel" style={{ height: 420 }} />
                        <div className="pf-skel" style={{ height: 320 }} />
                    </div>
                </main>
            </>
        );
    }

    if (error || !user || !candidate) {
        return (
            <>
                <Navbar />
                <main className="pf">
                    <div className="pf-card pf-empty">
                        <i className="bi bi-exclamation-circle" />
                        <h2>Couldn't load your profile</h2>
                        <p>Check your connection and try again.</p>
                        <button className="pf-btn pf-btn--violet" onClick={fetchProfile}>
                            <i className="bi bi-arrow-clockwise" /> Try again
                        </button>
                    </div>
                </main>
            </>
        );
    }

    const educations = sortByRecentDate(candidate.educations || [], "end_year", "start_year");
    const experiences = sortByRecentDate(candidate.experiences || [], "start_date", "start_date");
    const projects = sortByRecentDate(candidate.projects || [], "start_date", "start_date");
    const skills = (candidate.skills || "").split(",").map((s) => s.trim()).filter(Boolean);

    const checks = [
        { label: "Profile photo", done: Boolean(user.profile_image) },
        { label: "Phone number", done: Boolean(user.phone) },
        { label: "Location", done: Boolean(user.location) },
        { label: "Skills", done: skills.length > 0 },
        { label: "About", done: Boolean(candidate.bio?.trim()) },
        { label: "Resume", done: Boolean(candidate.resume_url) },
        { label: "Education", done: educations.length > 0 },
        { label: "Experience", done: experiences.length > 0 },
        { label: "Projects", done: projects.length > 0 },
    ];
    const score = Math.round((checks.filter((c) => c.done).length / checks.length) * 100);

    return (
        <>
            <Navbar />

            <main className="pf">
                {/* Hero */}
                <section className="pf-hero">
                    <div className="pf-hero__person">
                        <div className="pf-avatar">
                            {user.profile_image ? <img src={user.profile_image} alt="Profile" /> : <i className="bi bi-person" />}
                        </div>

                        <div>
                            <h1>{user.full_name}</h1>
                            <p className="pf-hero__email">{user.email}</p>
                            <div className="pf-chips">
                                <span className="pf-chip pf-chip--role">{user.role}</span>
                                <span className="pf-chip">
                                    <i className="bi bi-telephone" /> {user.phone || "Phone not added"}
                                </span>
                                <span className="pf-chip">
                                    <i className="bi bi-geo-alt" /> {user.location || "Location not added"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <Link to="/jobseeker/profile/edit" className="pf-btn pf-btn--solid">
                        <i className="bi bi-pencil-square" /> Edit profile
                    </Link>
                </section>

                <div className="pf-layout">
                    {/* Main column */}
                    <div className="pf-main">
                        <Section icon="bi-person-workspace" title="About" hint="Your professional introduction">
                            <p className="pf-text">{candidate.bio || "No professional introduction added yet."}</p>
                        </Section>

                        <Section icon="bi-briefcase" title="Experience" hint="Where you have worked">
                            {experiences.length === 0 ? (
                                <p className="pf-empty-text">No experience details added yet.</p>
                            ) : (
                                <div className="pf-tl">
                                    {experiences.map((e) => (
                                        <div className="pf-tl__item" key={e.id}>
                                            <h3>{e.job_title}</h3>
                                            <p className="pf-sub">{e.company_name}</p>
                                            <div className="pf-chips pf-chips--light">
                                                {e.employment_type && <span className="pf-chip">{e.employment_type}</span>}
                                                {e.location && <span className="pf-chip">{e.location}</span>}
                                                <span className="pf-chip">
                                                    <i className="bi bi-calendar3" />
                                                    {formatRange(e.start_date, e.is_current ? null : e.end_date)}
                                                </span>
                                            </div>
                                            {e.description && <p className="pf-text">{e.description}</p>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Section>

                        <Section icon="bi-mortarboard" title="Education" hint="Your academic qualifications">
                            {educations.length === 0 ? (
                                <p className="pf-empty-text">No education details added yet.</p>
                            ) : (
                                <div className="pf-tl">
                                    {educations.map((ed) => (
                                        <div className="pf-tl__item" key={ed.id}>
                                            <h3>
                                                {ed.degree}
                                                {ed.field_of_study ? ` - ${ed.field_of_study}` : ""}
                                            </h3>
                                            <p className="pf-sub">{ed.institution}</p>
                                            <div className="pf-chips pf-chips--light">
                                                <span className="pf-chip">
                                                    <i className="bi bi-calendar3" />
                                                    {formatRange(ed.start_year, ed.end_year)}
                                                </span>
                                                {ed.grade && <span className="pf-chip">Grade: {ed.grade}</span>}
                                            </div>
                                            {ed.description && <p className="pf-text">{ed.description}</p>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Section>

                        <Section icon="bi-code-slash" title="Projects" hint="Work you have built">
                            {projects.length === 0 ? (
                                <p className="pf-empty-text">No projects added yet.</p>
                            ) : (
                                <div className="pf-projects">
                                    {projects.map((p) => (
                                        <article className="pf-project" key={p.id}>
                                            <h3>{p.project_name}</h3>
                                            <span className="pf-date">
                                                <i className="bi bi-calendar3" /> {formatRange(p.start_date, p.end_date)}
                                            </span>
                                            {p.technologies && <p className="pf-tech">{p.technologies}</p>}
                                            {p.description && <p className="pf-text">{p.description}</p>}
                                            <div className="pf-links">
                                                {p.project_url && (
                                                    <a href={p.project_url} target="_blank" rel="noopener noreferrer">
                                                        <i className="bi bi-box-arrow-up-right" /> Live project
                                                    </a>
                                                )}
                                                {p.github_url && (
                                                    <a href={p.github_url} target="_blank" rel="noopener noreferrer">
                                                        <i className="bi bi-github" /> GitHub
                                                    </a>
                                                )}
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </Section>
                    </div>

                    {/* Side column */}
                    <aside className="pf-side">
                        <section className="pf-card">
                            <h2 className="pf-side__title">Profile strength</h2>
                            <div className="pf-strength">
                                <div className="pf-ring" style={{ "--p": score }}>
                                    <strong>{score}%</strong>
                                </div>
                                <p>
                                    {score === 100
                                        ? "Your profile is complete."
                                        : "Complete profiles get noticed more by recruiters."}
                                </p>
                            </div>
                            <ul className="pf-checks">
                                {checks.map((c) => (
                                    <li key={c.label} className={c.done ? "is-done" : ""}>
                                        <i className={`bi ${c.done ? "bi-check-circle-fill" : "bi-circle"}`} />
                                        {c.label}
                                    </li>
                                ))}
                            </ul>
                            {score < 100 && (
                                <Link to="/jobseeker/profile/edit" className="pf-btn pf-btn--violet pf-btn--block">
                                    Complete profile
                                </Link>
                            )}
                        </section>

                        <section className="pf-card">
                            <h2 className="pf-side__title">Skills</h2>
                            {skills.length > 0 ? (
                                <div className="pf-skills">
                                    {skills.map((s, i) => (
                                        <span key={i}>{s}</span>
                                    ))}
                                </div>
                            ) : (
                                <p className="pf-empty-text">No skills added yet.</p>
                            )}
                        </section>

                        <section className="pf-card">
                            <h2 className="pf-side__title">Resume</h2>
                            {candidate.resume_url ? (
                                <a href={candidate.resume_url} target="_blank" rel="noopener noreferrer" className="pf-resume">
                                    <i className="bi bi-file-earmark-pdf" />
                                    <span>View resume</span>
                                    <i className="bi bi-box-arrow-up-right" />
                                </a>
                            ) : (
                                <p className="pf-empty-text">No resume uploaded yet.</p>
                            )}
                        </section>
                    </aside>
                </div>
            </main>
        </>
    );
}