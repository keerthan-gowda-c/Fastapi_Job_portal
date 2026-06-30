import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";

function Profile() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        getProfile();

    }, []);

    const getProfile = async () => {

        try {

            const response = await api.get("/users/me");

            setUser(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed to load profile");

        }

    };

    if (!user) {

        return (
            <>
                <Navbar />
                <div className="container mt-5">
                    Loading...
                </div>
            </>

        );

    }

    return (
        <>

            <Navbar />


            <div className="container mt-5">

                <div className="card shadow">

                    <div className="card-header">

                        <h2>My Profile</h2>

                    </div>

                    <div className="card-body">

                        <div className="mb-3">
                            <strong>Name</strong>
                            <p>{user.full_name}</p>
                        </div>

                        <div className="mb-3">
                            <strong>Email</strong>
                            <p>{user.email}</p>
                        </div>

                        <div className="mb-3">
                            <strong>Role</strong>
                            <p>{user.role}</p>
                        </div>

                        <div className="mb-3">
                            <strong>Phone</strong>
                            <p>{user.phone || "Not Added"}</p>
                        </div>

                        <div className="mb-3">
                            <strong>Location</strong>
                            <p>{user.location || "Not Added"}</p>
                        </div>

                        <div className="mb-3">
                            <strong>Skills</strong>
                            <p>{user.skills || "Not Added"}</p>
                        </div>

                        <div className="mb-3">
                            <strong>Experience</strong>
                            <p>{user.experience || "Not Added"}</p>
                        </div>

                        <div className="mb-3">
                            <strong>Education</strong>
                            <p>{user.education || "Not Added"}</p>
                        </div>

                        <div className="mb-3">
                            <strong>Resume</strong>

                            {user.resume_url ? (
                                <a
                                    href={`http://127.0.0.1:8000/${user.resume_url}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    View Resume
                                </a>
                            ) : (
                                <p>Not Added</p>
                            )}
                        </div>

                        <div className="mb-3">
                            <strong>Profile Image</strong>

                            {user.profile_image ? (
                                <img
                                    src={`http://127.0.0.1:8000/${user.profile_image}`}
                                    alt="Profile"
                                    width="150"
                                    className="rounded-circle"
                                />
                            ) : (
                                <p>Not Added</p>
                            )}
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={() => navigate("/jobseeker/profile/edit")}
                        >
                            Edit Profile
                        </button>

                    </div>

                </div>

            </div>
        </>


    );

}

export default Profile;