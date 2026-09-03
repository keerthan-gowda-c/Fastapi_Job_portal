import { useNavigate } from "react-router-dom";
import "./ChooseLoginRole.css";

function ChooseLoginRole() {
    const navigate = useNavigate();

    return (
        <div className="jh-role-page">
            <div className="jh-role-page__inner">
                <div className="jh-role-page__head">
                    <h1 className="jh-heading">Welcome back</h1>
                    <p className="jh-lead">Choose how you'd like to log in</p>
                </div>

                <div className="jh-role-grid">
                    {/* Job Seeker */}
                    <div className="jh-role-card">
                        <div className="jh-role-card__icon jh-role-card__icon--accent">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.6" />
                                <path
                                    d="M5 20c0-3.6 3.13-6 7-6s7 2.4 7 6"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        <h3 className="jh-role-card__title">Job seeker</h3>

                        <p className="jh-role-card__copy">
                            Search jobs, upload your résumé, apply instantly,
                            and track your applications.
                        </p>

                        <button
                            className="jh-btn jh-btn--accent jh-btn--lg"
                            onClick={() => navigate("/login/jobseeker")}
                        >
                            Continue
                        </button>
                    </div>

                    {/* Recruiter */}
                    <div className="jh-role-card">
                        <div className="jh-role-card__icon jh-role-card__icon--ink">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="4" y="9" width="9" height="11" rx="1" stroke="currentColor" strokeWidth="1.6" />
                                <rect x="13" y="4" width="7" height="16" rx="1" stroke="currentColor" strokeWidth="1.6" />
                                <path d="M7 13h3M7 16h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                        </div>

                        <h3 className="jh-role-card__title">Recruiter</h3>

                        <p className="jh-role-card__copy">
                            Post jobs, manage applications, review résumés,
                            and hire the best candidates.
                        </p>

                        <button
                            className="jh-btn jh-btn--primary jh-btn--lg"
                            onClick={() => navigate("/login/recruiter")}
                        >
                            Continue
                        </button>
                    </div>
                </div>

                <div className="jh-role-page__back">
                    <button className="jh-btn jh-btn--ghost" onClick={() => navigate("/")}>
                        ← Back to home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChooseLoginRole;