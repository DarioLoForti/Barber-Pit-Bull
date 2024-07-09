import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import axios from "../utils/axiosClient";
// import Slider from "../components/Slider";



export default function(){

    const {isLoggedIn, user} = useAuth();

    const [certificate, setCertificate] = useState(null);

    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

    // const [searchParams, setSearchParams] = useSearchParams({page: 1});

    // const currPage = parseInt(searchParams.get('page'));

    const fetchcertificate = async () => {
        const { data: array } = await axios.get(`/certificates`);
        setCertificate(array.data);
    }


    useEffect(() => {
       fetchcertificate();
    }, []);
   
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
        <div className="certificates">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center">I miei Attestati</h1>
                </div>
            </div>
            <div className="row">
                    {certificate ? certificate.map((certificate) => (
                        <div key={`certificate{certificate.id}`} className="col-3">
                            <div className="card">
                                <img src={certificate.imageCert} alt={certificate.title} />
                                    <div className="card-body">
                                        <h5 className="card-title">{certificate.name}</h5>
                                        <p className="card-text">{certificate.description}</p>
                                        {/* <Link to={`/certificates/${certificate.id}`} className="btn btn-secondary">Vedi dettagli</Link> */}
                                    </div>
                            </div>
                       
         </div>
                            )) : 
                            <p>Loading certificates...</p>
                    }
            </div>
        </div>
        </div>

    </>)
}
