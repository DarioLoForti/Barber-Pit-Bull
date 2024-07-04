import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../utils/axiosClient";
import Slider from "../components/Slider";
import MapComponent from "../components/MapComponent";
import FormReview from '../components/FormReview';
import { useAuth } from "../contexts/AuthContext";

export default function(){

const navigate = useNavigate();
    const [reviews, setReviews] = useState(null);


    const fetchReviews = async () => {
        const { data: array } = await axios.get(`/reviews`);
        setReviews(array.data);
    }

    const sendingReview = async data => {
        console.log(data);
        const res = await axios.post(`/reviews`, data, {
        });
        console.log(res);
        if(res.status < 400){
            navigate('/');
        }
    }


    useEffect(() => {
       fetchReviews();
    }, []);

    const {isLoggedIn, logout, user} = useAuth();

    return (<>
    
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="jumbotron">
                    <h1 className="text-center">Welcome...</h1>
                    <img className="palo" src="../../public/jumbo/palo barbiere 1.jpg" alt="" />
                    <img className="barber" src="../../public/logo/BarberStyle.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
        <div className="container-fluid">
            <div className="raw">
                <div className="col-12">
                    <h3 className="text-center my-4">Recenzioni</h3>
                </div>
            </div>
            <div className="row my-5">
                <div className="home-review">
                    <div className="col-6">
                        {reviews ? <Slider reviews={reviews} /> : <p>Loading reviews...</p>}
                    </div>
                    <div className="col-6">
                        {isLoggedIn && 
                        <div className="create">
                            <h1>Inserisci la tua Recensione</h1>
                            <FormReview
                            onSubmit={sendingReview} 
                            />
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="map d-flex align-items-center mt-5">
                    <div className="col-6">
                        <h2>Barber Style</h2>
                        <h3>Daniele Mogavero</h3>
                        <h5>Via Vincenzo Florio, n 23, <br /> 90016 Collesano PA</h5>
                        <p>Telefono: 333 1234567</p>
                        <p>Email: danielemogavero@gmail.com </p>
                        <p>P.IVA: 03428974235t98</p>
                    </div>
                    <div className="col-6"> 
                        <MapComponent />
                    </div>
                </div>
            </div>
        </div>

    </>)
}
