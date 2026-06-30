import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../../api/axios";
import Navbar from "../../../components/Navbar";


function EditJob(){

    const { id } = useParams();

    const navigate = useNavigate();


    const [form,setForm] = useState({

        title:"",
        description:"",
        location:"",
        salary:""

    });



    const fetchJob = async()=>{

        try{

            const response = await api.get(
                `/jobs/${id}`
            );


            setForm({

                title: response.data.title,
                description: response.data.description,
                location: response.data.location,
                salary: response.data.salary

            });

        }
        catch(error){

            console.log(error);

        }

    };



    useEffect(()=>{

        fetchJob();

    },[]);



    const handleChange=(e)=>{

        setForm({

            ...form,
            [e.target.name]: e.target.value

        });

    };



    const updateJob = async(e)=>{

        e.preventDefault();


        try{

            await api.put(
                `/jobs/${id}`,
                {
                    ...form,
                    salary:Number(form.salary)
                }
            );


            alert(
                "Job updated successfully"
            );


            navigate("/my-jobs");


        }
        catch(error){

            console.log(error);

            alert(
                error.response?.data?.detail ||
                "Update failed"
            );

        }

    };




    return (

        <>

        <Navbar />


        <div className="container mt-5">


            <div className="card p-4">


                <h2>
                    Edit Job
                </h2>


                <form onSubmit={updateJob}>


                    <input

                    className="form-control mb-3"

                    name="title"

                    value={form.title}

                    onChange={handleChange}

                    />


                    <textarea

                    className="form-control mb-3"

                    name="description"

                    value={form.description}

                    onChange={handleChange}

                    />


                    <input

                    className="form-control mb-3"

                    name="location"

                    value={form.location}

                    onChange={handleChange}

                    />


                    <input

                    className="form-control mb-3"

                    name="salary"

                    type="number"

                    value={form.salary}

                    onChange={handleChange}

                    />



                    <button

                    className="btn btn-success"

                    >

                    Update Job

                    </button>


                </form>


            </div>


        </div>


        </>

    )

}


export default EditJob;