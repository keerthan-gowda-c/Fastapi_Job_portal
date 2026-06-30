import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../api/axios";
import Navbar from "../../../components/Navbar";


function MyJobs(){

    const [jobs,setJobs] = useState([]);
    const navigate = useNavigate();


    const fetchJobs = async()=>{

        try{

            const response = await api.get(
                "/jobs/"
            );


            setJobs(response.data);

        }
        catch(error){

            console.log(error);

        }

    };

    const deleteJob = async(id)=>{

    const confirmDelete = window.confirm(
        "Delete this job?"
    );


    if(!confirmDelete) return;


    try{

        await api.delete(
            `/jobs/${id}`
        );


        alert(
            "Job deleted successfully"
        );


        fetchJobs();


    }
    catch(error){

        console.log(error);

        alert(
            error.response?.data?.detail ||
            "Delete failed"
        );

    }

};



    useEffect(()=>{

        fetchJobs();

    },[]);



    return (

        <>

        <Navbar />


        <div className="container mt-4">


            <h2>
                My Jobs
            </h2>



            <div className="row mt-4">


            {
            jobs.map((job)=>(


                <div
                className="col-md-6 mb-4"
                key={job.id}
                >


                    <div className="card shadow p-3">


                        <h4>
                            {job.title}
                        </h4>


                        <p>
                            {job.description}
                        </p>


                        <p>
                            <b>
                            Location:
                            </b>{" "}
                            {job.location}
                        </p>


                        <p>
                            <b>
                            Salary:
                            </b>{" "}
                            ₹{job.salary}
                        </p>



                        <div>


                            <button

                            className="btn btn-warning me-2"
                            onClick={()=>navigate(`/job/edit/${job.id}`)}
                            >

                                Edit

                            </button>



                            <button

                            className="btn btn-danger"
                            onClick={()=>deleteJob(job.id)}
                            >

                                Delete

                            </button>


                        </div>



                    </div>


                </div>


            ))
            }



            </div>


        </div>


        </>

    );

}


export default MyJobs;