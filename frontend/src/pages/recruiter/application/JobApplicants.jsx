
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/axios";
import Navbar from "../../../components/layout/Navbar";
import "./JobApplicants.css";
import { toast } from "react-toastify";

export default function JobApplicants() {

    const { jobId } = useParams();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {

        fetchApplicants();

    }, [jobId]);

    const fetchApplicants = async () => {

        try {

            const response = await api.get(
                `/applications/job/${jobId}`
            );

            setApplications(response.data);

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.detail ||
                "Failed to load applications"
            );

        } finally {

            setLoading(false);

        }
    };

    const updateStatus = async (applicationId, status) => {

        setUpdatingId(applicationId);

        try {

            await api.patch(
                `/applications/${applicationId}/status`,
                {
                    status
                }
            );

            setApplications((prevApplications) =>
                prevApplications.map((application) =>
                    application.id === applicationId
                        ? {
                            ...application,
                            status
                        }
                        : application
                )
            );

            toast.success("Application status updated");

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.detail ||
                "Failed to update status"
            );

        } finally {

            setUpdatingId(null);

        }
    };

    const badgeColor = (status) => {

        switch (status) {

            case "pending":
                return "warning";

            case "reviewed":
                return "info";

            case "shortlisted":
                return "primary";

            case "hired":
                return "success";

            case "rejected":
                return "danger";

            default:
                return "secondary";
        }
    };

    const formatStatus = (status) => {

        if (!status) return "Unknown";

        return status
            .replaceAll("_", " ")
            .replace(/\b\w/g, (char) =>
                char.toUpperCase()
            );
    };

    const getResumeUrl = (resumeUrl) => {

        if (!resumeUrl) return null;

        if (
            resumeUrl.startsWith("http://") ||
            resumeUrl.startsWith("https://")
        ) {
            return resumeUrl;
        }

        const baseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

        return `${baseUrl}/${resumeUrl.replace(/^\//, "")}`;
    };

    if (loading) {

        return (
            <>
                <Navbar />

                <div className="d-flex justify-content-center align-items-center vh-100">

                    <div className="text-center">

                        <div className="spinner-border text-primary"></div>

                        <p className="mt-3 text-muted">
                            Loading applicants...
                        </p>

                    </div>

                </div>
            </>
        );

    }

    return (
        <>
            <Navbar />

            <div className="applicants-bg">

                <div className="container py-5">

                    <div className="card border-0 shadow-lg applicants-card">

                        <div className="card-body p-4">

                            {/* Header */}

                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <div>

                                    <h2 className="fw-bold mb-1">
                                        Job Applicants
                                    </h2>

                                    <p className="text-muted mb-0">
                                        {applications.length} candidate(s) applied
                                    </p>

                                </div>

                            </div>

                            {/* Empty State */}

                            {applications.length === 0 ? (

                                <div className="text-center py-5">

                                    <div className="display-4 mb-3">
                                        👥
                                    </div>

                                    <h4 className="fw-bold">
                                        No Applicants Yet
                                    </h4>

                                    <p className="text-muted">
                                        Applications will appear here once
                                        candidates apply for this job.
                                    </p>

                                </div>

                            ) : (

                                <div className="table-responsive">

                                    <table className="table align-middle">

                                        <thead className="table-light">

                                            <tr>

                                                <th>Candidate</th>

                                                <th>Email</th>

                                                <th>Status</th>

                                                <th>Applied On</th>

                                                <th>Resume</th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {applications.map((application) => {

                                                const resumeUrl =
                                                    getResumeUrl(
                                                        application.user?.candidate?.resume_url
                                                    );

                                                return (

                                                    <tr key={application.id}>

                                                        {/* Candidate */}

                                                        <td>

                                                            <strong>
                                                                {application.user?.full_name ||
                                                                    "Unknown Candidate"}
                                                            </strong>

                                                        </td>

                                                        {/* Email */}

                                                        <td>

                                                            {application.user?.email ||
                                                                "Not available"}

                                                        </td>

                                                        {/* Status */}

                                                        <td>

                                                            <div className="d-flex align-items-center gap-2">

                                                                <span
                                                                    className={`badge bg-${badgeColor(
                                                                        application.status
                                                                    )}`}
                                                                >
                                                                    {formatStatus(
                                                                        application.status
                                                                    )}
                                                                </span>

                                                                <select
                                                                    className="form-select form-select-sm"
                                                                    style={{
                                                                        width: "160px"
                                                                    }}
                                                                    value={
                                                                        application.status
                                                                    }
                                                                    disabled={
                                                                        updatingId ===
                                                                        application.id
                                                                    }
                                                                    onChange={(e) =>
                                                                        updateStatus(
                                                                            application.id,
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                >

                                                                    <option value="pending">
                                                                        Pending
                                                                    </option>

                                                                    <option value="reviewed">
                                                                        Reviewed
                                                                    </option>

                                                                    <option value="shortlisted">
                                                                        Shortlisted
                                                                    </option>

                                                                    <option value="hired">
                                                                        Hired
                                                                    </option>

                                                                    <option value="rejected">
                                                                        Rejected
                                                                    </option>

                                                                </select>

                                                                {updatingId ===
                                                                    application.id && (

                                                                    <span
                                                                        className="spinner-border spinner-border-sm text-primary"
                                                                        role="status"
                                                                    ></span>

                                                                )}

                                                            </div>

                                                        </td>

                                                        {/* Applied Date */}

                                                        <td>

                                                            {application.applied_at
                                                                ? new Date(
                                                                    application.applied_at
                                                                ).toLocaleDateString()
                                                                : "Not available"}

                                                        </td>

                                                        {/* Resume */}

                                                        <td>

                                                            {resumeUrl ? (

                                                                <a
                                                                    href={resumeUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="btn btn-outline-primary btn-sm"
                                                                >
                                                                    📄 Resume
                                                                </a>

                                                            ) : (

                                                                <span className="text-muted">
                                                                    Not Uploaded
                                                                </span>

                                                            )}

                                                        </td>

                                                    </tr>

                                                );

                                            })}

                                        </tbody>

                                    </table>

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}


