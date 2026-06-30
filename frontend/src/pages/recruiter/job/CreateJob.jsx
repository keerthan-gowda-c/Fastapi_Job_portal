import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../api/axios";
import Navbar from "../../../components/Navbar";


function CreateJob(){

    const navigate = useNavigate();


    const [form,setForm] = useState({

        title:"",
        description:"",
        location:"",
        salary:""

    });



    const handleChange = (e)=>{

        setForm({

            ...form,
            [e.target.name]: e.target.value

        });

    };



    const handleSubmit = async(e)=>{

        e.preventDefault();


        try{

            await api.post(
                "/jobs/",
                {
                    ...form,
                    salary:Number(form.salary)
                }
            );


            alert(
                "Job created successfully"
            );


            navigate("/recruiter-dashboard");


        }
        catch(error){

            console.log(error);

            alert(
                error.response?.data?.detail ||
                "Job creation failed"
            );

        }

    };




    return (

        <>

        <Navbar />


        <div className="container mt-5">


            <div className="row justify-content-center">


                <div className="col-md-6">


                    <div className="card p-4 shadow">


                        <h2 className="mb-4">
                            Create Job
                        </h2>



                        <form onSubmit={handleSubmit}>


                            <input

                            className="form-control mb-3"

                            name="title"

                            placeholder="Job Title"

                            onChange={handleChange}

                            required

                            />



                            <textarea

                            className="form-control mb-3"

                            name="description"

                            placeholder="Job Description"

                            rows="4"

                            onChange={handleChange}

                            required

                            />



                            <input

                            className="form-control mb-3"

                            name="location"

                            placeholder="Location"

                            onChange={handleChange}

                            required

                            />



                            <input

                            className="form-control mb-3"

                            type="number"

                            name="salary"

                            placeholder="Salary"

                            onChange={handleChange}

                            required

                            />



                            <button

                            className="btn btn-success w-100"

                            >

                                Create Job

                            </button>


                        </form>


                    </div>


                </div>


            </div>


        </div>


        </>

    );

}


export default CreateJob;