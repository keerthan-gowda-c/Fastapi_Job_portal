import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../api/axios";
import Navbar from "../../../components/Navbar";
import "./CreateJob.css";
import { toast } from "react-toastify";

function CreateJob() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        salary: ""
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

            await api.post("/jobs/", {
                ...form,
                salary: Number(form.salary)
            });

            toast.success("Job created successfully");

            navigate("/recruiter-dashboard");

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.detail ||
                "Job creation failed"
            );
        }
    };

    return (
        <>
            <Navbar />

            <div className="create-job-bg">

                <div className="container py-5">

                    <div className="row justify-content-center">

                        <div className="col-lg-8">

                            <div className="card border-0 shadow-lg create-job-card">

                                <div className="card-body p-5">

                                    <h2 className="fw-bold mb-2">
                                        Create New Job
                                    </h2>

                                    <p className="text-muted mb-4">
                                        Fill in the details below to publish a new job posting.
                                    </p>

                                    <form onSubmit={handleSubmit}>

                                        <div className="mb-4">

                                            <label className="form-label fw-semibold">
                                                Job Title
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                name="title"
                                                value={form.title}
                                                onChange={handleChange}
                                                placeholder="Frontend Developer"
                                                required
                                            />

                                        </div>

                                        <div className="mb-4">

                                            <label className="form-label fw-semibold">
                                                Job Description
                                            </label>

                                            <textarea
                                                rows="6"
                                                className="form-control"
                                                name="description"
                                                value={form.description}
                                                onChange={handleChange}
                                                placeholder="Describe the responsibilities, requirements, and benefits..."
                                                required
                                            />

                                        </div>

                                        <div className="row">

                                            <div className="col-md-6 mb-4">

                                                <label className="form-label fw-semibold">
                                                    Location
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="location"
                                                    value={form.location}
                                                    onChange={handleChange}
                                                    placeholder="Bangalore"
                                                    required
                                                />

                                            </div>

                                            <div className="col-md-6 mb-4">

                                                <label className="form-label fw-semibold">
                                                    Annual Salary (₹)
                                                </label>

                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="salary"
                                                    value={form.salary}
                                                    onChange={handleChange}
                                                    placeholder="800000"
                                                    required
                                                />

                                            </div>

                                        </div>

                                        <div className="d-flex gap-3 mt-4">

                                            <button
                                                type="submit"
                                                className="btn btn-primary px-4"
                                            >
                                                Publish Job
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary px-4"
                                                onClick={() => navigate("/recruiter-dashboard")}
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

            </div>

        </>
    );
}

export default CreateJob;