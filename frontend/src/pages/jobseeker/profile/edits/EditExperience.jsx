import { useState } from "react";
import api from "../../../../api/axios";
import { toast } from "react-toastify";
import "./EditExperience.css";

export default function EditExperience({
    experience,
    onSuccess,
    onCancel
}) {

    const [form, setForm] = useState({
        job_title: experience?.job_title || "",
        company_name: experience?.company_name || "",
        employment_type: experience?.employment_type || "",
        location: experience?.location || "",
        start_date: experience?.start_date || "",
        end_date: experience?.end_date || "",
        is_current: experience?.is_current || false,
        description: experience?.description || ""
    });

    const [saving, setSaving] = useState(false);

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);

        try {

            const data = {
                ...form,
                start_date: form.start_date || null,
                end_date: form.is_current ? null : (form.end_date || null)
            };

            if (experience) {

                await api.put(
                    `/candidates/me/experience/${experience.id}`,
                    data
                );

                toast.success("Experience updated successfully");

            }
            else {

                await api.post(
                    "/candidates/me/experience",
                    data
                );

                toast.success("Experience added successfully");

            }

            onSuccess();

        }
        catch (error) {

            toast.error(
                error.response?.data?.detail ||
                "Failed to save experience"
            );

        }
        finally {

            setSaving(false);

        }

    };

    return (

        <div className="edit-form-container">

            <div className="edit-form-header">

                <div>
                    <h3>
                        {experience ? "Edit Experience" : "Add Experience"}
                    </h3>

                    <p>
                        Add your professional experience.
                    </p>
                </div>

                <button
                    type="button"
                    className="edit-close-btn"
                    onClick={onCancel}
                >
                    <i className="bi bi-x-lg"></i>
                </button>

            </div>

            <form
                className="profile-form"
                onSubmit={handleSubmit}
            >

                <div className="form-grid">

                    <div className="form-group">

                        <label>Job Title</label>

                        <input
                            type="text"
                            name="job_title"
                            value={form.job_title}
                            onChange={handleChange}
                            required
                            placeholder="Python Developer"
                        />

                    </div>

                    <div className="form-group">

                        <label>Company</label>

                        <input
                            type="text"
                            name="company_name"
                            value={form.company_name}
                            onChange={handleChange}
                            required
                            placeholder="Company name"
                        />

                    </div>

                    <div className="form-group">

                        <label>Employment Type</label>

                        <select
                            name="employment_type"
                            value={form.employment_type}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                Select employment type
                            </option>

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

                    <div className="form-group">

                        <label>Location</label>

                        <input
                            type="text"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            placeholder="Bengaluru"
                        />

                    </div>

                    <div className="form-group">

                        <label>Start Date</label>

                        <input
                            type="date"
                            name="start_date"
                            value={form.start_date}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>End Date</label>

                        <input
                            type="date"
                            name="end_date"
                            value={form.end_date}
                            onChange={handleChange}
                            disabled={form.is_current}
                        />

                    </div>

                    <div className="form-checkbox">

                        <input
                            type="checkbox"
                            id="is_current"
                            name="is_current"
                            checked={form.is_current}
                            onChange={handleChange}
                        />

                        <label htmlFor="is_current">
                            I currently work here
                        </label>

                    </div>

                    <div className="form-group form-group-full">

                        <label>Description</label>

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Describe your responsibilities..."
                        />

                    </div>

                </div>

                <div className="form-actions">

                    <button
                        type="button"
                        className="form-cancel-btn"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="form-save-btn"
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Save Experience"}
                    </button>

                </div>

            </form>

        </div>

    );

}