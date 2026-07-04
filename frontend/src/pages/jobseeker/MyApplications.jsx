import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";

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
            alert("Failed to load applications")
        }
    }

    const withdrawApplication = async (applicationId) => {
        const confirmWithdraw = window.confirm(
            "Are you sure you want to withdraw this application?"
        )
        if (!confirmWithdraw) return;

        try {
            await api.patch(`/applications/${applicationId}/withdraw`)

            alert("Application withdrawn successfully")
            fetchApplications();
        }
        catch (error) {
            console.log(error)
            alert(error.response?.data?.detail || "Failed to withdraw application.")
        }
    }
    const applyAgain = async (jobId) => {

        try {

            await api.post(`/applications/jobs/${jobId}`);

            alert("Application submitted successfully");

            fetchApplications();

        } catch (error) {

            console.log(error);

            alert(
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
            alert(error.response?.data?.detail || "Delete failed")
        }
    }

    return (
        <>
            <Navbar />

            <div className="container mt-4">
                <h2>My Applications</h2>
                {
                    applications.length === 0 ? (
                        <div className="alert alert-info">
                            You haven't applied for any jobs yet.
                        </div>
                    ) : (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Job</th>
                                    <th>Status</th>
                                    <th>Applied On</th>
                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((application) => (
                                    <tr key={application.id}>

                                        <td>{application.job.title}</td>

                                        <td>
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
                                        </td>

                                        <td>
                                            {new Date(
                                                application.applied_at
                                            ).toLocaleDateString()}
                                        </td>

                                        <td>

                                            {application.status === "pending" && (
                                                <button
                                                    className="btn btn-danger btn-sm"
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
                                                    <span className="badge bg-secondary">
                                                        No Action
                                                    </span>
                                                )}

                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                }
            </div>
        </>
    )
}

export default MyApplications;