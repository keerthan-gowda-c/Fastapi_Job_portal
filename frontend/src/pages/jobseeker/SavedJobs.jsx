import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import api from "../../api/axios";
import { toast } from "react-toastify";

function SavedJobs() {

    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {

        fetchSavedJobs();

    }, []);

    const fetchSavedJobs = async () => {

        try {

            const response = await api.get("/saved-jobs");

            setSavedJobs(response.data);

        }

        catch (error) {

            console.log(error);

            toast.warning("Failed to load saved jobs");

        }

    };

    const removeSavedJob = async (jobId) => {

        try {

            await api.delete(`/saved-jobs/${jobId}`);

            fetchSavedJobs();

        }

        catch (error) {

            toast.warning(
                error.response?.data?.detail ||
                "Failed to remove job"
            );

        }

    };

    return (

        <>

            <Navbar />

            <div className="container py-5">

                <div className="text-center mb-5">

                    <h1 className="fw-bold">

                        ❤️ Saved Jobs

                    </h1>

                    <p className="text-muted fs-5">

                        Jobs you've saved for later.

                    </p>

                </div>

                {savedJobs.length === 0 ? (

                    <div className="card border-0 shadow rounded-4">

                        <div className="card-body text-center py-5">

                            <h3>

                                No Saved Jobs

                            </h3>

                            <p className="text-muted">

                                Save jobs while browsing and they will
                                appear here.

                            </p>

                        </div>

                    </div>

                ) : (

                    <div className="row">

    {savedJobs.map((savedJob) => (

        <div
            className="col-12 mb-3"
            key={savedJob.id}
        >

            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center">

                        {/* Left */}

                        <div>

                            <h5 className="fw-bold mb-1">

                                {savedJob.job.title}

                            </h5>

                            <div className="text-muted small">

                                📍 {savedJob.job.location}

                                <span className="mx-2">•</span>

                                💰 ₹{savedJob.job.salary}

                            </div>

                        </div>

                        {/* Right */}

                        <div className="text-end">

                            <span className="badge bg-success mb-2">

                                Saved

                            </span>

                            <br />

                            <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() =>
                                    removeSavedJob(savedJob.job.id)
                                }
                            >
                                Remove
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    ))}

</div>

                )}

            </div>

        </>

    );

}

export default SavedJobs;