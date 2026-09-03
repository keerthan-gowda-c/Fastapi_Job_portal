import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import "./Register.css";

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

            toast.success("Registration Successful!");

            navigate(`/login/${role}`);

        }
        catch (error) {

            toast.error(
                error.response?.data?.detail ||
                "Registration failed"
            );

        }

    };


    const isJobSeeker = role === "jobseeker";


    return (

        <main className="register-page">

            <section className="register-container">

                {/* Left Side */}

                <div className="register-intro">

                    <div className="register-icon">

                        <span>
                            {isJobSeeker ? "◉" : "▣"}
                        </span>

                    </div>

                    <span className="register-label">
                        JOIN JOBHIVE
                    </span>

                    <h1 className="register-heading">

                        {isJobSeeker ? (
                            <>
                                Start your
                                <br />
                                <span>career.</span>
                            </>
                        ) : (
                            <>
                                Hire the
                                <br />
                                <span>best talent.</span>
                            </>
                        )}

                    </h1>

                    <p className="register-description">

                        {isJobSeeker
                            ? "Create your account and discover opportunities that can take your career to the next level."
                            : "Create your recruiter account and connect with talented professionals looking for their next opportunity."
                        }

                    </p>

                </div>


                {/* Right Side */}

                <div className="register-card">

                    <div className="register-card__header">

                        <span className="register-card__eyebrow">
                            CREATE ACCOUNT
                        </span>

                        <h2>
                            Register as{" "}
                            <span>
                                {role}
                            </span>
                        </h2>

                        <p>
                            Fill in your details to get started.
                        </p>

                    </div>


                    <form
                        className="register-form"
                        onSubmit={handleSubmit}
                    >

                        {/* Full Name */}

                        <div className="register-field">

                            <label htmlFor="full_name">
                                Full Name
                            </label>

                            <input
                                id="full_name"
                                name="full_name"
                                type="text"
                                placeholder="Enter your full name"
                                value={form.full_name}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Email */}

                        <div className="register-field">

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

                        <div className="register-field">

                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Create a password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Create Account */}

                        <button
                            type="submit"
                            className="register-submit"
                        >
                            Create Account
                            <span>→</span>
                        </button>

                    </form>


                    {/* Login */}

                    <div className="register-login">

                        <span>
                            Already have an account?
                        </span>

                        <button
                            type="button"
                            onClick={() =>
                                navigate(`/login/${role}`)
                            }
                        >
                            Login
                        </button>

                    </div>

                </div>

            </section>

        </main>

    );

}

export default Register;