
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axios";
import Navbar from "../../../components/layout/Navbar";
import RichTextEditor from "../../../components/common/RichTextEditor";
import "./EditJob.css";
import { toast } from "react-toastify";
import useMyJobStore from "../../../store/myJobStore";
import useRecruiterDashboardStore from "../../../store/recruiterDashboard";
import useJobStore from "../../../store/jobStore";

export default function EditJob() {
    const navigate = useNavigate();
    const { id } = useParams();

    const invalidateJobs = useMyJobStore((state) => state.invalidateJobs);
    const invalidateDashboard = useRecruiterDashboardStore((state) => state.invalidateDashboard);
    const invalidatePublicJobs = useJobStore((state) => state.invalidateJobs);

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
        employment_type: "Full_Time"
    });

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await api.get(`/jobs/${id}`);

                setForm({
                    title: response.data.title || "",
                    description: response.data.description || "",
                    location: response.data.location || "",
                    salary: response.data.salary ?? "",
                    employment_type: response.data.employment_type || "Full_Time"
                });
            } catch (error) {
                console.error(error);
                toast.info(
                    error.response?.data?.detail || "It takes some time"
                );
                navigate("/my-jobs");
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id, navigate]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);

        try {
            await api.put(`/jobs/${id}`, {
                ...form,
                salary: form.salary
            });

            invalidateJobs();
            invalidateDashboard();
            invalidatePublicJobs();

            toast.success("Job updated successfully");
            navigate("/my-jobs");
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.detail || "Job update failed"
            );
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="edit-job-loading">
                    <div className="spinner-border text-primary"></div>
                    <p>Loading job details...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="edit-job-bg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="card border-0 shadow-lg edit-job-card">
                                <div className="card-body">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary edit-job-back"
                                        onClick={() => navigate("/my-jobs")}
                                    >
                                        <i className="bi bi-arrow-left me-2"></i>
                                        Back to My Jobs
                                    </button>

                                    <h2>Edit Job</h2>
                                    <p className="text-muted mb-4">
                                        Update the details of your job posting.
                                    </p>

                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <label className="form-label">
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
                                            <label className="form-label">
                                                Job Description
                                            </label>
                                            <RichTextEditor
                                                value={form.description}
                                                onChange={(value) =>
                                                    setForm((prev) => ({
                                                        ...prev,
                                                        description: value
                                                    }))
                                                }
                                            />
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <label className="form-label">
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
                                                <label className="form-label">
                                                    Annual Salary (₹)
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="salary"
                                                    value={form.salary}
                                                    onChange={handleChange}
                                                    placeholder="800000"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label">
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
                                                <option value="Internship">
                                                    Internship
                                                </option>
                                                <option value="Contract">
                                                    Contract
                                                </option>
                                            </select>
                                        </div>

                                        <div className="edit-job-actions">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={updating}
                                            >
                                                {updating ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                                        Updating...
                                                    </>
                                                ) : (
                                                    "Update Job"
                                                )}
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => navigate("/my-jobs")}
                                                disabled={updating}
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
