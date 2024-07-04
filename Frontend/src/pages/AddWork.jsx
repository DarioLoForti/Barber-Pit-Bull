import { Link, useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import axios from '../utils/axiosClient';

export default function() {
    
        const navigate = useNavigate();
    
        const createWork = async data => {
            console.log(data);
            const res = await axios.post(`/works`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(res);
            if(res.status < 400){
                navigate('/works');
            }
        }
        const handleBack = () => {
            navigate('/dashboardAdmin');
       };
    
        return (
        <div className="container">
            <div className="row">
                <div className="col-12 ">
                <h1 className='text-center'>Aggiungi un Lavoro</h1>
                </div>
                <div className="col-4"></div>
                <div className="col-4">
                    <div className="add-work">
                        <div className="back">
                            <button onClick={handleBack}>Back</button>
                        </div>
                    <Form 
                    onSubmit={createWork} 
                    />
                    </div>
                    
                </div>
                
            </div>
        </div>
            
            
        )
    }