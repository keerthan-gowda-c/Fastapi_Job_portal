import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../api/axios";
import { toast } from "react-toastify";
import Navbar from "../../../../components/layout/Navbar";
import "./EditProfile.css";

export default function EditProfile() {

    const navigate = useNavigate();

    const [resume, setResume] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const [formData, setFormData] = useState({
        full_name: "",
        phone: "",
        location: "",
        skills: "",
        experience: "",
        education: "",
    });


    useEffect(() => {

        fetchProfile();

    }, []);


    const fetchProfile = async () => {

        try {

            const response = await api.get("/users/me");

            setFormData({
                full_name: response.data.full_name || "",
                phone: response.data.phone || "",
                location: response.data.location || "",
                skills: response.data.skills || "",
                experience: response.data.experience || "",
                education: response.data.education || "",
            });

        }
        catch (error) {

            console.error(error);

            toast.warning(
                error.response?.data?.detail ||
                "Failed to load profile"
            );

        }
        finally {

            setFetching(false);

        }

    };


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const uploadResume = async () => {

        if (!resume) return;

        const data = new FormData();

        data.append("file", resume);

        await api.post("/users/resume", data);

    };


    const uploadProfileImage = async () => {

        if (!profileImage) return;

        const data = new FormData();

        data.append("file", profileImage);

        await api.post("/users/profile-image", data);

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const data = new FormData();

            data.append("full_name", formData.full_name);
            data.append("phone", formData.phone);
            data.append("location", formData.location);
            data.append("skills", formData.skills);
            data.append("experience", formData.experience);
            data.append("education", formData.education);

            await api.put("/users/me", data);


            if (resume) {

                await uploadResume();

            }


            if (profileImage) {

                await uploadProfileImage();

            }


            toast.success("Profile updated successfully");

            navigate("/jobseeker/profile");

        }
        catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.detail ||
                "Failed to update profile"
            );

        }
        finally {

            setLoading(false);

        }

    };


    if (fetching) {

        return (

            <>

                <Navbar />

                <div className="ep-loading">

                    <div className="ep-loading__inner">

                        <div className="spinner-border"></div>

                        <p>
                            Loading profile...
                        </p>

                    </div>

                </div>

            </>

        );

    }


    return (

        <>

            <Navbar />

            <main className="ep-page">

                {/* Header */}

                <section className="ep-header">

                    <div>

                        <span className="ep-badge">
                            Profile Settings
                        </span>

                        <h1 className="ep-heading">
                            Edit your profile
                        </h1>

                        <p className="ep-lead">
                            Keep your professional information updated
                            so employers can better understand your
                            experience and skills.
                        </p>

                    </div>

                    <div className="ep-header__icon">

                        <i className="bi bi-person-gear"></i>

                    </div>

                </section>


                {/* Form */}

                <section className="ep-content">

                    <form
                        className="ep-form"
                        onSubmit={handleSubmit}
                    >

                        {/* Personal Information */}

                        <div className="ep-section">

                            <div className="ep-section__heading">

                                <span className="ep-section__number">
                                    01
                                </span>

                                <div>

                                    <h2>
                                        Personal Information
                                    </h2>

                                    <p>
                                        Basic details about you
                                    </p>

                                </div>

                            </div>


                            <div className="ep-grid ep-grid--two">

                                <div className="ep-field">

                                    <label>
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        placeholder="Your full name"
                                        required
                                    />

                                </div>


                                <div className="ep-field">

                                    <label>
                                        Phone
                                    </label>

                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Your phone number"
                                    />

                                </div>


                                <div className="ep-field ep-field--full">

                                    <label>
                                        Location
                                    </label>

                                    <div className="ep-input-icon">

                                        <i className="bi bi-geo-alt"></i>

                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            placeholder="City, State"
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Professional Information */}

                        <div className="ep-section">

                            <div className="ep-section__heading">

                                <span className="ep-section__number">
                                    02
                                </span>

                                <div>

                                    <h2>
                                        Professional Information
                                    </h2>

                                    <p>
                                        Highlight your skills and experience
                                    </p>

                                </div>

                            </div>


                            <div className="ep-grid">

                                <div className="ep-field">

                                    <label>
                                        Skills
                                    </label>

                                    <textarea
                                        name="skills"
                                        rows="3"
                                        value={formData.skills}
                                        onChange={handleChange}
                                        placeholder="Python, FastAPI, Django, React, PostgreSQL..."
                                    />

                                    <span className="ep-hint">
                                        Separate multiple skills with commas.
                                    </span>

                                </div>


                                <div className="ep-field">

                                    <label>
                                        Experience
                                    </label>

                                    <textarea
                                        name="experience"
                                        rows="4"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        placeholder="Describe your previous work experience..."
                                    />

                                </div>


                                <div className="ep-field">

                                    <label>
                                        Education
                                    </label>

                                    <textarea
                                        name="education"
                                        rows="3"
                                        value={formData.education}
                                        onChange={handleChange}
                                        placeholder="Degree, institution, graduation year..."
                                    />

                                </div>

                            </div>

                        </div>


                        {/* Documents */}

                        <div className="ep-section">

                            <div className="ep-section__heading">

                                <span className="ep-section__number">
                                    03
                                </span>

                                <div>

                                    <h2>
                                        Documents & Photo
                                    </h2>

                                    <p>
                                        Add your resume and profile image
                                    </p>

                                </div>

                            </div>


                            <div className="ep-upload-grid">

                                {/* Resume */}

                                <div className="ep-upload">

                                    <div className="ep-upload__top">

                                        <div className="ep-upload__icon">
                                            <i className="bi bi-file-earmark-text"></i>
                                        </div>

                                        <div>

                                            <h3>
                                                Resume
                                            </h3>

                                            <p>
                                                PDF, DOC or DOCX
                                            </p>

                                        </div>

                                    </div>


                                    <label className="ep-file">

                                        <i className="bi bi-upload"></i>

                                        <span>
                                            {resume
                                                ? resume.name
                                                : "Choose resume"
                                            }
                                        </span>

                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) =>
                                                setResume(
                                                    e.target.files?.[0] || null
                                                )
                                            }
                                        />

                                    </label>

                                </div>


                                {/* Profile Image */}

                                <div className="ep-upload">

                                    <div className="ep-upload__top">

                                        <div className="ep-upload__icon">

                                            <i className="bi bi-person"></i>

                                        </div>

                                        <div>

                                            <h3>
                                                Profile Image
                                            </h3>

                                            <p>
                                                JPG, PNG or other image
                                            </p>

                                        </div>

                                    </div>


                                    <label className="ep-file">

                                        <i className="bi bi-upload"></i>

                                        <span>
                                            {profileImage
                                                ? profileImage.name
                                                : "Choose image"
                                            }
                                        </span>

                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setProfileImage(
                                                    e.target.files?.[0] || null
                                                )
                                            }
                                        />

                                    </label>

                                </div>

                            </div>

                        </div>


                        {/* Actions */}

                        <div className="ep-actions">

                            <button
                                type="button"
                                className="ep-btn ep-btn--ghost"
                                disabled={loading}
                                onClick={() =>
                                    navigate("/jobseeker/profile")
                                }
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                className="ep-btn ep-btn--primary"
                                disabled={loading}
                            >

                                {loading ? (

                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm"
                                            role="status"
                                        />

                                        Updating...
                                    </>

                                ) : (

                                    <>
                                        Save Changes
                                        <i className="bi bi-arrow-right"></i>
                                    </>

                                )}

                            </button>

                        </div>

                    </form>

                </section>

            </main>

        </>

    );

}