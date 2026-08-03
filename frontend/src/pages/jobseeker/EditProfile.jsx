import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-toastify";


function EditProfile() {
    const navigate = useNavigate();

    const [resume, setResume] = useState(null);

    const [profileImage, setProfileImage] = useState(null);

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        full_name: "",
        phone: "",
        location: "",
        skills: "",
        experience: "",
        education: "",
    })
    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        try {
            const response = await api.get("/users/me")

            setFormData({
                full_name: response.data.full_name || "",
                phone: response.data.phone || "",
                location: response.data.location || "",
                skills: response.data.skills || "",
                experience: response.data.experience || "",
                education: response.data.education || "",

            })

        }
        catch (error) {
            console.log(error)
        }
    }

    const uploadResume = async () => {

        if (!resume) return;

        const formData = new FormData();

        formData.append("file", resume);

        try {

            await api.post("/users/resume", formData);

            toast.info("Resume uploaded successfully");

        } catch (error) {

            console.log(error);

            toast.warning("Resume upload failed");

        }

    };

    const uploadProfileImage = async () => {

        if (!profileImage) return;

        const formData = new FormData();

        formData.append("file", profileImage);

        try {

            await api.post("/users/profile-image", formData);

            toast.info("Profile image uploaded successfully");

        } catch (error) {

            console.log(error);

            toast.warning("Profile image upload failed");

        }

    };


    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true)

        try {

            const data = new FormData();

            data.append("full_name", formData.full_name);
            data.append("phone", formData.phone);
            data.append("location", formData.location);
            data.append("skills", formData.skills);
            data.append("experience", formData.experience);
            data.append("education", formData.education);

            if (resume) {
                data.append("resume", formData.resume);
                 await uploadResume();
            }

            if (profileImage) {
                data.append("profile_image", formData.profile_image);
                await uploadProfileImage();
            }

            try {
                await api.put("/users/me", data);
            } catch (error) {
                console.log(error.response?.data);
                console.log(error.response?.status);
            }

            toast.success("Profile updated successfully");

            navigate("/jobseeker/profile");

        } catch (error) {

            console.log(error);

            toast.error("Update failed");

        }
        finally {
            setLoading(false)
        }

    };

    return (

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-header">
                    <h2>Edit Profile</h2>
                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label>Full Name</label>
                            <input
                                className="form-control"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Phone</label>
                            <input
                                className="form-control"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Location</label>
                            <input
                                className="form-control"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Skills</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Experience</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Education</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                name="education"
                                value={formData.education}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Resume (PDF/DOCX)
                            </label>

                            <input
                                type="file"
                                className="form-control"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => setResume(e.target.files[0])}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Profile Image
                            </label>

                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={(e) => setProfileImage(e.target.files[0])}
                            />
                        </div>

                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={loading}
                        >
                            {
                                loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"
                                            role="status">
                                        </span>
                                        Updating...
                                    </>
                                ) : (
                                    "Save Changes"
                                )
                            }
                            
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}
export default EditProfile;