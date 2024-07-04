import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import axios from "../utils/axiosClient";
// import Slider from "../components/Slider";



export default function(){

    const {isLoggedIn, user} = useAuth();

    const [appointments, setAppointments] = useState(null);

    const [date, setDate] = useState(null);

    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

    // const [searchParams, setSearchParams] = useSearchParams({page: 1});

    // const currPage = parseInt(searchParams.get('page'));



    const fetchAppointments = async () => {
        const { data: array } = await axios.get(`/admin/appointments?date=${date}`);
        setAppointments(array.data);
        
    }
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/dashboardAdmin');
   };


    useEffect(() => {
        if(date){
            fetchAppointments();
        }
    }, [date]);
   
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    //     }, 5000);

    //     return () => clearInterval(interval);
    // }, []);


    return (<>
        {/* <div className="homepage">         

        {photos ? <Slider photos={photos} /> : <p>Loading photos...</p>}
        </div> */}

        <div className="appointments">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center mb-4">Appuntamenti</h1>
                </div>
            </div>
            <div className="col-2">
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)} // Aggiorna la data
                className="form-control mb-4"
            />
            </div>
            <div className="row">
                    {appointments ? appointments.map((a) => (
                        <div key={`a${a.id}`} className="col-3">
                            <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{a.user.name}</h5>
                                        <h5 className="card-title">{a.user.surname}</h5>
                                        <p className="card-text">{a.user.phone}</p>
                                    </div>
                                    <div className="card-body">
                                        {a.services ? a.services.map((s) => (
                                            <div key={`s${s.id}`}>
                                                <h5 className="card-title">{s.name}</h5>
                                                <h5 className="card-title">{s.price} Euro</h5>
                                                <p className="card-text">{s.duration} minuti</p>
                                            </div>
                                        )) : <p>Loading services...</p>
                                        }
                                       
                                    </div>
                            </div>
                        </div>
                            )) : 
                            <p>Loading appointments...</p>
                    }
                    <div className="col-12 mt-5">
                    <div className="back">
                                <button onClick={handleBack}>Back</button>
                                </div>
                    </div>
            </div>
        </div>
        </div>



    </>)
}
