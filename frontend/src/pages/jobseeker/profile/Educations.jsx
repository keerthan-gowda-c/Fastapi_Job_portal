import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import EditEducation from "./edits/EditEducation";
import "./Educations.css";

export default function Educations() {

    const [educations, setEducations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingEducation, setEditingEducation] = useState(null);

    const getEducations = async () => {

        try {

            const response = await api.get("/candidates/me/education");

            setEducations(response.data);

        }
        catch (error) {

            console.error("Failed to load education:", error);

            // toast.error(
            //     error.response?.data?.detail ||
            //     "Failed to load education"
            // );

        }
        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        getEducations();

    }, []);

    const handleAdd = () => {

        setEditingEducation(null);
        setShowForm(true);

    };

    const handleEdit = (education) => {

        setEditingEducation(education);
        setShowForm(true);

    };

    const handleDelete = async (educationId) => {

        if (!window.confirm("Are you sure you want to delete this education?")) {
            return;
        }

        try {

            await api.delete(`/candidates/me/education/${educationId}`);

            toast.success("Education deleted successfully");

            getEducations();

        }
        catch (error) {

            toast.error(
                error.response?.data?.detail ||
                "Failed to delete education"
            );

        }

    };

    const handleFormSuccess = () => {

        setShowForm(false);
        setEditingEducation(null);
        getEducations();

    };

    if (loading) {

        return (
            <section className="profile-section">

                <div className="section-header">

                    <div>
                        <h3>Education</h3>
                        <p>Your academic background</p>
                    </div>

                </div>

                <div className="section-loading">
                    Loading education...
                </div>

            </section>
        );

    }

    return (

        <section className="profile-section">

            <div className="section-header">

                <div>
                    <h3>Education</h3>
                    <p>Your academic background</p>
                </div>

                <button
                    className="section-add-btn"
                    onClick={handleAdd}
                >
                    <i className="bi bi-plus-lg"></i>
                    Add Education
                </button>

            </div>

            {educations.length === 0 ? (

                <div className="section-empty">

                    <div className="section-empty-icon">
                        <i className="bi bi-mortarboard"></i>
                    </div>

                    <h4>No education added</h4>

                    <p>
                        Add your educational background to complete your profile.
                    </p>

                    <button
                        className="section-add-btn"
                        onClick={handleAdd}
                    >
                        <i className="bi bi-plus-lg"></i>
                        Add Education
                    </button>

                </div>

            ) : (

                <div className="education-list">

                    {educations.map((education) => (

                        <div
                            className="education-item"
                            key={education.id}
                        >

                            <div className="education-main">

                                <div className="education-icon">
                                    <i className="bi bi-mortarboard"></i>
                                </div>

                                <div className="education-details">

                                    <h4>
                                        {education.degree}
                                    </h4>

                                    <p className="education-institution">
                                        {education.institution}
                                    </p>

                                    {education.field_of_study && (
                                        <p>
                                            {education.field_of_study}
                                        </p>
                                    )}

                                    <div className="education-meta">

                                        {education.start_year && (
                                            <span>
                                                {education.start_year}
                                            </span>
                                        )}

                                        {education.end_year && (
                                            <>
                                                <span>—</span>
                                                <span>
                                                    {education.end_year}
                                                </span>
                                            </>
                                        )}

                                        {education.grade && (
                                            <span>
                                                Grade: {education.grade}
                                            </span>
                                        )}

                                    </div>

                                    {education.description && (
                                        <p className="education-description">
                                            {education.description}
                                        </p>
                                    )}

                                </div>

                            </div>

                            <div className="item-actions">

                                <button
                                    className="edit-btn"
                                    onClick={() =>
                                        handleEdit(education)
                                    }
                                >
                                    <i className="bi bi-pencil"></i>
                                    Edit
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        handleDelete(education.id)
                                    }
                                >
                                    <i className="bi bi-trash"></i>
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

            {showForm && (
                <EditEducation
                    education={editingEducation}
                    onSuccess={handleFormSuccess}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingEducation(null);
                    }}
                />
            )}

        </section>

    );

}