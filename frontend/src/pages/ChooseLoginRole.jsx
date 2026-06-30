import { useNavigate } from "react-router-dom";

function ChooseLoginRole() {

    const navigate = useNavigate();

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-5">
                Login As
            </h2>

            <div className="row">

                <div className="col-md-6">

                    <div className="card p-4 text-center">

                        <i className="bi bi-person fs-1"></i>

                        <h3>Job Seeker</h3>

                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                navigate("/login/jobseeker")
                            }
                        >
                            Continue
                        </button>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="card p-4 text-center">

                        <i className="bi bi-building fs-1"></i>

                        <h3>Recruiter</h3>

                        <button
                            className="btn btn-dark"
                            onClick={() =>
                                navigate("/login/recruiter")
                            }
                        >
                            Continue
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ChooseLoginRole;