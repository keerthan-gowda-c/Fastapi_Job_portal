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

        <div className="container py-5">

            <div className="text-center mb-5">

                <h1 className="fw-bold">
                    👤 My Profile
                </h1>

                <p className="text-muted fs-5">
                    Manage your personal information and resume.
                </p>

            </div>

            <div className="row g-4">

                {/* Left Profile Card */}

                <div className="col-lg-4">

                    <div className="card border-0 shadow rounded-4">

                        <div className="card-body text-center p-5">

                            {user.profile_image ? (

                                <img
                                    src={`http://127.0.0.1:8000/${user.profile_image}`}
                                    alt="Profile"
                                    className="rounded-circle shadow mb-4"
                                    style={{
                                        width: "180px",
                                        height: "180px",
                                        objectFit: "cover"
                                    }}
                                />

                            ) : (

                                <div
                                    className="rounded-circle bg-light d-flex justify-content-center align-items-center mx-auto mb-4"
                                    style={{
                                        width: "180px",
                                        height: "180px"
                                    }}
                                >

                                    <i
                                        className="bi bi-person-fill text-secondary"
                                        style={{ fontSize: "80px" }}
                                    ></i>

                                </div>

                            )}

                            <h3 className="fw-bold">

                                {user.full_name}

                            </h3>

                            <p className="text-muted">

                                {user.email}

                            </p>

                            <span className="badge bg-primary text-capitalize fs-6">

                                {user.role}

                            </span>

                        </div>

                    </div>

                </div>

                {/* Right Information */}

                <div className="col-lg-8">

                    <div className="card border-0 shadow rounded-4">

                        <div className="card-body p-5">

                            <div className="row">

                                <div className="col-md-6 mb-4">

                                    <h6 className="text-muted">

                                        Phone

                                    </h6>

                                    <p className="fw-semibold">

                                        {user.phone || "Not Added"}

                                    </p>

                                </div>

                                <div className="col-md-6 mb-4">

                                    <h6 className="text-muted">

                                        Location

                                    </h6>

                                    <p className="fw-semibold">

                                        {user.location || "Not Added"}

                                    </p>

                                </div>

                                <div className="col-md-6 mb-4">

                                    <h6 className="text-muted">

                                        Skills

                                    </h6>

                                    <p className="fw-semibold">

                                        {user.skills || "Not Added"}

                                    </p>

                                </div>

                                <div className="col-md-6 mb-4">

                                    <h6 className="text-muted">

                                        Experience

                                    </h6>

                                    <p className="fw-semibold">

                                        {user.experience || "Not Added"}

                                    </p>

                                </div>

                                <div className="col-12 mb-4">

                                    <h6 className="text-muted">

                                        Education

                                    </h6>

                                    <p className="fw-semibold">

                                        {user.education || "Not Added"}

                                    </p>

                                </div>

                            </div>

                            <hr />

                            <div className="d-flex flex-wrap gap-3">

                                {user.resume_url ? (

                                    <a
                                        href={`http://127.0.0.1:8000/${user.resume_url}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-success rounded-pill px-4"
                                    >

                                        📄 View Resume

                                    </a>

                                ) : (

                                    <button
                                        className="btn btn-outline-secondary rounded-pill"
                                        disabled
                                    >

                                        No Resume Uploaded

                                    </button>

                                )}

                                <button
                                    className="btn btn-primary rounded-pill px-4"
                                    onClick={() =>
                                        navigate("/jobseeker/profile/edit")
                                    }
                                >

                                    ✏️ Edit Profile

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </>
);

}

export default Profile;