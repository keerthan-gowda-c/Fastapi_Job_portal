import { useNavigate } from "react-router-dom";
import "./ChooseRole.css";

function ChooseRole() {

const navigate = useNavigate();

return (

    <main className="role-page">

        <section className="role-container">

            {/* Header */}

            <div className="role-header">

                <span className="role-label">
                    JOIN JOBHIVE
                </span>

                <h1>
                    Choose your path.
                </h1>

                <p>
                    Create your account and start your journey
                    towards the right opportunity.
                </p>

            </div>


            {/* Role Cards */}

            <div className="role-grid">

                {/* Job Seeker */}

                <article className="role-card role-card--jobseeker">

                    <div className="role-icon">
                        ◉
                    </div>

                    <span className="role-number">
                        01
                    </span>

                    <h2>
                        Job Seeker
                    </h2>

                    <p>
                        Search for meaningful opportunities, upload
                        your resume, apply to companies, and keep track
                        of your applications in one place.
                    </p>

                    <button
                        className="role-button role-button--primary"
                        onClick={() =>
                            navigate("/register/jobseeker")
                        }
                    >
                        Register as Job Seeker
                        <span>→</span>
                    </button>

                </article>


                {/* Recruiter */}

                <article className="role-card role-card--recruiter">

                    <div className="role-icon role-icon--dark">
                        ▣
                    </div>

                    <span className="role-number">
                        02
                    </span>

                    <h2>
                        Recruiter
                    </h2>

                    <p>
                        Post opportunities, manage applicants,
                        discover qualified candidates, and build
                        your team with confidence.
                    </p>

                    <button
                        className="role-button role-button--dark"
                        onClick={() =>
                            navigate("/register/recruiter")
                        }
                    >
                        Register as Recruiter
                        <span>→</span>
                    </button>

                </article>

            </div>


            {/* Back */}

            <div className="role-back">

                <button
                    type="button"
                    onClick={() => navigate("/")}
                >
                    ← Back to Home
                </button>

            </div>

        </section>

    </main>

);

}

export default ChooseRole;
