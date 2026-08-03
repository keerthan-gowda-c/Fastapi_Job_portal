import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CompaniesList() {
    const [companies, setCompanies] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const fetchCompanies = async () => {
        setLoading(true);

        try {
            const params = {
                page,
                limit: 10,
            };

            if (search.trim() !== "") {
                params.search = search.trim();
            }

            const response = await api.get("/companies/", { params });
            setCompanies(response.data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch companies");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, [page]);

    const handleSearch = () => {
        if (page !== 1) {
            setPage(1);
        } else {
            fetchCompanies();
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="container mt-5 text-center">
                    <div className="spinner-border text-primary"></div>
                    <p className="mt-3">Loading companies...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <h2 className="text-center mb-4">
                    Browse Companies
                </h2>

                <div className="row justify-content-center mb-4">
                    <div className="col-md-8">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Companies..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSearch();
                                }}
                            />

                            <button
                                className="btn btn-primary"
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                {companies.length === 0 ? (
                    <div className="alert alert-warning text-center">
                        No Companies Found
                    </div>
                ) : (
                    <div className="row">
                        {companies.map((company) => (
                            <div
                                className="col-md-6 col-lg-4 mb-4"
                                key={company.id}
                            >
                                <div
                                    className="card h-100 shadow-sm"
                                    role="button"
                                    onClick={() =>
                                        navigate(`/companies/details/${company.id}`)
                                    }
                                >
                                    <div className="card-body">

                                        <h5 className="card-title">
                                            {company.name}
                                        </h5>

                                        <p className="card-text text-muted">
                                            📍 {company.location}
                                        </p>

                                        {company.description && (
                                            <p className="card-text">
                                                {company.description.length > 100
                                                    ? company.description.slice(
                                                        0,
                                                        100
                                                    ) + "..."
                                                    : company.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="card-footer bg-white border-0">
                                        <button
                                            className="btn btn-outline-primary w-100"
                                            onClick={() => navigate(`/companies/details/${company.id}`)}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="d-flex justify-content-center align-items-center gap-3 mt-4 mb-5">

                    <button
                        className="btn btn-outline-secondary"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </button>

                    <span className="fw-bold">
                        Page {page}
                    </span>

                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>

                </div>
            </div>
        </>
    );
}

export default CompaniesList;