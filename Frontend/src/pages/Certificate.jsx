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

            <h1>Benvenuti !!!</h1>

            {certificate ? certificate.map((work) => (
                <div key={work.id} className="certificate">
                    <h2>{work.name}</h2>
                    <p>{work.description}</p>
                    <img src={work.imageCert} alt={work.title} />
                    <Link to={`/certificate/${work.id}`}>Dettagli</Link>
                </div>
            )) : <p>Loading certificate...</p>
            }

        </div>

    </>)
}
