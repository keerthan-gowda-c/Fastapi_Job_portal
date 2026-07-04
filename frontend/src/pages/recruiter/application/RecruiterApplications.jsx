import { useEffect, useState } from "react";
import api from "../../../api/axios";
import Navbar from "../../../components/Navbar";
import { Link } from "react-router-dom";


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
            <div className="container mt-4">

                <div className="card shadow">

                    <div className="card-header bg-primary text-white">
                        <h3 className="mb-0">Job Applications</h3>
                    </div>

                    <div className="card-body">

                        {applications.length === 0 ? (

                            <div className="text-center">
                                <h5>No applications found.</h5>
                            </div>

                        ) : (

                            <table className="table table-bordered table-hover">

                                <thead className="table-dark">

                                    <tr>
                                        <th>Job Title</th>
                                        
                                        <th>View</th>
                                        
                                    </tr>

                                </thead>

                                <tbody>

                                    {applications.map((application) => (

                                        <tr key={application.id}>

                                            <td>{application.job.title}</td>

                                            
                                            <td>
                                                <Link
                                                    className="btn btn-primary btn-sm"
                                                    to={`/recruiter/job-applicants/${application.job.id}`}
                                                >
                                                    View Applicants
                                                </Link>
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

export default RecruiterApplications;