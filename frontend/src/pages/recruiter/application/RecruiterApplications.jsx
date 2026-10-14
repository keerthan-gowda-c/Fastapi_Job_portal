
import { useEffect, useState } from "react";
import api from "../../../api/axios";
import Navbar from "../../../components/layout/Navbar";
import { Link } from "react-router-dom";
import "./RecruiterApplications.css";
import { toast } from "react-toastify";
import useRecruiterApplicationsStore from "../../../store/recruiterApplicationsStore";

export default function RecruiterApplications() {

    const applications = useRecruiterApplicationsStore((state) => state.applications);
    const loading = useRecruiterApplicationsStore((state) => state.loading);
    const fetchApplications = useRecruiterApplicationsStore((state) => state.fetchApplications);
    const invalidateApplications = useRecruiterApplicationsStore(
    (state) => state.invalidateApplications
);

    useEffect(() => {
        fetchApplications().catch((error) => {
        console.log(error);

        toast.warning(
            error.response?.data?.detail ||
            "Failed to load applications"
        );
    });
    }, [fetchApplications]);

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
        )
    }

    return (

        <>

            <Navbar />

            <div className="applications-bg">

                <div className="container py-5 mt-5">

                    {/* Header */}

                    <div className="page-header shadow-sm">

                        <h2 className="fw-bold mb-1">
                            Job Applications
                        </h2>

                        <p className="text-muted mb-0">
                            View applicants for all your job postings.
                        </p>

                    </div>


                    {/* Applications */}

                    <div className="card border-0 shadow-sm mt-4">

                        <div className="card-body">

                            {applications.length === 0 ? (

                                <div className="text-center py-5">

                                    <h4>
                                        No applications found
                                    </h4>

                                    <p className="text-muted">
                                        Applications will appear here when candidates apply.
                                    </p>

                                </div>

                            ) : (

                                <div className="table-responsive">

                                    <table className="table table-hover align-middle mb-0">

                                        <thead className="table-light">

                                            <tr>

                                                <th>
                                                    #
                                                </th>

                                                <th>
                                                    Job Title
                                                </th>

                                                <th>
                                                    Job ID
                                                </th>

                                                <th>
                                                    Applicants
                                                </th>

                                                <th className="text-center">
                                                    Action
                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {applications.map(
                                                (item, index) => (

                                                    <tr
                                                        key={item.job.id}
                                                    >

                                                        <td>
                                                            {index + 1}
                                                        </td>

                                                        <td className="fw-semibold">

                                                            {item.job.title}

                                                        </td>

                                                        <td>

                                                            <span className="badge bg-secondary">

                                                                #{item.job.id}

                                                            </span>

                                                        </td>

                                                        <td>

                                                            <span className="badge bg-primary">

                                                                {item.applicants}

                                                            </span>

                                                        </td>

                                                        <td className="text-center">

                                                            <Link
                                                                to={`/recruiter/job-applicants/${item.job.id}`}
                                                                className="btn btn-primary btn-sm px-3"
                                                            >
                                                                View Applicants
                                                            </Link>

                                                        </td>

                                                    </tr>

                                                )
                                            )}

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


