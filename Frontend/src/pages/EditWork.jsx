import axios from "../utils/axiosClient";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Form from "../components/Form";

export default function(){

    const { id } = useParams();

    const navigate = useNavigate();

    const [dataToEdit, setDataToEdit] = useState(null);

    const fetchDataToEdit = async () => {
        const { data: p } = await axios.get(`/works/${id}`);
        setDataToEdit({
            name: p.name,
            imageWork: p.imageWork,
        });
    }

    useEffect(() => {
        fetchDataToEdit();
        return () => {
            setDataToEdit(null);
        }
    },[id]);

    const editWork = async formData => {
        console.log(formData);
        const res = await axios.put(`/works/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log(res);
        if(res.status < 400){
            navigate(`/works/${res.data.id}`)
        }
    }

    const handleBack = () => {
        navigate('/works/${id}');
   };

    return(
        <div className="edit">
           <div className="back">
                <button onClick={handleBack}>Back</button>
            </div>
            {dataToEdit === null ?
                <div>Loading...</div>
            :
            <>
            <h1>Edit work</h1>
                <Form
                    initialData={dataToEdit}
                    onSubmit={editWork}
                />
            </>
            }
        </div>
    )
}