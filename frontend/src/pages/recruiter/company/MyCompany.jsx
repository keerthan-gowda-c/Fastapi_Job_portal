
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import Navbar from "../../../components/layout/Navbar";
import { toast } from "react-toastify";
import "./MyCompany.css"

export default function MyCompany() {

    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    useEffect(() => {

        fetchCompany();

    }, []);


    const fetchCompany = async () => {

        try {

            const response = await api.get("/companies/me");

            setCompany(response.data);

        }
        catch (error) {

            console.error(error);

            toast.warning(
                error.response?.data?.detail ||
                "Failed to load company"
            );

        }
        finally {

            setLoading(false);

        }

    };


    const deleteCompany = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this company?"
        );

        if (!confirmDelete) return;


        try {

            await api.delete(`/companies/${company.id}`);

            toast.success(
                "Company deleted successfully"
            );

            navigate("/recruiter-dashboard");

        }
        catch (error) {

            console.error(error);

            toast.warning(
                error.response?.data?.detail ||
                "Failed to delete company"
            );

        }

    };


    if (loading) {

        return (

            <>
                <Navbar />

                <div className="container py-5">

                    <div className="text-center py-5">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        />

                        <p className="text-muted mt-3">
                            Loading company...
                        </p>

                    </div>

                </div>
            </>

        );

    }


    if (!company) {

        return (

            <>
                <Navbar />

                <div className="container py-5">

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body text-center py-5">

                            <i className="bi bi-building-add fs-1 text-muted"></i>

                            <h3 className="fw-bold mt-3">
                                No Company Found
                            </h3>

                            <p className="text-muted">
                                Create your company profile to start posting jobs.
                            </p>

                            <button
                                className="btn btn-primary rounded-pill px-4"
                                onClick={() =>
                                    navigate("/company/create")
                                }
                            >
                                <i className="bi bi-plus-lg me-2"></i>
                                Create Company
                            </button>

                        </div>

                    </div>

                </div>
            </>

        );

    }


    return (

        <>
            <Navbar />

            <div className="container py-5">

                {/* Heading */}

                <div className="text-center mb-5">

                    <h1 className="fw-bold">
                        🏢 My Company
                    </h1>

                    <p className="text-muted fs-5">
                        Manage your company information and profile.
                    </p>

                </div>


                {/* Company Card */}

                <div className="card border-0 shadow-lg rounded-4">

                    <div className="card-body p-5">

                        {/* Company Header */}

                        <div className="d-flex flex-column flex-md-row align-items-md-center mb-5">

                            <div
                                className="rounded-circle bg-primary bg-opacity-10 d-flex justify-content-center align-items-center mb-3 mb-md-0 me-md-4"
                                style={{
                                    width: "90px",
                                    height: "90px",
                                    minWidth: "90px"
                                }}
                            >

                                <i className="bi bi-building text-primary fs-1"></i>

                            </div>


                            <div>

                                <h2 className="fw-bold mb-1">
                                    {company.name}
                                </h2>

                                <p className="text-muted mb-0">

                                    <i className="bi bi-geo-alt me-2"></i>

                                    {company.location || "Location not provided"}

                                </p>

                            </div>

                        </div>


                        <hr className="mb-5" />


                        {/* Company Information */}

                        <div className="row g-4">

                            <div className="col-md-6">

                                <div className="p-4 bg-light rounded-4 h-100">

                                    <h6 className="text-muted mb-2">
                                        <i className="bi bi-building me-2"></i>
                                        Company Name
                                    </h6>

                                    <p className="fw-semibold mb-0">
                                        {company.name || "Not provided"}
                                    </p>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="p-4 bg-light rounded-4 h-100">

                                    <h6 className="text-muted mb-2">
                                        <i className="bi bi-geo-alt me-2"></i>
                                        Location
                                    </h6>

                                    <p className="fw-semibold mb-0">
                                        {company.location || "Not provided"}
                                    </p>

                                </div>

                            </div>


                            <div className="col-12">

                                <div className="p-4 bg-light rounded-4">

                                    <h6 className="text-muted mb-2">
                                        <i className="bi bi-card-text me-2"></i>
                                        Description
                                    </h6>

                                    <p className="mb-0">
                                        {company.description ||
                                            "No description provided."}
                                    </p>

                                </div>

                            </div>


                            <div className="col-12">

                                <div className="p-4 bg-light rounded-4">

                                    <h6 className="text-muted mb-2">
                                        <i className="bi bi-globe me-2"></i>
                                        Website
                                    </h6>

                                    {company.website ? (

                                        <a
                                            href={company.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-decoration-none"
                                        >
                                            {company.website}
                                            <i className="bi bi-box-arrow-up-right ms-2"></i>
                                        </a>

                                    ) : (

                                        <p className="mb-0">
                                            Not provided
                                        </p>

                                    )}

                                </div>

                            </div>

                        </div>


                        <hr className="my-5" />


                        {/* Actions */}

                        <div className="d-flex flex-wrap gap-3">

                            <button
                                className="btn btn-primary rounded-pill px-4"
                                onClick={() =>
                                    navigate("/company/edit-company")
                                }
                            >
                                <i className="bi bi-pencil me-2"></i>
                                Edit Company
                            </button>


                            <button
                                className="btn btn-outline-danger rounded-pill px-4"
                                onClick={deleteCompany}
                            >
                                <i className="bi bi-trash me-2"></i>
                                Delete Company
                            </button>


                            <button
                                className="btn btn-outline-secondary rounded-pill px-4"
                                onClick={() =>
                                    navigate("/recruiter-dashboard")
                                }
                            >
                                ← Dashboard
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </>

    );

}


