import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/layout/Navbar";
import { toast } from "react-toastify";
import "./CompaniesList.css";

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
                limit: 10
            };

            if (search.trim() !== "") {
                params.search = search.trim();
            }

            const response = await api.get(
                "/companies/",
                { params }
            );

            setCompanies(response.data);

        }
        catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.detail ||
                "Failed to fetch companies"
            );

        }
        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchCompanies();

    }, [page]);


    const handleSearch = () => {

        if (page !== 1) {

            setPage(1);

        }
        else {

            fetchCompanies();

        }

    };


    const viewCompany = (companyId) => {

        navigate(`/companies/details/${companyId}`);

    };


    return (

        <div className="companies-page">

            <Navbar />

            <main className="companies-container">

                {/* Header */}

                <section className="companies-header">

                    <span className="companies-label">
                        EXPLORE THE NETWORK
                    </span>

                    <h1>
                        Discover companies.
                    </h1>

                    <p>
                        Explore organizations, learn about their work,
                        and discover your next opportunity.
                    </p>

                </section>


                {/* Search */}

                <section className="companies-search">

                    <div className="companies-search__box">

                        <span className="companies-search__icon">
                            ⌕
                        </span>

                        <input
                            type="text"
                            placeholder="Search companies..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            onKeyDown={(e) => {

                                if (e.key === "Enter") {
                                    handleSearch();
                                }

                            }}
                        />

                        <button
                            type="button"
                            onClick={handleSearch}
                            disabled={loading}
                        >
                            Search
                            <span>→</span>
                        </button>

                    </div>

                </section>


                {/* Loading */}

                {loading ? (

                    <div className="companies-state">

                        <div className="companies-loader"></div>

                        <p>
                            Loading companies...
                        </p>

                    </div>

                ) : companies.length === 0 ? (

                    /* Empty State */

                    <div className="companies-empty">

                        <div className="companies-empty__icon">
                            ◫
                        </div>

                        <h2>
                            No companies found
                        </h2>

                        <p>
                            Try searching with a different company name.
                        </p>

                    </div>

                ) : (

                    /* Companies */

                    <section className="companies-grid">

                        {companies.map((company) => (

                            <article
                                className="company-card"
                                key={company.id}
                            >

                                <div className="company-card__top">

                                    <div className="company-card__icon">
                                        ▣
                                    </div>

                                    <div className="company-card__identity">

                                        <h2>
                                            {company.name}
                                        </h2>

                                        <span className="company-card__location">

                                            <span>
                                                ⌖
                                            </span>

                                            {company.location ||
                                                "Location not available"}

                                        </span>

                                    </div>

                                </div>


                                <div className="company-card__content">

                                    {company.description ? (

                                        <p>

                                            {company.description.length > 120
                                                ? `${company.description.slice(0, 120)}...`
                                                : company.description}

                                        </p>

                                    ) : (

                                        <p>
                                            No company description available.
                                        </p>

                                    )}

                                </div>


                                <div className="company-card__footer">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            viewCompany(company.id)
                                        }
                                    >
                                        View Company
                                        <span>→</span>
                                    </button>

                                </div>

                            </article>

                        ))}

                    </section>

                )}


                {/* Pagination */}

                <div className="companies-pagination">

                    <button
                        type="button"
                        disabled={page === 1 || loading}
                        onClick={() =>
                            setPage(
                                (previousPage) =>
                                    previousPage - 1
                            )
                        }
                    >
                        ← Previous
                    </button>


                    <div className="companies-pagination__page">

                        <span>
                            PAGE
                        </span>

                        <strong>
                            {page}
                        </strong>

                    </div>


                    <button
                        type="button"
                        disabled={
                            loading ||
                            companies.length < 10
                        }
                        onClick={() =>
                            setPage(
                                (previousPage) =>
                                    previousPage + 1
                            )
                        }
                    >
                        Next →
                    </button>

                </div>

            </main>

        </div>

    );

}

export default CompaniesList;