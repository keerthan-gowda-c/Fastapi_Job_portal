import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../../api/axios";
import Navbar from "../../../components/Navbar";
import "./EditJob.css";
import { toast } from "react-toastify";

function EditJob() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        salary: ""
    });

    const fetchJob = async () => {
        try {
            const response = await api.get(`/jobs/${id}`);

            setForm({
                title: response.data.title,
                description: response.data.description,
                location: response.data.location,
                salary: response.data.salary
            });

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchJob();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const updateJob = async (e) => {
        e.preventDefault();

        try {

            await api.put(`/jobs/${id}`, {
                ...form,
                salary: Number(form.salary)
            });

            toast.success("Job updated successfully");
            navigate("/my-jobs");

        } catch (error) {

            console.log(error);

            toast.warning(
                error.response?.data?.detail ||
                "Update failed"
            );
        }
    };

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
                                                    required
                                                />

                                            </div>

                                        </div>

                                        <div className="d-flex gap-3 mt-4">

                                            <button
                                                className="btn btn-success px-4"
                                            >
                                                Update Job
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary px-4"
                                                onClick={() => navigate("/my-jobs")}
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

export default EditJob;