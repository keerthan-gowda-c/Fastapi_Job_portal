import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../../../components/layout/Navbar";
import DonutChart from "../../../components/layout/DonutChat";
import api from "../../../api/axios";
import "./JobseekerDashboard.css";

const pct = (n, d) => (d > 0 ? Math.round((n / d) * 100) : 0);

const ACTIONS = [
    { icon: "bi-person-circle", title: "My profile", text: "Keep your profile and resume up to date.", cta: "Open profile", to: "/jobseeker/profile" },
    { icon: "bi-briefcase-fill", title: "Browse jobs", text: "Find roles that match your skills.", cta: "Find jobs", to: "/jobs" },
    { icon: "bi-file-earmark-text", title: "Applications", text: "Track every application and its status.", cta: "View applications", to: "/jobseeker/applications" },
    { icon: "bi-bookmark-heart-fill", title: "Saved jobs", text: "Come back to jobs you saved for later.", cta: "View saved", to: "/saved-jobs" },
];

export default function JobseekerDashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchApplications = async () => {
        try {
            const response = await api.get("/applications/me");
            setApplications(response.data);
        } catch (error) {
            console.error("Failed to load application statistics:", error);
            toast.warning("Unable to load application statistics");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const count = (status) => applications.filter((a) => a.status === status).length;

    const total = applications.length;
    const pending = count("pending");
    const shortlisted = count("shortlisted");
    const hired = count("hired");
    const rejected = count("rejected");

    const stats = [
        { label: "Total applications", value: total, icon: "bi-file-earmark-text", tone: "primary" },
        { label: "Pending", value: pending, icon: "bi-hourglass-split", tone: "warning" },
        { label: "Shortlisted", value: shortlisted, icon: "bi-star-fill", tone: "accent" },
        { label: "Hired", value: hired, icon: "bi-check-circle-fill", tone: "success" },
    ];

    const meters = [
        { label: "Response rate", hint: "Applications with a decision", value: pct(total - pending, total) },
        { label: "Shortlist rate", hint: "Shortlisted or hired", value: pct(shortlisted + hired, total) },
        { label: "Hire rate", hint: "Applications that became offers", value: pct(hired, total) },
    ];

    const firstName = user?.full_name?.split(" ")[0];

    return (
        <div className="js-dashboard">
            <Navbar />

            <main className="js-dashboard__main">
                {/* Welcome + snapshot */}
                <section className="js-welcome">
                    <div className="js-welcome__content">
                        <h1 className="js-welcome__title">Welcome back{firstName ? `, ${firstName}` : ""}</h1>
                        <p className="js-welcome__text">
                            {total > 0
                                ? `You've applied to ${total} job${total === 1 ? "" : "s"}. Here's how they're going.`
                                : "Apply to your first job and your progress will show up here."}
                        </p>
                        <div className="js-welcome__actions">
                            <button className="js-btn js-btn--solid" onClick={() => navigate("/jobs")}>
                                <i className="bi bi-search"></i> Find jobs
                            </button>
                            <button className="js-btn js-btn--ghost" onClick={() => navigate("/jobseeker/profile")}>
                                Update profile
                            </button>
                        </div>
                    </div>

                    <div className="js-welcome__chart">
                        <DonutChart
                            size={150}
                            centerValue={loading ? "–" : total}
                            centerLabel="applied"
                            segments={[
                                { label: "Pending", value: pending, color: "#F2A93B" },
                                { label: "Shortlisted", value: shortlisted, color: "#8C8CF0" },
                                { label: "Hired", value: hired, color: "#2DD4BF" },
                                { label: "Rejected", value: rejected, color: "#F0794F" },
                            ]}
                        />
                    </div>
                </section>

                {/* Stats */}
                <section className="js-stats">
                    {stats.map((s) => (
                        <div key={s.label} className="js-stat">
                            <div className={`js-stat__icon js-stat__icon--${s.tone}`}>
                                <i className={`bi ${s.icon}`}></i>
                            </div>
                            <div className="js-stat__content">
                                <span className="js-stat__label">{s.label}</span>
                                <strong className="js-stat__number">
                                    {loading ? <span className="js-spinner"></span> : s.value}
                                </strong>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Performance */}
                <section className="js-panel">
                    <h2 className="js-panel__title">Your application performance</h2>
                    <p className="js-panel__sub">
                        {total > 0 ? "How employers are responding to you." : "Rates appear after your first application."}
                    </p>
                    <div className="js-meters">
                        {meters.map((m) => (
                            <div key={m.label} className="js-meter">
                                <div className="js-meter__head">
                                    <span>{m.label}</span>
                                    <strong>{loading ? "–" : `${m.value}%`}</strong>
                                </div>
                                <div className="js-meter__bar">
                                    <i style={{ width: `${loading ? 0 : m.value}%` }} />
                                </div>
                                <small>{m.hint}</small>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Quick actions */}
                <section className="js-actions">
                    <h2 className="js-panel__title">Quick actions</h2>
                    <div className="js-action-grid">
                        {ACTIONS.map((a) => (
                            <button key={a.title} className="js-action-card" onClick={() => navigate(a.to)}>
                                <span className="js-action-card__icon">
                                    <i className={`bi ${a.icon}`}></i>
                                </span>
                                <h3>{a.title}</h3>
                                <p>{a.text}</p>
                                <span className="js-action-card__cta">
                                    {a.cta} <i className="bi bi-arrow-right"></i>
                                </span>
                            </button>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}