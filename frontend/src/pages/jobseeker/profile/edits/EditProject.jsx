import { useState } from "react";
import api from "../../../../api/axios";
import { toast } from "react-toastify";
import "./EditProject.css";

export default function EditProject({
    project,
    onSuccess,
    onCancel
}) {

    const [form, setForm] = useState({
        project_name: project?.project_name || "",
        description: project?.description || "",
        technologies: project?.technologies || "",
        project_url: project?.project_url || "",
        github_url: project?.github_url || "",
        start_date: project?.start_date || "",
        end_date: project?.end_date || ""
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
                start_date: form.start_date || null,
                end_date: form.end_date || null,
                project_url: form.project_url || null,
                github_url: form.github_url || null,
                description: form.description || null,
                technologies: form.technologies || null
            };

            if (project) {

                await api.put(`/candidates/me/projects/${project.id}`, data);

                toast.success("Project updated successfully");

            } else {

                await api.post("/candidates/me/projects", data);

                toast.success("Project added successfully");

            }

            onSuccess();

        }
        catch (error) {

            toast.error(
                error.response?.data?.detail ||
                "Failed to save project"
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
                        {project ? "Edit Project" : "Add Project"}
                    </h3>

                    <p>
                        Showcase your project details.
                    </p>

                </div>

                <button
                    type="button"
                    className="edit-close-btn"
                    onClick={onCancel}
                >
                    ×
                </button>

            </div>


            <form
                className="profile-form"
                onSubmit={handleSubmit}
            >

                <div className="form-grid">

                    <div className="form-group form-group-full">

                        <label htmlFor="project_name">
                            Project Name
                        </label>

                        <input
                            id="project_name"
                            type="text"
                            name="project_name"
                            value={form.project_name}
                            onChange={handleChange}
                            required
                            placeholder="Job Portal"
                        />

                    </div>


                    <div className="form-group form-group-full">

                        <label htmlFor="technologies">
                            Technologies
                        </label>

                        <input
                            id="technologies"
                            type="text"
                            name="technologies"
                            value={form.technologies}
                            onChange={handleChange}
                            placeholder="FastAPI, React, PostgreSQL"
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="start_date">
                            Start Date
                        </label>

                        <input
                            id="start_date"
                            type="date"
                            name="start_date"
                            value={form.start_date}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="end_date">
                            End Date
                        </label>

                        <input
                            id="end_date"
                            type="date"
                            name="end_date"
                            value={form.end_date}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="project_url">
                            Project URL
                        </label>

                        <input
                            id="project_url"
                            type="url"
                            name="project_url"
                            value={form.project_url}
                            onChange={handleChange}
                            placeholder="https://..."
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="github_url">
                            GitHub URL
                        </label>

                        <input
                            id="github_url"
                            type="url"
                            name="github_url"
                            value={form.github_url}
                            onChange={handleChange}
                            placeholder="https://github.com/..."
                        />

                    </div>


                    <div className="form-group form-group-full">

                        <label htmlFor="description">
                            Description
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows="5"
                            placeholder="Describe your project..."
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
                        {saving ? "Saving..." : project ? "Update Project" : "Save Project"}
                    </button>

                </div>

            </form>

        </div>

    );

}