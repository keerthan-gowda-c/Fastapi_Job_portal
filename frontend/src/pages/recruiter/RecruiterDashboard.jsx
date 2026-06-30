import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

function RecruiterDashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const fetchDashboard = async () => {
        try {
            const response = await api.get("/dashboard/recruiter")
            setStats(response.data)
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchDashboard()
    }, [])
    if (!stats) {
        return (
            <h3 className="text-center mt-5">
                Loading...
            </h3>
        )
    }

    return (

        <>
            <Navbar />

            <div className="container mt-4">


                <h2>
                    Recruiter Dashboard
                </h2>

                <button
                    className="btn btn-success"
                    onClick={() =>
                        navigate("/company/create")
                    }
                >
                    Create Company
                </button>
                <button
                    className="btn btn-success"
                    onClick={() =>
                        navigate("/job/create")
                    }
                >
                    Create Job
                </button>

                <button

                    className="btn btn-primary"

                    onClick={() => navigate("/my-jobs")}

                >
                    Manage Jobs
                </button>


                <div className="row mt-4">


                    <Card
                        title="Companies"
                        value={stats.companies}
                    />


                    <Card
                        title="Jobs"
                        value={stats.jobs}
                    />


                    <Card
                        title="Applications"
                        value={stats.applications}
                    />


                    <Card
                        title="Hire Rate"
                        value={`${stats.hire_rate}%`}
                    />


                </div>



                <div className="row mt-4">


                    <Card
                        title="Pending"
                        value={stats.pending}
                    />


                    <Card
                        title="Shortlisted"
                        value={stats.shortlisted}
                    />


                    <Card
                        title="Hired"
                        value={stats.hired}
                    />


                    <Card
                        title="Rejected"
                        value={stats.rejected}
                    />


                </div>


            </div>

        </>

    )


}

function Card({ title, value }) {

    return (

        <div className="col-md-3 mb-3">

            <div className="card shadow p-3 text-center">


                <h5>
                    {title}
                </h5>


                <h2>
                    {value}
                </h2>


            </div>

        </div>

    )

}

export default RecruiterDashboard;