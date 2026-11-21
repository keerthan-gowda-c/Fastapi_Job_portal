import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../api/axios";
import { toast } from "react-toastify";
import Navbar from "../../../../components/layout/Navbar";
import "./EditProfile.css";

function Field({ id, label, hint, full, children }) {
    return (
        <div className={`ep-field${full ? " ep-field--full" : ""}`}>
            <label htmlFor={id}>{label}</label>
            {children}
            {hint && <span className="ep-hint">{hint}</span>}
        </div>
    );
}

function Card({ icon, title, hint, children }) {
    return (
        <section className="ep-card">
            <div className="ep-card__head">
                <span className="ep-card__icon">
                    <i className={`bi ${icon}`} />
                </span>
                <div>
                    <h2>{title}</h2>
                    <p>{hint}</p>
                </div>
            </div>
            {children}
        </section>
    );
}

export default function EditProfile() {
    const navigate = useNavigate();

    const [resume, setResume] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [profilePreview, setProfilePreview] = useState("");
    const [currentImage, setCurrentImage] = useState("");
    const [currentResume, setCurrentResume] = useState("");

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [fetchError, setFetchError] = useState(false);

    const [formData, setFormData] = useState({
        full_name: "",
        phone: "",
        location: "",
        skills: "",
        bio: "",
    });

    const fetchProfile = useCallback(async () => {
        setFetching(true);
        setFetchError(false);

        try {
            const [userResponse, candidateResponse] = await Promise.all([
                api.get("/users/me"),
                api.get("/candidates/me"),
            ]);

            const user = userResponse.data;
            const candidate = candidateResponse.data;

            setFormData({
                full_name: user.full_name || "",
                phone: user.phone || "",
                location: user.location || "",
                skills: candidate.skills || "",
                bio: candidate.bio || "",
            });

            setCurrentImage(user.profile_image || "");
            setCurrentResume(candidate.resume_url || "");
        } catch (error) {
            console.error("Profile fetch error:", error.response?.data || error);
            setFetchError(true);
            toast.error(error.response?.data?.detail || "Failed to load profile. Please try again.");
        } finally {
            setFetching(false);
        }
    }, []);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    useEffect(() => {
        return () => {
            if (profilePreview) {
                URL.revokeObjectURL(profilePreview);
            }
        };
    }, [profilePreview]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleResumeChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== "application/pdf" || !file.name.toLowerCase().endsWith(".pdf")) {
            toast.error("Only PDF resumes are allowed.");
            e.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Resume size must be less than 5 MB.");
            e.target.value = "";
            return;
        }

        setResume(file);
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = ["image/jpeg", "image/png"];

        if (!allowedTypes.includes(file.type)) {
            toast.error("Only JPG, JPEG and PNG images are allowed.");
            e.target.value = "";
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error("Image size must be less than 2 MB.");
            e.target.value = "";
            return;
        }

        setProfileImage(file);
        setProfilePreview(URL.createObjectURL(file));
    };

    const uploadResume = async () => {
        if (!resume) return;
        const data = new FormData();
        data.append("file", resume);
        await api.post("/candidates/me/resume", data);
    };

    const uploadProfileImage = async () => {
        if (!profileImage) return;
        const data = new FormData();
        data.append("file", profileImage);
        await api.post("/users/profile-image", data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        try {
            await api.patch("/users/me", {
                full_name: formData.full_name.trim(),
                phone: formData.phone.trim() || null,
                location: formData.location.trim() || null,
            });

            await api.patch("/candidates/me", {
                skills: formData.skills.trim() || null,
                bio: formData.bio.trim() || null,
            });

            await uploadResume();
            await uploadProfileImage();

            toast.success("Profile updated successfully");
            navigate("/jobseeker/profile");
        } catch (error) {
            console.error("Profile update error:", error.response?.data || error);
            toast.error(error.response?.data?.detail || "Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <>
                <Navbar />
                <main className="ep">
                    <div className="ep-skel" style={{ height: 110 }} />
                    <div className="ep-layout">
                        <div className="ep-skel" style={{ height: 520 }} />
                        <div className="ep-skel" style={{ height: 320 }} />
                    </div>
                </main>
            </>
        );
    }

    if (fetchError) {
        return (
            <>
                <Navbar />
                <main className="ep">
                    <div className="ep-card ep-empty">
                        <i className="bi bi-exclamation-circle" />
                        <h2>Couldn't load your profile</h2>
                        <p>Check your connection and try again.</p>
                        <button type="button" className="ep-btn ep-btn--violet" onClick={fetchProfile}>
                            <i className="bi bi-arrow-clockwise" /> Try again
                        </button>
                    </div>
                </main>
            </>
        );
    }

    const photo = profilePreview || currentImage;
    const skillList = formData.skills.split(",").map((s) => s.trim()).filter(Boolean);

    const checks = [
        { label: "Profile photo", done: Boolean(photo) },
        { label: "Phone number", done: Boolean(formData.phone.trim()) },
        { label: "Location", done: Boolean(formData.location.trim()) },
        { label: "Skills", done: skillList.length > 0 },
        { label: "About", done: Boolean(formData.bio.trim()) },
        { label: "Resume", done: Boolean(resume || currentResume) },
    ];
    const score = Math.round((checks.filter((c) => c.done).length / checks.length) * 100);

    return (
        <>
            <Navbar />

            <main className="ep">
                <section className="ep-hero">
                    <h1>Edit your profile</h1>
                    <p>Keep your details current so employers can see your skills and experience at a glance.</p>
                </section>

                <div className="ep-layout">
                    <form className="ep-form" onSubmit={handleSubmit}>
                        <Card icon="bi-person" title="Personal information" hint="Basic details about you">
                            <div className="ep-grid">
                                <Field id="full_name" label="Full name">
                                    <input id="full_name" type="text" name="full_name" value={formData.full_name}
                                        onChange={handleChange} placeholder="Your full name" required />
                                </Field>

                                <Field id="phone" label="Phone">
                                    <input id="phone" type="text" name="phone" value={formData.phone}
                                        onChange={handleChange} placeholder="Your phone number" />
                                </Field>

                                <Field id="location" label="Location" full>
                                    <div className="ep-input-icon">
                                        <i className="bi bi-geo-alt" />
                                        <input id="location" type="text" name="location" value={formData.location}
                                            onChange={handleChange} placeholder="City, State" />
                                    </div>
                                </Field>
                            </div>
                        </Card>

                        <Card icon="bi-person-workspace" title="Professional information" hint="Your skills and introduction">
                            <div className="ep-grid">
                                <Field id="skills" label="Skills" hint="Separate multiple skills with commas." full>
                                    <textarea id="skills" name="skills" rows="3" value={formData.skills}
                                        onChange={handleChange} placeholder="Python, FastAPI, Django, React, PostgreSQL..." />
                                </Field>

                                <Field id="bio" label="About" full>
                                    <textarea id="bio" name="bio" rows="5" value={formData.bio}
                                        onChange={handleChange} placeholder="Write a short professional introduction..." />
                                </Field>
                            </div>
                        </Card>

                        <Card icon="bi-cloud-arrow-up" title="Resume and photo" hint="Upload new files to replace the current ones">
                            <div className="ep-upload-grid">
                                <div className="ep-upload">
                                    <h3>Resume</h3>
                                    <p>PDF only, maximum 5 MB</p>

                                    {currentResume && (
                                        <a href={currentResume} target="_blank" rel="noopener noreferrer" className="ep-current-file">
                                            <i className="bi bi-file-earmark-pdf" /> View current resume
                                        </a>
                                    )}

                                    <label className="ep-file">
                                        <i className="bi bi-upload" />
                                        <span>{resume ? resume.name : "Choose resume"}</span>
                                        <input type="file" accept=".pdf,application/pdf" onChange={handleResumeChange} />
                                    </label>
                                </div>

                                <div className="ep-upload">
                                    <h3>Profile image</h3>
                                    <p>JPG or PNG, maximum 2 MB</p>

                                    {photo && (
                                        <div className="ep-image-preview">
                                            <img src={photo} alt="Profile preview" />
                                        </div>
                                    )}

                                    <label className="ep-file">
                                        <i className="bi bi-upload" />
                                        <span>{profileImage ? profileImage.name : "Choose image"}</span>
                                        <input type="file" accept=".jpg,.jpeg,.png,image/jpeg,image/png" onChange={handleImageChange} />
                                    </label>
                                </div>
                            </div>
                        </Card>

                        <div className="ep-actions">
                            <button type="button" className="ep-btn ep-btn--ghost" disabled={loading}
                                onClick={() => navigate("/jobseeker/profile")}>
                                Cancel
                            </button>

                            <button type="submit" className="ep-btn ep-btn--violet" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm" role="status" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save changes"
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Live preview */}
                    <aside className="ep-side">
                        <section className="ep-card">
                            <h2 className="ep-side__title">Live preview</h2>

                            <div className="ep-preview">
                                <div className="ep-avatar">
                                    {photo ? <img src={photo} alt="" /> : <i className="bi bi-person" />}
                                </div>
                                <strong>{formData.full_name || "Your name"}</strong>
                                <span>{formData.location || "Location not added"}</span>
                            </div>

                            {skillList.length > 0 && (
                                <div className="ep-skills">
                                    {skillList.slice(0, 8).map((s, i) => (
                                        <span key={i}>{s}</span>
                                    ))}
                                    {skillList.length > 8 && <span>+{skillList.length - 8}</span>}
                                </div>
                            )}
                        </section>

                        <section className="ep-card">
                            <h2 className="ep-side__title">Profile strength</h2>
                            <div className="ep-strength">
                                <div className="ep-ring" style={{ "--p": score }}>
                                    <strong>{score}%</strong>
                                </div>
                                <p>{score === 100 ? "Looking complete." : "Fill in the missing items to stand out."}</p>
                            </div>
                            <ul className="ep-checks">
                                {checks.map((c) => (
                                    <li key={c.label} className={c.done ? "is-done" : ""}>
                                        <i className={`bi ${c.done ? "bi-check-circle-fill" : "bi-circle"}`} />
                                        {c.label}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </aside>
                </div>
            </main>
        </>
    );
}