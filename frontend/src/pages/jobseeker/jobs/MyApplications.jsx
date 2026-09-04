import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/layout/Navbar";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import "./MyApplications.css"

export default function MyApplications() {

    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionId, setActionId] = useState(null);


    const fetchApplications = async () => {

        setLoading(true);

        try {

            const response = await api.get("/applications/me");

            setApplications(response.data);

        }
        catch (error) {

            console.error("Failed to load applications:", error);

            toast.warning(
                error.response?.data?.detail ||
                "Failed to load applications"
            );

        }
        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchApplications();

    }, []);


    const withdrawApplication = async (applicationId) => {

        const confirmWithdraw = window.confirm(
            "Are you sure you want to withdraw this application?"
        );

        if (!confirmWithdraw) return;

        setActionId(applicationId);

        try {

            await api.patch(
                `/applications/${applicationId}/withdraw`
            );

            setApplications((currentApplications) =>
                currentApplications.map((application) =>
                    application.id === applicationId
                        ? {
                            ...application,
                            status: "withdrawn"
                        }
                        : application
                )
            );

            toast.info(
                "Application withdrawn successfully"
            );

        }
        catch (error) {

            console.error(error);

            toast.warning(
                error.response?.data?.detail ||
                "Failed to withdraw application"
            );

        }
        finally {

            setActionId(null);

        }

    };


    const applyAgain = async (jobId) => {

        setActionId(jobId);

        try {

            await api.post(
                `/applications/jobs/${jobId}`
            );

            toast.success(
                "Application submitted successfully"
            );

            fetchApplications();

        }
        catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.detail ||
                "Failed to apply"
            );

        }
        finally {

            setActionId(null);

        }

    };


    const deleteApplication = async (applicationId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this application?"
        );

        if (!confirmDelete) return;

        setActionId(applicationId);

        try {

            await api.patch(
                `/applications/${applicationId}/delete`
            );

            setApplications((currentApplications) =>
                currentApplications.filter(
                    (application) =>
                        application.id !== applicationId
                )
            );

            toast.success(
                "Application deleted successfully"
            );

        }
        catch (error) {

            console.error(error);

            toast.warning(
                error.response?.data?.detail ||
                "Delete failed"
            );

        }
        finally {

            setActionId(null);

        }

    };


    const getStatusClass = (status) => {

        switch (status) {

            case "pending":
                return "jh-status jh-status--pending";

            case "reviewed":
                return "jh-status jh-status--reviewed";

            case "shortlisted":
                return "jh-status jh-status--shortlisted";

            case "hired":
                return "jh-status jh-status--hired";

            case "withdrawn":
                return "jh-status jh-status--withdrawn";

            default:
                return "jh-status jh-status--default";

        }

    };


    const formatStatus = (status) => {

        return status
            ?.replaceAll("_", " ")
            .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
            );

    };


    return (

        <div className="jh-page">

            <Navbar />

            <main className="jh-applications">

                {/* Header */}

                <section className="jh-section-header">

                    <span className="jh-section-eyebrow">
                        Career Activity
                    </span>

                    <h1 className="jh-heading">
                        My Applications
                    </h1>

                    <p className="jh-section-subtitle">
                        Track the status of every job you've applied for.
                    </p>

                </section>


                {/* Loading */}

                {loading ? (

                    <div className="jh-state">

                        <div className="jh-spinner"></div>

                        <p>
                            Loading applications...
                        </p>

                    </div>

                ) : applications.length === 0 ? (

                    /* Empty State */

                    <section className="jh-empty">

                        <div className="jh-empty__icon">
                            📄
                        </div>

                        <h2>
                            No Applications Yet
                        </h2>

                        <p>
                            Start applying for jobs to see them here.
                        </p>

                        <button
                            className="jh-btn jh-btn--primary"
                            onClick={() => navigate("/jobs")}
                        >
                            Browse Jobs
                            <span>→</span>
                        </button>

                    </section>

                ) : (

                    /* Applications */

                    <section className="jh-applications__table-wrapper">

    <div className="jh-applications__table">

        {/* Table Header */}

        <div className="jh-applications__row jh-applications__row--header">

            <div>Job</div>
            <div>Location</div>
            <div>Applied On</div>
            <div>Salary</div>
            <div>Employment</div>
            <div>Status</div>
            <div>Actions</div>

        </div>


        {/* Table Rows */}

        {applications.map((application) => {

            const job = application.job;

            return (

                <div
                    className="jh-applications__row"
                    key={application.id}
                >

                    {/* Job */}

                    <div className="jh-table-job">

                        <strong>
                            {job?.title || "N/A"}
                        </strong>

                    </div>


                    {/* Location */}

                    <div className="jh-table-location">

                        <span>📍</span>

                        {job?.location || "N/A"}

                    </div>


                    {/* Applied Date */}

                    <div className="jh-table-date">

                        {application.applied_at
                            ? new Date(
                                application.applied_at
                            ).toLocaleDateString()
                            : "N/A"
                        }

                    </div>


                    {/* Salary */}

                    <div className="jh-table-salary">

                        {job?.salary
                            ? `₹${job.salary}`
                            : "N/A"
                        }

                    </div>


                    {/* Employment */}

                    <div className="jh-table-employment">

                        {job?.employment_type
                            ?.replaceAll("_", " ")
                            || "N/A"
                        }

                    </div>


                    {/* Status */}

                    <div>

                        <span
                            className={getStatusClass(
                                application.status
                            )}
                        >
                            {formatStatus(
                                application.status
                            )}
                        </span>

                    </div>


                    {/* Actions */}

                    <div className="jh-table-actions">

                        <button
                            className="jh-btn jh-btn--ghost"
                            onClick={() =>
                                navigate(
                                    `/jobs/${job.id}`
                                )
                            }
                        >
                            View
                        </button>


                        {application.status === "pending" && (

                            <button
                                className="jh-btn jh-btn--danger-outline"
                                disabled={
                                    actionId === application.id
                                }
                                onClick={() =>
                                    withdrawApplication(
                                        application.id
                                    )
                                }
                            >

                                {actionId === application.id ? (

                                    <>
                                        <span className="jh-btn-spinner"></span>
                                        Withdrawing...
                                    </>

                                ) : (

                                    "Withdraw"

                                )}

                            </button>

                        )}


                        {application.status === "withdrawn" && (

                            <>

                                <button
                                    className="jh-btn jh-btn--success"
                                    disabled={
                                        actionId === job.id
                                    }
                                    onClick={() =>
                                        applyAgain(job.id)
                                    }
                                >

                                    {actionId === job.id ? (

                                        <>
                                            <span className="jh-btn-spinner"></span>
                                            Applying...
                                        </>

                                    ) : (

                                        "Apply Again"

                                    )}

                                </button>


                                <button
                                    className="jh-btn jh-btn--danger-outline"
                                    disabled={
                                        actionId === application.id
                                    }
                                    onClick={() =>
                                        deleteApplication(
                                            application.id
                                        )
                                    }
                                >
                                    Delete
                                </button>

                            </>

                        )}

                    </div>

                </div>

            );

        })}

    </div>

</section>
                )}

            </main>

        </div>

    );

}