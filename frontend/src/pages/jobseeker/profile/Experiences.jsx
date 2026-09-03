import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import EditExperience from "./edits/EditExperience";
import "./Experiences.css";

export default function Experiences() {

    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingExperience, setEditingExperience] = useState(null);

    const getExperiences = async () => {

        try {

            const response = await api.get("/candidates/me/experience");

            setExperiences(response.data);

        }
        catch (error) {

            // toast.error(
            //     error.response?.data?.detail ||
            //     "Failed to load experience"
            // );

        }
        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        getExperiences();

    }, []);

    const handleDelete = async (id) => {

        if (!window.confirm("Are you sure you want to delete this experience?")) {
            return;
        }

        try {

            await api.delete(`/candidates/me/experience/${id}`);

            toast.success("Experience deleted successfully");

            getExperiences();

        }
        catch (error) {

            toast.error(
                error.response?.data?.detail ||
                "Failed to delete experience"
            );

        }

    };

    const handleSuccess = () => {

        setShowForm(false);
        setEditingExperience(null);
        getExperiences();

    };

    if (loading) {

        return (
            <section className="profile-section">

                <div className="section-header">

                    <div>
                        <h3>Experience</h3>
                        <p>Your professional experience</p>
                    </div>

                </div>

                <div className="section-loading">
                    Loading experience...
                </div>

            </section>
        );

    }

    return (

        <section className="profile-section">

            <div className="section-header">

                <div>
                    <h3>Experience</h3>
                    <p>Your professional experience</p>
                </div>

                <button
                    className="section-add-btn"
                    onClick={() => {
                        setEditingExperience(null);
                        setShowForm(true);
                    }}
                >
                    <i className="bi bi-plus-lg"></i>
                    Add Experience
                </button>

            </div>

            {experiences.length === 0 ? (

                <div className="section-empty">

                    <div className="section-empty-icon">
                        <i className="bi bi-briefcase"></i>
                    </div>

                    <h4>No experience added</h4>

                    <p>
                        Add your professional experience to complete your profile.
                    </p>

                    <button
                        className="section-add-btn"
                        onClick={() => {
                            setEditingExperience(null);
                            setShowForm(true);
                        }}
                    >
                        <i className="bi bi-plus-lg"></i>
                        Add Experience
                    </button>

                </div>

            ) : (

                <div className="experience-list">

                    {experiences.map((experience) => (

                        <div
                            className="experience-item"
                            key={experience.id}
                        >

                            <div className="experience-main">

                                <div className="experience-icon">
                                    <i className="bi bi-briefcase"></i>
                                </div>

                                <div>

                                    <h4>
                                        {experience.job_title}
                                    </h4>

                                    <p className="experience-company">
                                        {experience.company_name}
                                    </p>

                                    {experience.location && (
                                        <p>
                                            {experience.location}
                                        </p>
                                    )}

                                    <div className="experience-meta">

                                        {experience.employment_type && (
                                            <span>
                                                {experience.employment_type}
                                            </span>
                                        )}

                                        {experience.start_date && (
                                            <span>
                                                {experience.start_date}
                                            </span>
                                        )}

                                        {experience.end_date ? (
                                            <span>
                                                — {experience.end_date}
                                            </span>
                                        ) : experience.is_current ? (
                                            <span>
                                                — Present
                                            </span>
                                        ) : null}

                                    </div>

                                    {experience.description && (
                                        <p className="experience-description">
                                            {experience.description}
                                        </p>
                                    )}

                                </div>

                            </div>

                            <div className="item-actions">

                                <button
                                    className="edit-btn"
                                    onClick={() => {
                                        setEditingExperience(experience);
                                        setShowForm(true);
                                    }}
                                >
                                    <i className="bi bi-pencil"></i>
                                    Edit
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        handleDelete(experience.id)
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
                <EditExperience
                    experience={editingExperience}
                    onSuccess={handleSuccess}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingExperience(null);
                    }}
                />
            )}

        </section>

    );

}