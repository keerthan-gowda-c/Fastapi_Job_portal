import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import EditProject from "./edits/EditProject";
import "./Projects.css";

export default function Projects() {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    const getProjects = async () => {

        try {

            const response = await api.get("/candidates/me/projects");

            setProjects(response.data);

        }
        catch (error) {

            // toast.error(
            //     error.response?.data?.detail ||
            //     "Failed to load projects"
            // );

        }
        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        getProjects();

    }, []);

    const handleDelete = async (id) => {

        if (!window.confirm("Are you sure you want to delete this project?")) {
            return;
        }

        try {

            await api.delete(`/candidates/me/projects/${id}`);

            toast.success("Project deleted successfully");

            getProjects();

        }
        catch (error) {

            toast.error(
                error.response?.data?.detail ||
                "Failed to delete project"
            );

        }

    };

    const handleSuccess = () => {

        setShowForm(false);
        setEditingProject(null);
        getProjects();

    };

    if (loading) {

        return (
            <section className="profile-section">

                <div className="section-header">

                    <div>
                        <h3>Projects</h3>
                        <p>Your personal and professional projects</p>
                    </div>

                </div>

                <div className="section-loading">
                    Loading projects...
                </div>

            </section>
        );

    }

    return (

        <section className="profile-section">

            <div className="section-header">

                <div>
                    <h3>Projects</h3>
                    <p>Your personal and professional projects</p>
                </div>

                <button
                    className="section-add-btn"
                    onClick={() => {
                        setEditingProject(null);
                        setShowForm(true);
                    }}
                >
                    <i className="bi bi-plus-lg"></i>
                    Add Project
                </button>

            </div>

            {projects.length === 0 ? (

                <div className="section-empty">

                    <div className="section-empty-icon">
                        <i className="bi bi-folder"></i>
                    </div>

                    <h4>No projects added</h4>

                    <p>
                        Add projects to showcase your technical skills.
                    </p>

                    <button
                        className="section-add-btn"
                        onClick={() => {
                            setEditingProject(null);
                            setShowForm(true);
                        }}
                    >
                        <i className="bi bi-plus-lg"></i>
                        Add Project
                    </button>

                </div>

            ) : (

                <div className="projects-list">

                    {projects.map((project) => (

                        <div
                            className="project-item"
                            key={project.id}
                        >

                            <div className="project-content">

                                <div className="project-icon">
                                    <i className="bi bi-folder"></i>
                                </div>

                                <div>

                                    <h4>
                                        {project.project_name}
                                    </h4>

                                    {project.technologies && (
                                        <p className="project-technologies">
                                            {project.technologies}
                                        </p>
                                    )}

                                    {project.description && (
                                        <p className="project-description">
                                            {project.description}
                                        </p>
                                    )}

                                    <div className="project-links">

                                        {project.project_url && (
                                            <a
                                                href={project.project_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i className="bi bi-box-arrow-up-right"></i>
                                                Project
                                            </a>
                                        )}

                                        {project.github_url && (
                                            <a
                                                href={project.github_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i className="bi bi-github"></i>
                                                GitHub
                                            </a>
                                        )}

                                    </div>

                                </div>

                            </div>

                            <div className="item-actions">

                                <button
                                    className="edit-btn"
                                    onClick={() => {
                                        setEditingProject(project);
                                        setShowForm(true);
                                    }}
                                >
                                    <i className="bi bi-pencil"></i>
                                    Edit
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        handleDelete(project.id)
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
                <EditProject
                    project={editingProject}
                    onSuccess={handleSuccess}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingProject(null);
                    }}
                />
            )}

        </section>

    );

}