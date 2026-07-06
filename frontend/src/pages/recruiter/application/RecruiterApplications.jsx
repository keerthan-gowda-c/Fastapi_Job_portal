import { useEffect, useState } from "react";
import api from "../../../api/axios";
import Navbar from "../../../components/Navbar";
import { Link } from "react-router-dom";
import "./RecruiterApplications.css";

function RecruiterApplications() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await api.get("/applications");
            setApplications(response.data);
        }
        catch (error) {
            console.log(error);
            alert(
                error.response?.data?.detail ||
                "Failed to load applications"
            );
        }
    };

    return (
        <>
            <Navbar />

            <div className="applications-bg">

                <div className="container py-5">

                    <div className="page-header shadow-sm">

                        <h2 className="fw-bold mb-1">
                            Job Applications
                        </h2>

                        <p className="text-muted mb-0">
                            View applicants for all your job postings.
                        </p>

                    </div>

                    <div className="card border-0 shadow-sm mt-4">

                        <div className="card-body">

                            {applications.length === 0 ? (

                                <div className="text-center py-5">

                                    <h4>No applications found</h4>

                                    <p className="text-muted">
                                        Applications will appear here.
                                    </p>

                                </div>

                            ) : (

                                <div className="table-responsive">

                                    <table className="table table-hover align-middle mb-0">

                                        <thead className="table-light">

                                            <tr>

                                                <th>#</th>
                                                <th>Job Title</th>
                                                <th>Job ID</th>
                                                <th className="text-center">
                                                    Action
                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {applications.map((application, index) => (

                                                <tr key={application.id}>

                                                    <td>
                                                        {index + 1}
                                                    </td>

                                                    <td className="fw-semibold">
                                                        {application.job.title}
                                                    </td>

                                                    <td>

                                                        <span className="badge bg-secondary">
                                                            #{application.job.id}
                                                        </span>

                                                    </td>

                                                    <td className="text-center">

                                                        <Link
                                                            to={`/recruiter/job-applicants/${application.job.id}`}
                                                            className="btn btn-primary btn-sm px-3"
                                                        >
                                                            View Applicants
                                                        </Link>

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

export default RecruiterApplications;