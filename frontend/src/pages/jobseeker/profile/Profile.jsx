import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import Navbar from "../../../components/layout/Navbar";
import { toast } from "react-toastify";
import "./Profile.css";

import Projects from "./Projects";
import Educations from "./Educations";
import Experiences from "./Experiences";


export default function Profile() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const getProfile = async () => {

        try {

            const response = await api.get("/users/me");

            setUser(response.data);

        }
        catch (error) {

            console.error("Failed to load profile:", error);

            toast.warning(
                error.response?.data?.detail ||
                "Failed to load profile"
            );

        }
        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        getProfile();

    }, []);

    if (loading) {

        return (
            <>
                <Navbar />

                <div className="profile-loading">

                    <div className="profile-loading-content">

                        <div
                            className="spinner-border profile-spinner"
                            role="status"
                        />

                        <h5>
                            Loading profile...
                        </h5>

                        <p>
                            Please wait while we load your information.
                        </p>

                    </div>

                </div>
            </>
        );

    }

    if (!user) {

        return (
            <>
                <Navbar />

                <div className="profile-error">

                    <div className="profile-error-card">

                        <div className="profile-error-icon">
                            <i className="bi bi-person-x"></i>
                        </div>

                        <h3>
                            Unable to load profile
                        </h3>

                        <button
                            className="profile-btn profile-btn-primary"
                            onClick={getProfile}
                        >
                            Try Again
                        </button>

                    </div>

                </div>
            </>
        );

    }

    return (

        <>
            <Navbar />

            <div className="container profile-page">

                <div className="profile-heading">

                    <h1>
                        👤 My Profile
                    </h1>

                    <p>
                        Manage your personal information and resume.
                    </p>

                </div>


                <div className="profile-layout">

                    {/* Profile Card */}

                    <div className="profile-sidebar">

                        <div className="card profile-card">

                            <div className="profile-card-body">

                                {user.profile_image ? (

                                    <img
                                        src={user.profile_image}
                                        alt="Profile"
                                        className="profile-image"
                                    />

                                ) : (

                                    <div className="profile-image-placeholder">

                                        <i className="bi bi-person-fill"></i>

                                    </div>

                                )}

                                <h3 className="profile-name">
                                    {user.full_name}
                                </h3>

                                <p className="profile-email">
                                    {user.email}
                                </p>

                                <span className="profile-role">
                                    {user.role}
                                </span>

                                <div className="profile-edit-wrapper">

                                    <button
                                        className="profile-btn profile-btn-primary"
                                        onClick={() =>
                                            navigate(
                                                "/jobseeker/profile/edit"
                                            )
                                        }
                                    >
                                        <i className="bi bi-pencil"></i>
                                        Edit Profile
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Profile Content */}

                    <div className="profile-content">

                        {/* Personal Information */}

                        <div className="card profile-card">

                            <div className="profile-info-body">

                                <div className="profile-info-header">

                                    <div>

                                        <h3>
                                            Personal Information
                                        </h3>

                                        <p>
                                            Your professional details
                                        </p>

                                    </div>

                                    <i className="bi bi-person-vcard profile-info-icon"></i>

                                </div>

                                <hr />

                                <div className="profile-info-grid">

                                    <div className="profile-info-item">

                                        <small>
                                            <i className="bi bi-telephone"></i>
                                            Phone
                                        </small>

                                        <p>
                                            {user.phone || "Not Added"}
                                        </p>

                                    </div>


                                    <div className="profile-info-item">

                                        <small>
                                            <i className="bi bi-geo-alt"></i>
                                            Location
                                        </small>

                                        <p>
                                            {user.location || "Not Added"}
                                        </p>

                                    </div>


                                    <div className="profile-info-item">

                                        <small>
                                            <i className="bi bi-tools"></i>
                                            Skills
                                        </small>

                                        <p>
                                            {user.skills || "Not Added"}
                                        </p>

                                    </div>


                                    <div className="profile-info-item">

                                        <small>
                                            <i className="bi bi-briefcase"></i>
                                            Experience
                                        </small>

                                        <p>
                                            {user.experience || "Not Added"}
                                        </p>

                                    </div>


                                    <div className="profile-info-item profile-info-full">

                                        <small>
                                            <i className="bi bi-mortarboard"></i>
                                            Education
                                        </small>

                                        <p>
                                            {user.education || "Not Added"}
                                        </p>

                                    </div>

                                </div>

                                <hr />

                                {/* Resume */}

                                <div className="profile-resume">

                                    <h5>
                                        Resume
                                    </h5>

                                    {user.resume_url ? (

                                        <div className="profile-resume-actions">

                                            <a
                                                href={user.resume_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="profile-btn profile-btn-success"
                                            >
                                                <i className="bi bi-file-earmark-pdf"></i>
                                                View Resume
                                            </a>

                                        </div>

                                    ) : (

                                        <div className="profile-resume-empty">

                                            <i className="bi bi-info-circle"></i>

                                            <span>
                                                No resume uploaded yet.
                                            </span>

                                        </div>

                                    )}

                                </div>


                                {/* Mobile Edit Button */}

                                <div className="profile-mobile-edit">

                                    <button
                                        className="profile-btn profile-btn-primary"
                                        onClick={() =>
                                            navigate(
                                                "/jobseeker/profile/edit"
                                            )
                                        }
                                    >
                                        <i className="bi bi-pencil"></i>
                                        Edit Profile
                                    </button>

                                </div>

                            </div>

                        </div>


                        {/* =================================
                            Education
                        ================================= */}

                        <Educations />


                        {/* =================================
                            Experience
                        ================================= */}

                        <Experiences />


                        {/* =================================
                            Projects
                        ================================= */}

                        <Projects />

                    </div>

                </div>

            </div>
        </>
    );

}