import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";

function MyApplications() {

    const [applications, setApplications] = useState([])

    useEffect(() => {
        fetchApplications()
    }, [])

    const fetchApplications = async () => {
        try {
            const response = await api.get("/applications/me")
            setApplications(response.data)
        }
        catch (error) {
            console.log(error)
            toast.warning("Failed to load applications")
        }
    }

    const withdrawApplication = async (applicationId) => {
        const confirmWithdraw = window.confirm(
            "Are you sure you want to withdraw this application?"
        )
        if (!confirmWithdraw) return;

        try {
            await api.patch(`/applications/${applicationId}/withdraw`)

            toast.info("Application withdrawn successfully")
            fetchApplications();
        }
        catch (error) {
            console.log(error)
            toast.warning(error.response?.data?.detail || "Failed to withdraw application.")
        }
    }
    const applyAgain = async (jobId) => {

        try {

            await api.post(`/applications/jobs/${jobId}`);

            toast.success("Application submitted successfully");

            fetchApplications();

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.detail ||
                "Failed to apply"
            );

        }

    };

    const deleteApplication = async (applicationId) => {
        try {
            await api.patch(`/applications/${applicationId}/delete`)
            fetchApplications()
        }
        catch (error) {
            console.log(error)
            toast.warning(error.response?.data?.detail || "Delete failed")
        }
    }

    return (

    <>
        <Navbar />

        <div className="container py-5">

            <div className="text-center mb-5">

                <h1 className="fw-bold">

                    📄 My Applications

                </h1>

                <p className="text-muted fs-5">

                    Track the status of every job you've applied for.

                </p>

            </div>

            {applications.length === 0 ? (

                <div className="card border-0 shadow rounded-4">

                    <div className="card-body text-center py-5">

                        <h3>

                            No Applications Yet

                        </h3>

                        <p className="text-muted">

                            Start applying for jobs to see them here.

                        </p>

                    </div>

                </div>

            ) : (

                <div className="row">

    {applications.map((application) => (

        <div
            className="col-12 mb-3"
            key={application.id}
        >

            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center">

                        <div>

                            <h5 className="fw-bold mb-1">

                                {application.job.title}

                            </h5>

                            <small className="text-muted">

                                Applied on{" "}
                                {new Date(
                                    application.applied_at
                                ).toLocaleDateString()}

                            </small>

                        </div>

                        <span
                            className={
                                application.status === "pending"
                                    ? "badge bg-warning text-dark"
                                    : application.status === "withdrawn"
                                        ? "badge bg-danger"
                                        : application.status === "reviewed"
                                            ? "badge bg-info"
                                            : application.status === "shortlisted"
                                                ? "badge bg-primary"
                                                : application.status === "hired"
                                                    ? "badge bg-success"
                                                    : "badge bg-secondary"
                            }
                        >
                            {application.status}
                        </span>

                    </div>

                    <hr />

                    <div className="d-flex justify-content-end">

                        {application.status === "pending" && (

                            <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() =>
                                    withdrawApplication(application.id)
                                }
                            >
                                Withdraw
                            </button>

                        )}

                        {application.status === "withdrawn" && (

                            <>
                                <button
                                    className="btn btn-success btn-sm me-2"
                                    onClick={() =>
                                        applyAgain(application.job.id)
                                    }
                                >
                                    Apply Again
                                </button>

                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() =>
                                        deleteApplication(application.id)
                                    }
                                >
                                    Delete
                                </button>
                            </>

                        )}

                        {application.status !== "pending" &&
                            application.status !== "withdrawn" && (

                                <small className="text-muted">

                                    No actions available

                                </small>

                            )}

                    </div>

                </div>

            </div>

        </div>

    ))}

</div>

            )}

        </div>

    </>

);
}

export default MyApplications;