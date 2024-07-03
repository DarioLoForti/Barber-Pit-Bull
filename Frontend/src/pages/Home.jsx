import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../utils/axiosClient";
import Slider from "../components/Slider";
import MapComponent from "../components/MapComponent";

export default function(){

    // const {isLoggedIn, user} = useAuth();

    const [reviews, setReviews] = useState(null);

    // const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

    // // const [searchParams, setSearchParams] = useSearchParams({page: 1});

    // // const currPage = parseInt(searchParams.get('page'));

    const fetchReviews = async () => {
        const { data: array } = await axios.get(`/reviews`);
        setReviews(array.data);
    }


    useEffect(() => {
       fetchReviews();
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
        {/* <div className="homepage">

        <h1>Benvenuti !!!</h1>


        </div> */}

        

        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="jumbotron">
                    <h1 className="text-center">Welcome...</h1>
                    <img src="../../public/logo/BarberStyle.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="raw">
                <div className="col-12">
                    <h3 className="text-center my-4">Recenzioni</h3>
                </div>
                {/* {reviews ? reviews.map((review) => (
                    <div key={`review{review.id}`} className="col-3">
                        <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title">{review.userName}</h3>
                                    <h5 className="card-text">{review.rating}</h5>
                                    <p className="card-text">{review.comment}</p>
                                    <Link to={`/reviews/${review.id}`} className="btn btn-secondary">Vedi dettagli</Link>
                                </div>
                        </div>
                    </div>
                        )) : <p>Loading reviews...</p>
                } */}
                <div className="row my-5">
                    <div className="col-6">
                    {reviews ? <Slider reviews={reviews} /> : <p>Loading reviews...</p>}
                    </div>
                    <div className="col-6">
                        <h1>Mappa</h1>
                        <MapComponent />
                    </div>
                </div>
                
            </div>
        </div>

    </>)
}
