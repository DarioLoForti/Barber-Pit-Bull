import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import axios from "../utils/axiosClient";
// import Slider from "../components/Slider";



export default function(){

    const {isLoggedIn, user} = useAuth();

    const [works, setWorks] = useState(null);

    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

    // const [searchParams, setSearchParams] = useSearchParams({page: 1});

    // const currPage = parseInt(searchParams.get('page'));

    const fetchWorks = async () => {
        const { data: array } = await axios.get(`/works`);
        setWorks(array.data);
    }


    useEffect(() => {
       fetchWorks();
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

        <div className="works">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center">I miei Lavori</h1>
                </div>
            </div>
            <div className="row">
                    {works ? works.map((work) => (
                        <div key={`work{work.id}`} className="col-3">
                            <div className="card">
                                <img src={work.imageWork} alt={work.title} />
                                    <div className="card-body">
                                        <h5 className="card-title">{work.name}</h5>
                                        <p className="card-text">{work.description}</p>
                                        <Link to={`/works/${work.id}`} className="btn btn-secondary">Vedi dettagli</Link>
                                    </div>
                            </div>
                        </div>
                            )) : 
                            <p>Loading works...</p>
                    }
            </div>
        </div>
        </div>



    </>)
}
