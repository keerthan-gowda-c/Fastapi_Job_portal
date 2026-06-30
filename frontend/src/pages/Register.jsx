import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";


function Register() {

    const{role} = useParams();

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
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post(
                "/auth/register",
                {
                    ...form, role:role
                }
            )
            alert("Registeration Successfully");
            navigate(`/login/${role}`)
        }
        catch (error) {
            alert(error.response?.data?.detail || "Registration failed")
        }
    }

    return (

        <div className="container mt-5">


            <div className="row justify-content-center">


                <div className="col-md-5">


                    <div className="card p-4">


                        <h2 className="text-center mb-3">

                            Register as {role}

                        </h2>



                        <form onSubmit={handleSubmit}>


                            <input

                                className="form-control mb-3"

                                name="full_name"

                                placeholder="Full Name"

                                onChange={handleChange}

                                required

                            />



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

                                Register

                            </button>



                        </form>


                    </div>


                </div>


            </div>


        </div>

    )

}

export default Register;