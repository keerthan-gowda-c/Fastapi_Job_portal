
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import "./Login.css";

function Login() {

    const { role } = useParams();

    const navigate = useNavigate();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

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

        setLoading(true);

        try {

            const formData = new FormData();

            formData.append("username", form.email);
            formData.append("password", form.password);

            const response = await api.post(
                "/auth/login",
                formData
            );

            login(response.data);

            toast.success("Login successful!");

            if (response.data.user.role === "recruiter") {

                navigate("/recruiter-dashboard");

            } else {

                navigate("/jobseeker/dashboard");

            }

        }
        catch (error) {

            toast.error("Failed to login!");

        }
        finally {

            setLoading(false);

        }

    };


    const isJobSeeker = role === "jobseeker";


    return (

        <main className="login-page">

            <section className="login-container">

                {/* Left Side */}

                <div className="login-intro">

                    <div className="login-icon">

                        <span>
                            {isJobSeeker ? "◉" : "▣"}
                        </span>

                    </div>

                    <span className="login-label">
                        JOBHIVE
                    </span>

                    <h1 className="login-heading">
                        Welcome
                        <br />
                        <span>back.</span>
                    </h1>

                    <p className="login-description">

                        {isJobSeeker
                            ? "Login to discover amazing job opportunities and take the next step in your career."
                            : "Login to manage your company and connect with talented candidates."
                        }

                    </p>

                </div>


                {/* Right Side */}

                <div className="login-card">

                    <div className="login-card__header">

                        <span className="login-card__eyebrow">
                            ACCOUNT ACCESS
                        </span>

                        <h2>
                            Login as{" "}
                            <span>
                                {role}
                            </span>
                        </h2>

                        <p>
                            Enter your details to continue.
                        </p>

                    </div>


                    <form
                        className="login-form"
                        onSubmit={handleSubmit}
                    >

                        {/* Email */}

                        <div className="login-field">

                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Password */}

                        <div className="login-field">

                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Login Button */}

                        <button
                            type="submit"
                            className="login-submit"
                            disabled={loading}
                        >

                            {loading ? (

                                <span className="login-loading">

                                    <span className="login-spinner"></span>

                                    Logging in...

                                </span>

                            ) : (

                                "Login"

                            )}

                        </button>

                    </form>


                    {/* Register */}

                    <div className="login-register">

                        <span>
                            Don't have an account?
                        </span>

                        <button
                            type="button"
                            onClick={() =>
                                navigate(`/register/${role}`)
                            }
                        >
                            Register
                        </button>

                    </div>

                </div>

            </section>

        </main>

    );

}

export default Login;
