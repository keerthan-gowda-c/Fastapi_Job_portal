import { useNavigate } from "react-router-dom";

function HomePage(){
    const navigate = useNavigate();

    return (

        <div className="container mt-5 text-center border-none">

            <h1 className="mb-4">
                Job Portal
            </h1>

            <p className="lead">
                Find jobs. Hire talent.
            </p>


            <div className="mt-4">

                <button
                    className="btn btn-primary me-3"
                    onClick={() => navigate("/choose-login-role")}
                >
                    Login
                </button>


                <button
                    className="btn btn-success"
                    onClick={() => navigate("/choose-role")}
                >
                    Register
                </button>

            </div>


        </div>

    )
}



export default HomePage;