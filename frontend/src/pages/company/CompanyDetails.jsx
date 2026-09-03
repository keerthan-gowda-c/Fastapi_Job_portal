import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/layout/Navbar";
import { toast } from "react-toastify";
import "./CompanyDetails.css";

export default function CompanyDetails() {

    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {

        fetchCompanyDetails();

    }, [id]);


    const fetchCompanyDetails = async () => {

        try {

            setLoading(true);

            const response = await api.get(`/companies/${id}`);

            setCompany(response.data);

        }
        catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.detail ||
                "Failed to load company details"
            );

        }
        finally {

            setLoading(false);

        }

    };


    /* =========================================
       LOADING
    ========================================= */

    if (loading) {

        return (

            <div className="company-details-page">

                <Navbar />

                <main className="company-details-container">

                    <div className="company-details-state">

                        <div className="company-details-loader"></div>

                        <p>
                            Loading company details...
                        </p>

                    </div>

                </main>

            </div>

        );

    }


    /* =========================================
       COMPANY NOT FOUND
    ========================================= */

    if (!company) {

        return (

            <div className="company-details-page">

                <Navbar />

                <main className="company-details-container">

                    <div className="company-not-found">

                        <div className="company-not-found__icon">
                            ◫
                        </div>

                        <span className="company-details-label">
                            COMPANY
                        </span>

                        <h1>
                            Company not found.
                        </h1>

                        <p>
                            The company you're looking for could not
                            be found or may no longer be available.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/companies/all")
                            }
                        >
                            ← Browse Companies
                        </button>

                    </div>

                </main>

            </div>

        );

    }


    return (

        <div className="company-details-page">

            <Navbar />

            <main className="company-details-container">

                {/* Back */}

                <button
                    type="button"
                    className="company-back"
                    onClick={() => navigate(-1)}
                >
                    ← Back to Companies
                </button>


                {/* Company Header */}

                <section className="company-profile-header">

                    <div className="company-profile-icon">
                        ▣
                    </div>

                    <div className="company-profile-info">

                        <span className="company-details-label">
                            COMPANY PROFILE
                        </span>

                        <h1>
                            {company.name}
                        </h1>

                        <p>

                            <span>
                                ⌖
                            </span>

                            {company.location ||
                                "Location not provided"}

                        </p>

                    </div>

                </section>


                {/* Content */}

                <div className="company-details-grid">

                    {/* Company Information */}

                    <section className="company-about-card">

                        <div className="company-section-heading">

                            <span className="company-section-number">
                                01
                            </span>

                            <div>

                                <span>
                                    ABOUT
                                </span>

                                <h2>
                                    About the Company
                                </h2>

                            </div>

                        </div>


                        <p className="company-description">

                            {company.description ||
                                "No company description available."}

                        </p>


                        <div className="company-divider"></div>


                        {/* Company Details */}

                        <div className="company-details-heading">

                            <span>
                                DETAILS
                            </span>

                            <h3>
                                Company Information
                            </h3>

                        </div>


                        <div className="company-info-grid">

                            {/* Location */}

                            <div className="company-info-item">

                                <span className="company-info-item__label">
                                    LOCATION
                                </span>

                                <strong>
                                    {company.location ||
                                        "Not provided"}
                                </strong>

                            </div>


                            {/* Website */}

                            <div className="company-info-item">

                                <span className="company-info-item__label">
                                    WEBSITE
                                </span>

                                {company.website ? (

                                    <a
                                        href={company.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Visit Website
                                        <span>
                                            ↗
                                        </span>
                                    </a>

                                ) : (

                                    <strong>
                                        Not provided
                                    </strong>

                                )}

                            </div>

                        </div>

                    </section>


                    {/* Actions */}

                    <aside className="company-actions-card">

                        <span className="company-section-number">
                            02
                        </span>

                        <span className="company-actions-label">
                            EXPLORE
                        </span>

                        <h2>
                            Find your next opportunity.
                        </h2>

                        <p>
                            Browse available jobs and discover
                            opportunities from companies like this one.
                        </p>


                        <div className="company-actions">

                            <button
                                type="button"
                                className="company-action-primary"
                                onClick={() =>
                                    navigate("/jobs")
                                }
                            >
                                Browse Jobs
                                <span>→</span>
                            </button>


                            <button
                                type="button"
                                className="company-action-secondary"
                                onClick={() =>
                                    navigate(-1)
                                }
                            >
                                ← Back
                            </button>

                        </div>

                    </aside>

                </div>

            </main>

        </div>

    );

}