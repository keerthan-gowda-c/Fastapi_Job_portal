
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import Navbar from "../../../components/layout/Navbar";
import { toast } from "react-toastify";
import "./EditCompany.css"

export default function EditCompany() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
    });

    useEffect(() => {
        fetchCompany();
    }, []);

    const fetchCompany = async () => {

        try {

            const response = await api.get("/companies/me");

            setForm({
                name: response.data.name || "",
                description: response.data.description || "",
                website: response.data.website || "",
                location: response.data.location || "",
            });

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.detail ||
                "Failed to load company"
            );

        } finally {

            setLoading(false);

        }
    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);

        try {

            await api.patch("/companies/me", form);

            toast.success("Company updated successfully");

            navigate("/company/my-company");

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.detail ||
                "Failed to update company"
            );

        } finally {

            setSaving(false);

        }
    };

    if (loading) {

        return (
            <>
                <Navbar />

                <div className="container mt-5 text-center">

                    <div className="spinner-border text-primary"></div>

                    <p className="mt-3">
                        Loading company details...
                    </p>

                </div>
            </>
        );

    }

    return (
        <>
            <Navbar />

            <div className="container py-5">

                <div className="row justify-content-center">

                    <div className="col-lg-7">

                        <div className="card border-0 shadow-lg rounded-4">

                            <div className="card-header bg-white border-0 p-4">

                                <h2 className="fw-bold mb-1">
                                    Edit Company
                                </h2>

                                <p className="text-muted mb-0">
                                    Update your company information.
                                </p>

                            </div>

                            <div className="card-body p-4">

                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Company Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Company Name"
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Description
                                        </label>

                                        <textarea
                                            className="form-control"
                                            name="description"
                                            rows="4"
                                            value={form.description}
                                            onChange={handleChange}
                                            placeholder="Company Description"
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Website
                                        </label>

                                        <input
                                            type="url"
                                            className="form-control"
                                            name="website"
                                            value={form.website}
                                            onChange={handleChange}
                                            placeholder="https://example.com"
                                        />

                                    </div>

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            Location
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="location"
                                            value={form.location}
                                            onChange={handleChange}
                                            placeholder="Bengaluru"
                                        />

                                    </div>

                                    <div className="d-flex gap-2">

                                        <button
                                            type="submit"
                                            className="btn btn-primary px-4"
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
                                                "Update Company"
                                            )}

                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary px-4"
                                            onClick={() =>
                                                navigate("/company/my-company")
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
        </>
    );
}


