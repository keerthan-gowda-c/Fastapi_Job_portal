import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-toastify";

function Login() {

    const { role } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true)

        try {

            const formData = new FormData();

            formData.append("username", form.email);
            formData.append("password", form.password);

            const response = await api.post(
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            toast.success("Login successful!")

            if (response.data.user.role === "recruiter") {

                navigate("/recruiter-dashboard");

            } else {

                navigate("/jobseeker/dashboard");

            }

        }
        catch (error) {

            toast.error("Failed to login!")

        }
        finally {
            setLoading(false)
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

                            Welcome Back

                        </h1>

                        <p className="lead text-muted mt-3">

                            {role === "jobseeker"
                                ? "Login to discover amazing job opportunities."
                                : "Login to manage your company and hire talented candidates."}

                        </p>

                    </div>

                </div>

                {/* Right Side */}

                <div className="col-lg-5 col-md-8">

                    <div className="card border-0 shadow-lg rounded-4">

                        <div className="card-body p-5">

                            <h2 className="text-center fw-bold mb-4">

                                Login as{" "}

                                <span className="text-primary text-capitalize">

                                    {role}

                                </span>

                            </h2>

                            <form onSubmit={handleSubmit}>

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
                                    type="submit"
                                    className="btn btn-primary btn-lg w-100 rounded-pill"
                                    disabled={loading}
                                >
                                    {
                                        loading ?
                                            (
                                                <>
                                                    <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                    role="status"
                                                    aria-hidden="true">
                                                        
                                                    </span>
                                                Logging in...
                                                </>
                                            ) :
                                            (
                                                "Login"
                                            )
                                    }



                                </button>

                            </form>

                            <hr className="my-4" />

                            <p className="text-center mb-0">

                                Don't have an account?{" "}

                                <span
                                    className="text-primary fw-semibold"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        navigate(`/register/${role}`)
                                    }
                                >

                                    Register

                                </span>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;