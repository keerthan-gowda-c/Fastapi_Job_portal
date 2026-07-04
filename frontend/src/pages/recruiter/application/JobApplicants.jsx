import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/axios";
import Navbar from "../../../components/Navbar";

function JobApplicants() {
    const { jobId } = useParams()

    const [applications, setApplications] = useState([])
    useEffect(() => {
        fetchApplicants()
    }, [])

    const fetchApplicants = async () => {
        try {
            const response = await api.get(`/applications/job/${jobId}`)
            setApplications(response.data)
        }
        catch (error) {
            console.log(error)
            alert(error.response?.data?.detail || "Failed to load applications")
        }
    }

    const updateStatus = async (applicationId, status) => {
        try {
            await api.patch(`/applications/${applicationId}/status`, { status: status })
            fetchApplicants()
        }
        catch (error) {
            console.log(error)
            alert(error.response?.data?.detail || "Failed to update status")
        }
    }
    return (
        <>
            <Navbar />
            <div className="container mt-4">

                <div className="card shadow">

                    <div className="card-header bg-primary text-white">

                        <h3>Applicants</h3>

                    </div>

                    <div className="card-body">

                        {applications.length === 0 ? (

                            <div className="text-center">

                                <h5>No applicants yet.</h5>

                            </div>

                        ) : (

                            <table className="table table-bordered table-hover">

                                <thead className="table-dark">

                                    <tr>

                                        <th>Name</th>

                                        <th>Email</th>

                                        <th>Status</th>

                                        <th>Applied On</th>

                                        <th>Resume</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {applications.map((application) => (

                                        <tr key={application.id}>

                                            <td>{application.user.full_name}</td>

                                            <td>{application.user.email}</td>

                                            <td>
                                                <select
                                                    className="form-select form-select-sm"
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

                                                    <option value="rejected">Rejected</option>

                                                    <option value="hired">Hired</option>
                                                </select>
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
                                                        className="btn btn-success btn-sm"
                                                    >
                                                        View Resume
                                                    </a>

                                                ) : (

                                                    <span>No Resume</span>

                                                )}

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        )}

                    </div>

                </div>

            </div>
        </>
    );
}

export default JobApplicants;