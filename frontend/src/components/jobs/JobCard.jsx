import { useNavigate } from "react-router-dom";
import "./JobCard.css";

function JobCard({
    job,
    isAuthenticated,
    role,
    onApply,
    onSave,
    isApplied,
    isSaved
}) {

    const navigate = useNavigate();

    return (
        <div className="jh-card">
            <div className="jh-card__body">
                <div className="jh-card__head">
                    <h3 className="jh-card__title">{job.title}</h3>
                    <span className="jh-tag">New</span>
                </div>

                <p className="jh-card__desc">{job.description}</p>

                <hr className="jh-card__rule" />

                <div className="jh-card__meta">
                    <div className="jh-card__meta-col">
                        <p className="jh-card__meta-label">📍 Location</p>
                        <p className="jh-card__meta-value">{job.location}</p>
                    </div>

                    <div className="jh-card__meta-col">
                        <p className="jh-card__meta-label">💰 Salary</p>
                        <p className="jh-card__meta-value jh-card__meta-value--accent">
                            ₹{job.salary}
                        </p>
                    </div>
                </div>
            </div>

            <div className="jh-card__footer">
                {!isAuthenticated ? (
                    <button
                        className="jh-btn jh-btn--primary jh-btn--block"
                        onClick={() => navigate("/choose-login-role")}
                    >
                        Log in to apply
                    </button>
                ) : role === "jobseeker" ? (
                    <div className="jh-card__actions">
                        <button
                            className={`jh-btn jh-btn--sm jh-btn--flex ${
                                isApplied ? "jh-btn--success" : "jh-btn--primary"
                            }`}
                            onClick={() => !isApplied && onApply(job.id)}
                            disabled={isApplied}
                        >
                            {isApplied ? "Applied" : "Apply"}
                        </button>

                        <button
                            className="jh-btn jh-btn--sm jh-btn--flex jh-btn--ghost"
                            onClick={() => navigate(`/jobs/details/${job.id}`)}
                        >
                            View details
                        </button>

                        <button
                            className={`jh-btn jh-btn--sm jh-btn--flex ${
                                isSaved ? "jh-btn--success" : "jh-btn--muted"
                            }`}
                            onClick={() => !isSaved && onSave(job.id)}
                            disabled={isSaved}
                        >
                            {isSaved ? "Saved" : "Save"}
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default JobCard;