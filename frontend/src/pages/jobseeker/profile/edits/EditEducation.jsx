import { useState } from "react";
import api from "../../../../api/axios";
import { toast } from "react-toastify";
import "./EditEducation.css";

export default function EditEducation({
    education,
    onSuccess,
    onCancel
}) {

    const [form, setForm] = useState({
        institution: education?.institution || "",
        degree: education?.degree || "",
        field_of_study: education?.field_of_study || "",
        start_year: education?.start_year || "",
        end_year: education?.end_year || "",
        grade: education?.grade || "",
        description: education?.description || ""
    });

    const [saving, setSaving] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);

        try {

            const data = {
                ...form,
                start_year: form.start_year || null,
                end_year: form.end_year || null
            };

            if (education) {

                await api.put(
                    `/candidates/me/education/${education.id}`,
                    data
                );

                toast.success("Education updated successfully");

            }
            else {

                await api.post(
                    "/candidates/me/education",
                    data
                );

                toast.success("Education added successfully");

            }

            onSuccess();

        }
        catch (error) {

            toast.error(
                error.response?.data?.detail ||
                "Failed to save education"
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
                        {education ? "Edit Education" : "Add Education"}
                    </h3>

                    <p>
                        Add your academic information.
                    </p>
                </div>

                <button
                    className="edit-close-btn"
                    onClick={onCancel}
                    type="button"
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

                        <label>Institution</label>

                        <input
                            type="text"
                            name="institution"
                            value={form.institution}
                            onChange={handleChange}
                            required
                            placeholder="University / College"
                        />

                    </div>

                    <div className="form-group">

                        <label>Degree</label>

                        <select
                            name="degree"
                            value={form.degree}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                Select degree
                            </option>

                            <option value="BCA">
                                BCA
                            </option>

                            <option value="BSc">
                                BSc
                            </option>

                            <option value="BTech">
                                BTech
                            </option>

                            <option value="BE">
                                BE
                            </option>

                            <option value="MCA">
                                MCA
                            </option>

                            <option value="MTech">
                                MTech
                            </option>

                            <option value="MBA">
                                MBA
                            </option>

                            <option value="Other">
                                Other
                            </option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>Field of Study</label>

                        <input
                            type="text"
                            name="field_of_study"
                            value={form.field_of_study}
                            onChange={handleChange}
                            placeholder="Computer Applications"
                        />

                    </div>

                    <div className="form-group">

                        <label>Grade</label>

                        <input
                            type="text"
                            name="grade"
                            value={form.grade}
                            onChange={handleChange}
                            placeholder="8.15 CGPA"
                        />

                    </div>

                    <div className="form-group">

                        <label>Start Date</label>

                        <input
                            type="date"
                            name="start_year"
                            value={form.start_year}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>End Date</label>

                        <input
                            type="date"
                            name="end_year"
                            value={form.end_year}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group form-group-full">

                        <label>Description</label>

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Describe your education..."
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
                        {saving ? "Saving..." : "Save Education"}
                    </button>

                </div>

            </form>

        </div>

    );

}