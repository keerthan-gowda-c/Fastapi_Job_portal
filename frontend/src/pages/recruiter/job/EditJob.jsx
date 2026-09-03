
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../../api/axios";
import Navbar from "../../../components/layout/Navbar";
import "./EditJob.css";
import { toast } from "react-toastify";

export default function EditJob() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
        employment_type: "Full_Time"
    });

    const fetchJob = async () => {

        try {

            const response = await api.get(`/jobs/${id}`);

            setForm({
                title: response.data.title || "",
                description: response.data.description || "",
                location: response.data.location || "",
                salary: response.data.salary ?? "",
                employment_type:
                    response.data.employment_type || "Full_Time"
            });

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.detail ||
                "Failed to load job"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        fetchJob();

    }, [id]);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const updateJob = async (e) => {

        e.preventDefault();

        setSaving(true);

        try {

            await api.put(`/jobs/${id}`, {
                title: form.title,
                description: form.description,
                location: form.location,
                salary: Number(form.salary),
                employment_type: form.employment_type
            });

            toast.success("Job updated successfully");

            navigate("/my-jobs");

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.detail ||
                "Failed to update job"
            );

        } finally {

            setSaving(false);

        }
    };

    if (loading) {

        return (
            <>
                <Navbar />

                <div className="d-flex justify-content-center align-items-center vh-100">

                    <div className="text-center">

                        <div className="spinner-border text-primary"></div>

                        <p className="mt-3 text-muted">
                            Loading job details...
                        </p>

                    </div>

                </div>
            </>
        );

    }

    return (
        <>
            <Navbar />

            <div className="edit-job-bg">

                <div className="container py-5">

                    <div className="row justify-content-center">

                        <div className="col-lg-8">

                            <div className="card border-0 shadow-lg edit-job-card">

                                <div className="card-body p-5">

                                    <h2 className="fw-bold mb-2">
                                        Edit Job
                                    </h2>

                                    <p className="text-muted mb-4">
                                        Update your job posting information.
                                    </p>

                                    <form onSubmit={updateJob}>

                                        {/* Job Title */}

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
                                                required
                                            />

                                        </div>

                                        {/* Description */}

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
                                                required
                                            />

                                        </div>

                                        {/* Location / Salary */}

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
                                                    required
                                                />

                                            </div>

                                            <div className="col-md-6 mb-4">

                                                <label className="form-label fw-semibold">
                                                    Salary (₹)
                                                </label>

                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="salary"
                                                    value={form.salary}
                                                    onChange={handleChange}
                                                    min="0"
                                                    required
                                                />

                                            </div>

                                        </div>

                                        {/* Employment Type */}

                                        <div className="mb-4">

                                            <label className="form-label fw-semibold">
                                                Employment Type
                                            </label>

                                            <select
                                                className="form-select"
                                                name="employment_type"
                                                value={form.employment_type}
                                                onChange={handleChange}
                                                required
                                            >

                                                <option value="Full_Time">
                                                    Full Time
                                                </option>

                                                <option value="Part_Time">
                                                    Part Time
                                                </option>

                                                <option value="Contract">
                                                    Contract
                                                </option>

                                                <option value="Internship">
                                                    Internship
                                                </option>

                                            </select>

                                        </div>

                                        {/* Buttons */}

                                        <div className="d-flex gap-3 mt-4">

                                            <button
                                                type="submit"
                                                className="btn btn-success px-4"
                                                disabled={saving}
                                            >

                                                {saving ? (
                                                    <>
                                                        <span
                                                            className="spinner-border spinner-border-sm me-2"
                                                            role="status"
                                                            aria-hidden="true"
                                                        ></span>

                                                        Updating...
                                                    </>
                                                ) : (
                                                    "Update Job"
                                                )}

                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary px-4"
                                                onClick={() =>
                                                    navigate("/my-jobs")
                                                }
                                                disabled={saving}
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


