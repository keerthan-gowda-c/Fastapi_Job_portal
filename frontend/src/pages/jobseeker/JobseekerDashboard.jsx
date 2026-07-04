import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

function JobseekerDashboard() {

    const navigate = useNavigate();

    return (

        <>
            {/* <Navbar /> */}

            <div className="container mt-5">

                <h2>Job Seeker Dashboard</h2>

                <div className="row mt-4">

                    <div className="col-md-3">
                        <button
                            className="btn btn-primary w-100"
                            onClick={() => navigate("/jobseeker/profile")}
                        >
                            My Profile
                        </button>
                    </div>

                    <div className="col-md-3">
                        <button
                            className="btn btn-success w-100" onClick={() => navigate("/jobs")}
                        >
                            Browse Jobs
                        </button>
                    </div>

                    <div className="col-md-3">
                        <button
                            className="btn btn-warning w-100" onClick={() => navigate("/jobseeker/applications")}
                        >
                            Applied Jobs
                        </button>
                    </div>

                    <div className="col-md-3">
                        <button
                            className="btn btn-info w-100" onClick={() => navigate("/saved-jobs")}
                        >
                            Saved Jobs
                        </button>
                    </div>

                </div>

            </div>

        </>
    );

}

export default JobseekerDashboard;