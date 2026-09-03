
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import Navbar from "../../../components/layout/Navbar";
import { toast } from "react-toastify";
import "./CreateCompany.css";

export default function CreateCompany() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        description: "",
        website: "",
        location: ""
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

            await api.post("/companies/", form);

            toast.success(
                "Company created successfully"
            );

            navigate("/recruiter-dashboard");

        }
        catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.detail ||
                "Company creation failed"
            );

        }
        finally {

            setLoading(false);

        }

    };


    return (

        <>
            <Navbar />

            <div className="container py-5">

                <div className="row justify-content-center">

                    <div className="col-lg-7 col-md-9">

                        <div className="text-center mb-4">

                            <h1 className="fw-bold">
                                🏢 Create Your Company
                            </h1>

                            <p className="text-muted">
                                Add your company information to start hiring candidates.
                            </p>

                        </div>


                        <div className="card border-0 shadow-lg rounded-4">

                            <div className="card-body p-4 p-md-5">

                                <form onSubmit={handleSubmit}>

                                    {/* Company Name */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            Company Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            name="name"
                                            placeholder="Enter company name"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>


                                    {/* Description */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            Company Description
                                        </label>

                                        <textarea
                                            className="form-control"
                                            name="description"
                                            rows="5"
                                            placeholder="Describe your company..."
                                            value={form.description}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>


                                    {/* Website */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            Website
                                        </label>

                                        <input
                                            type="url"
                                            className="form-control form-control-lg"
                                            name="website"
                                            placeholder="https://example.com"
                                            value={form.website}
                                            onChange={handleChange}
                                        />

                                        <small className="text-muted">
                                            Optional
                                        </small>

                                    </div>


                                    {/* Location */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            Location
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            name="location"
                                            placeholder="e.g. Bengaluru, Karnataka"
                                            value={form.location}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    {/* Buttons */}

                                    <div className="d-flex flex-column flex-md-row gap-3 mt-4">

                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg rounded-pill flex-fill"
                                            disabled={loading}
                                        >

                                            {loading ? (

                                                <>
                                                    <span
                                                        className="spinner-border spinner-border-sm me-2"
                                                        role="status"
                                                        aria-hidden="true"
                                                    />

                                                    Creating...
                                                </>

                                            ) : (

                                                <>
                                                    <i className="bi bi-building-add me-2"></i>
                                                    Create Company
                                                </>

                                            )}

                                        </button>


                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary btn-lg rounded-pill px-4"
                                            onClick={() =>
                                                navigate("/recruiter-dashboard")
                                            }
                                            disabled={loading}
                                        >
                                            Cancel
                                        </button>

                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>

    );

}



