import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/axios";

function Login() {

    const { role } = useParams();

    const navigate = useNavigate();

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

        try {

            const formData = new FormData();

            formData.append(
                "username",
                form.email
            );

            formData.append(
                "password",
                form.password
            );

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

            if (
                response.data.user.role ===
                "recruiter"
            ){

                navigate("/recruiter-dashboard");

            } else{

                navigate("/jobseeker/dashboard");

            }

        }
        catch (error) {

            alert(
                error.response?.data?.detail ||
                "Login failed"
            );

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card p-4">

                        <h2 className="text-center mb-3">
                            Login as {role}
                        </h2>

                        <form
                            onSubmit={handleSubmit}
                        >

                            <input
                                className="form-control mb-3"
                                name="email"
                                type="email"
                                placeholder="Email"
                                onChange={handleChange}
                                required
                            />

                            <input
                                className="form-control mb-3"
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />

                            <button
                                className="btn btn-primary w-100"
                            >
                                Login
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;