import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../../components/layout/Navbar";
import DonutChart from "../../components/layout/DonutChat";
import useRecruiterDashboardStore from "../../store/recruiterDashboard";
import "./RecruiterDashboard.css";

const pct = (n, d) => (d > 0 ? Math.round((n / d) * 100) : 0);

function RecruiterDashboard() {
    const navigate = useNavigate();

    const stats = useRecruiterDashboardStore((state) => state.stats);
    const loading = useRecruiterDashboardStore((state) => state.loading);
    const fetchDashboard = useRecruiterDashboardStore((state) => state.fetchDashboard);

    const load = (force) =>
        fetchDashboard(force).catch((error) => {
            console.error(error);
            toast.info(error.response?.data?.detail || "It takes some time");
        });

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchDashboard]);

    if (loading) {
        return (
            <div className="rd">
                <Navbar />
                <main className="rd__main">
                    <div className="rd-skel" style={{ height: 150 }} />
                    <div className="rd-kpis">
                        {[0, 1, 2, 3].map((i) => (
                            <div key={i} className="rd-skel" style={{ height: 130 }} />
                        ))}
                    </div>
                    <div className="rd-skel" style={{ height: 320 }} />
                </main>
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="rd">
                <Navbar />
                <main className="rd__main">
                    <div className="rd-panel rd-empty">
                        <i className="bi bi-exclamation-circle"></i>
                        <h2 className="rd-title">Couldn't load your dashboard</h2>
                        <p className="rd-sub">Check your connection and try again.</p>
                        <button className="rd-btn rd-btn--violet" onClick={() => load(true)}>
                            Try again
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    const companies = stats.companies ?? 0;
    const jobs = stats.jobs ?? 0;
    const applications = stats.applications ?? 0;
    const hireRate = stats.hire_rate ?? 0;
    const pending = stats.pending ?? 0;
    const shortlisted = stats.shortlisted ?? 0;
    const hired = stats.hired ?? 0;
    const rejected = stats.rejected ?? 0;
    const perJob = jobs > 0 ? (applications / jobs).toFixed(1) : "0";

    const funnel = [
        { label: "Applied", value: applications, color: "var(--ink-2)" },
        { label: "Shortlisted", value: shortlisted, color: "var(--violet)" },
        { label: "Hired", value: hired, color: "var(--teal)" },
    ];

    const statusSegments = [
        { label: "Pending", value: pending, color: "#F2A93B" },
        { label: "Shortlisted", value: shortlisted, color: "#5B5BD6" },
        { label: "Hired", value: hired, color: "#0E9F8E" },
        { label: "Rejected", value: rejected, color: "#E4572E" },
    ];

    return (
        <div className="rd">
            <Navbar />

            <main className="rd__main">
                {/* Header */}
                <section className="rd-hero">
                    <div>
                        <h1>Hiring overview</h1>
                        <p>See how your jobs are performing and where candidates need your attention.</p>
                    </div>

                    <div className="rd-actions">
                        {companies > 0 ? (
                            <button className="rd-btn rd-btn--ghost" onClick={() => navigate("/company/my-company")}>
                                <i className="bi bi-building"></i> View company
                            </button>
                        ) : (
                            <button className="rd-btn rd-btn--ghost" onClick={() => navigate("/company/create")}>
                                <i className="bi bi-plus-lg"></i> Create company
                            </button>
                        )}
                        <button className="rd-btn rd-btn--ghost" onClick={() => navigate("/my-jobs")}>
                            <i className="bi bi-briefcase"></i> Manage jobs
                        </button>
                        <button className="rd-btn rd-btn--solid" onClick={() => navigate("/job/create")}>
                            <i className="bi bi-plus-lg"></i> Post a job
                        </button>
                    </div>
                </section>

                {/* KPIs */}
                <section className="rd-kpis">
                    <Kpi
                        label="Companies"
                        value={companies}
                        note={companies > 0 ? "Profile is live" : "Create one to start hiring"}
                        icon="bi-building"
                        tone="var(--violet)"
                        onClick={() => navigate("/company/my-company")}
                    />
                    <Kpi
                        label="Active jobs"
                        value={jobs}
                        note="Open positions"
                        icon="bi-briefcase"
                        tone="var(--teal)"
                        onClick={() => navigate("/my-jobs")}
                    />
                    <Kpi
                        label="Applications"
                        value={applications}
                        note={`${perJob} per job on average`}
                        icon="bi-file-earmark-text"
                        tone="var(--saffron)"
                        onClick={() => navigate("/recruiter/recruiter-application")}
                    />
                    <Kpi
                        label="Hire rate"
                        value={`${hireRate}%`}
                        note={`${hired} hired so far`}
                        icon="bi-graph-up-arrow"
                        tone="var(--coral)"
                        progress={hireRate}
                    />
                </section>

                {/* Analytics */}
                <section className="rd-grid">
                    <div className="rd-panel">
                        <h2 className="rd-title">Hiring funnel</h2>
                        <p className="rd-sub">How applicants move from applying to getting hired.</p>

                        <div className="rd-funnel">
                            {funnel.map((step, i) => {
                                const share = pct(step.value, applications);
                                return (
                                    <div key={step.label}>
                                        <div className="rd-step__head">
                                            <span>{step.label}</span>
                                            <span>
                                                {step.value}
                                                {i > 0 && ` · ${share}% of applicants`}
                                            </span>
                                        </div>
                                        <div className="rd-step__bar">
                                            <div
                                                className="rd-step__fill"
                                                style={{
                                                    width: `${step.value > 0 ? Math.max(share, 3) : 0}%`,
                                                    background: step.color,
                                                    animationDelay: `${i * 0.12}s`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="rd-panel">
                        <h2 className="rd-title">Application status</h2>
                        <p className="rd-sub">Where every application stands right now.</p>
                        <div style={{ marginTop: 22 }}>
                            <DonutChart
                                segments={statusSegments}
                                centerValue={pending + shortlisted + hired + rejected}
                                centerLabel="applications"
                                size={160}
                            />
                        </div>
                    </div>
                </section>

                {/* Next step */}
                <section className="rd-callout">
                    <div className="rd-callout__text">
                        <h2 className="rd-title">
                            {pending > 0
                                ? `${pending} application${pending === 1 ? " is" : "s are"} waiting for review`
                                : "You're caught up on reviews"}
                        </h2>
                        <p className="rd-sub">Review candidates and update their status.</p>
                    </div>
                    <button
                        className="rd-btn rd-btn--violet"
                        onClick={() => navigate("/recruiter/recruiter-application")}
                    >
                        Review applications
                    </button>
                </section>
            </main>
        </div>
    );
}

function Kpi({ label, value, note, icon, tone, onClick, progress }) {
    const Tag = onClick ? "button" : "div";
    return (
        <Tag className="rd-kpi" style={{ "--tone": tone }} onClick={onClick} type={onClick ? "button" : undefined}>
            <span className="rd-kpi__top">
                <span className="rd-kpi__label">{label}</span>
                <span className="rd-kpi__icon">
                    <i className={`bi ${icon}`}></i>
                </span>
            </span>
            <span className="rd-kpi__value">{value}</span>
            {progress !== undefined ? (
                <span className="rd-meter">
                    <i style={{ width: `${Math.min(progress, 100)}%` }} />
                </span>
            ) : null}
            <span className="rd-kpi__note">{note}</span>
        </Tag>
    );
}

export default RecruiterDashboard;