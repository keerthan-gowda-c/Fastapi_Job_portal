import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/axios";
import Navbar from "../../../components/Navbar";
import "./JobApplicants.css";
import { toast } from "react-toastify";

function JobApplicants() {
    const { jobId } = useParams();

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplicants();
    }, []);

    const fetchApplicants = async () => {
        try {
            const response = await api.get(`/applications/job/${jobId}`);
            setApplications(response.data);
        } catch (error) {
            console.log(error);
            toast.warning(error.response?.data?.detail || "Failed to load applications");
        }
    };

    const updateStatus = async (applicationId, status) => {
        try {
            await api.patch(`/applications/${applicationId}/status`, {
                status,
            });

            fetchApplicants();

        } catch (error) {

            console.log(error);

            toast.warning(error.response?.data?.detail || "Failed to update status");
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

    return (
        <>
            <Navbar />

            <div className="applicants-bg">

                <div className="container py-5">

                    <div className="card border-0 shadow-lg applicants-card">

                        <div className="card-body">

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

                            {applications.length === 0 ? (

                                <div className="text-center py-5">

                                    <h4>No applicants yet</h4>

                                    <p className="text-muted">
                                        Applications will appear here once candidates apply.
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

                                            {applications.map((application) => (

                                                <tr key={application.id}>

                                                    <td>

                                                        <strong>
                                                            {application.user.full_name}
                                                        </strong>

                                                    </td>

                                                    <td>
                                                        {application.user.email}
                                                    </td>

                                                    <td>

                                                        <div className="d-flex align-items-center gap-2">

                                                            <span
                                                                className={`badge bg-${badgeColor(application.status)}`}
                                                            >
                                                                {application.status}
                                                            </span>

                                                            <select
                                                                className="form-select form-select-sm"
                                                                style={{ width: "160px" }}
                                                                value={application.status}
                                                                onChange={(e) =>
                                                                    updateStatus(
                                                                        application.id,
                                                                        e.target.value
                                                                    )
                                                                }
                                                            >

                                                                <option value="pending">Pending</option>
                                                                <option value="reviewed">Reviewed</option>
                                                                <option value="shortlisted">Shortlisted</option>
                                                                <option value="hired">Hired</option>
                                                                <option value="rejected">Rejected</option>

                                                            </select>

                                                        </div>

                                                    </td>

                                                    <td>

                                                        {new Date(
                                                            application.applied_at
                                                        ).toLocaleDateString()}

                                                    </td>

                                                    <td>

                                                        {application.user.resume_url ? (

                                                            <a
                                                                href={`http://localhost:8000/${application.user.resume_url}`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="btn btn-outline-primary btn-sm"
                                                            >
                                                                Resume
                                                            </a>

                                                        ) : (

                                                            <span className="text-muted">
                                                                Not Uploaded
                                                            </span>

                                                        )}

                                                    </td>

                                                </tr>

                                            ))}

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

export default JobApplicants;