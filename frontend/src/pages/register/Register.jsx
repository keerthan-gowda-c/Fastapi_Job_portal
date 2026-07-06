import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

function Register() {

    const { role } = useParams();

    const navigate = useNavigate();

    const [form, setForm] = useState({
        full_name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/auth/register", {
                ...form,
                role: role
            });

            alert("Registration Successful!");

            navigate(`/login/${role}`);

        } catch (error) {

            alert(
                error.response?.data?.detail ||
                "Registration failed"
            );

        }

    };

    return (

        <div className="container py-5">

            <div className="row justify-content-center align-items-center">

                {/* Left Side */}

                <div className="col-lg-6 d-none d-lg-block">

                    <div className="text-center">

                        <i
                            className={`bi ${role === "jobseeker"
                                    ? "bi-person-workspace text-primary"
                                    : "bi-building text-dark"
                                }`}
                            style={{ fontSize: "130px" }}
                        ></i>

                        <h1 className="fw-bold mt-4">

                            {role === "jobseeker"
                                ? "Start Your Career"
                                : "Hire the Best Talent"}

                        </h1>

                        <p className="lead text-muted mt-3">

                            {role === "jobseeker"
                                ? "Create your account and apply for thousands of jobs."
                                : "Create your recruiter account and start hiring today."}

                        </p>

                    </div>

                </div>

                {/* Right Side */}

                <div className="col-lg-5 col-md-8">

                    <div className="card border-0 shadow-lg rounded-4">

                        <div className="card-body p-5">

                            <h2 className="text-center fw-bold mb-4">

                                Register as{" "}

                                <span className="text-primary text-capitalize">
                                    {role}
                                </span>

                            </h2>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Full Name
                                    </label>

                                    <input
                                        className="form-control form-control-lg"
                                        name="full_name"
                                        placeholder="Enter your full name"
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Email
                                    </label>

                                    <input
                                        className="form-control form-control-lg"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        Password
                                    </label>

                                    <input
                                        className="form-control form-control-lg"
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <button
                                    className="btn btn-primary btn-lg w-100 rounded-pill"
                                >
                                    Create Account
                                </button>

                            </form>

                            <hr className="my-4" />

                            <p className="text-center mb-0">

                                Already have an account?{" "}

                                <span
                                    className="text-primary fw-semibold"
                                    style={{
                                        cursor: "pointer"
                                    }}
                                    onClick={() =>
                                        navigate(`/login/${role}`)
                                    }
                                >
                                    Login
                                </span>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;