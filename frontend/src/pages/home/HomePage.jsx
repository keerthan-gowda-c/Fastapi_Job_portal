
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="jh-page">

            {/* Hero */}
            <section className="jh-hero">

                <div className="jh-hero__content">

                    <span className="jh-badge">
                        🚀 #1 Job Portal
                    </span>

                    <h1 className="jh-heading">
                        Find Your{" "}
                        <span className="jh-heading__accent">
                            Dream Job
                        </span>
                    </h1>

                    <p className="jh-lead">
                        Connect with top companies, discover meaningful
                        opportunities, and take the next step in your career
                        with confidence.
                    </p>

                    <div className="jh-cta-row">

                        <button
                            className="jh-btn jh-btn--primary"
                            onClick={() => navigate("/jobs")}
                        >
                            Browse Jobs
                        </button>

                        <button
                            className="jh-btn jh-btn--ghost"
                            onClick={() => navigate("/choose-login-role")}
                        >
                            Login
                        </button>

                        <button
                            className="jh-btn jh-btn--accent"
                            onClick={() => navigate("/choose-role")}
                        >
                            Register
                        </button>

                    </div>

                </div>


                <div className="jh-hero__media">

                    <div className="jh-hero__hex">

                        <img
                            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800"
                            alt="Professionals connecting for career opportunities"
                        />

                    </div>

                </div>

            </section>


            {/* Statistics */}
            <section className="jh-stats">

                <div className="jh-stat">

                    <span className="jh-stat__number">
                        500+
                    </span>

                    <span className="jh-stat__label">
                        Jobs
                    </span>

                </div>


                <div className="jh-stat">

                    <span className="jh-stat__number">
                        120+
                    </span>

                    <span className="jh-stat__label">
                        Companies
                    </span>

                </div>


                <div className="jh-stat">

                    <span className="jh-stat__number">
                        5K+
                    </span>

                    <span className="jh-stat__label">
                        Job Seekers
                    </span>

                </div>


                <div className="jh-stat">

                    <span className="jh-stat__number">
                        95%
                    </span>

                    <span className="jh-stat__label">
                        Success Rate
                    </span>

                </div>

            </section>


            {/* How It Works */}
            <section className="jh-steps">

                <div className="jh-steps__header">

                    <span className="jh-section-label">
                        HOW IT WORKS
                    </span>

                    <h2 className="jh-heading jh-heading--sm">
                        Everything you need to find your next opportunity.
                    </h2>

                </div>


                <div className="jh-steps__list">

                    <article className="jh-step">

                        <span className="jh-step__num">
                            01
                        </span>

                        <h3 className="jh-step__title">
                            Discover
                        </h3>

                        <p className="jh-step__copy">
                            Explore verified job opportunities from companies
                            looking for talented professionals like you.
                        </p>

                    </article>


                    <article className="jh-step">

                        <span className="jh-step__num">
                            02
                        </span>

                        <h3 className="jh-step__title">
                            Apply
                        </h3>

                        <p className="jh-step__copy">
                            Find the right role, review the requirements,
                            and submit your application with ease.
                        </p>

                    </article>


                    <article className="jh-step">

                        <span className="jh-step__num">
                            03
                        </span>

                        <h3 className="jh-step__title">
                            Connect
                        </h3>

                        <p className="jh-step__copy">
                            Get discovered by recruiters and move closer
                            to the opportunity you have been looking for.
                        </p>

                    </article>

                </div>

            </section>


            {/* Footer */}
            <footer className="jh-footer">

                <div className="jh-footer__inner">

                    <h3 className="jh-footer__brand">
                        JobHive
                    </h3>

                    <p className="jh-footer__tag">
                        Connecting talent with opportunities.
                    </p>

                    <hr className="jh-footer__rule" />

                    <small className="jh-footer__fine">
                        © 2026 JobHive. All rights reserved · Built with
                        React + FastAPI
                    </small>

                </div>

            </footer>

        </div>
    );
}
