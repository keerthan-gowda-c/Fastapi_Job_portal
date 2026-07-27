import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

function CompanyDetails() {
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

        } catch (error) {
            console.log(error);
            alert("Failed to load Company Details");
        } finally {
            setLoading(false);
        }
    };

   


    if (loading) {
        return (
            <>
                <Navbar />

                <div className="container mt-5 text-center">
                    <div className="spinner-border text-primary"></div>
                    <p className="mt-3">
                        Loading company details...
                    </p>
                </div>
            </>
        );
    }


    if (!company) {
        return (
            <>
                <Navbar />

                <div className="container mt-5">
                    <div className="alert alert-warning">
                        Company not found.
                    </div>
                </div>
            </>
        );
    }


    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <div className="card shadow">

                    <div className="card-body">

                        <h2 className="card-title mb-3">
                            {company.name}
                        </h2>

                        <hr />

                        <div className="mb-3">
                            <h6 className="text-muted">
                                Location
                            </h6>
                            <p>
                                📍 {company.location || "Not provided"}
                            </p>
                        </div>


                        <div className="mb-3">
                            <h6 className="text-muted">
                                Website
                            </h6>

                            {company.website ? (
                                <a
                                    href={company.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {company.website}
                                </a>
                            ) : (
                                <p>
                                    Not provided
                                </p>
                            )}
                        </div>


                        <div className="mb-3">
                            <h6 className="text-muted">
                                Description
                            </h6>

                            <p>
                                {company.description || "No description available"}
                            </p>
                        </div>


                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate(-1)}
                        >
                            ← Back
                        </button>

                    </div>

                </div>

            </div>
        </>
    );
}

export default CompanyDetails;