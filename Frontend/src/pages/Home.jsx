import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../utils/axiosClient";
import Slider from "../components/Slider";
import MapComponent from "../components/MapComponent";
import FormReview from '../components/FormReview';
import { useAuth } from "../contexts/AuthContext";
import { FaInstagram } from "react-icons/fa";

export default function Home() {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState(null);
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchReviews = async () => {
        const { data: array } = await axios.get(`/reviews`);
        setReviews(array.data);
    }

    const sendingReview = async data => {
        try {
            const res = await axios.post(`/reviews`, data);
            if (res.status < 400) {
                setPopupMessage('Recensione inviata!!!');
                setIsError(false);
                fetchReviews(); // Fetch updated reviews
            }
        } catch (error) {
            setPopupMessage('Recensione non inserita!!!');
            setIsError(true);
        } finally {
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
        }
    }

    useEffect(() => {
        fetchReviews();
    }, []);

    const { isLoggedIn, user } = useAuth();

    return (
        <>
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
                        <h3 className="text-center my-4">Recensioni</h3>
                    </div>
                </div>
                {isLoggedIn &&
                    <div className="row my-5">
                        <div className="home-review">
                            <div className="col-6">
                                {reviews ? <Slider reviews={reviews} /> : <p>Loading reviews...</p>}
                            </div>
                            <div className="col-6">
                                <div className="create">
                                    <h1>Inserisci la tua Recensione</h1>
                                    <FormReview
                                        onSubmit={sendingReview} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {!isLoggedIn &&
                    <div className="row my-5">
                        <div className="col-12">
                            {reviews ? <Slider reviews={reviews} /> : <p>Loading reviews...</p>}
                        </div>
                    </div>
                }
            </div>
            <div className="container mb-5">
                <div className="row">
                    <div className="map d-flex align-items-center">
                        <div className="col-3">
                            <div className="logo-home"></div>
                        </div>
                        <div className="col-3">
                            <h2>Barber Style</h2>
                            <h3>Daniele Mogavero</h3>
                            <h5>Via Vincenzo Florio, n 23, <br /> 90016 Collesano PA</h5>
                            <p>WhatsApp: <a href="https://wa.me/393331234567" target="_blank" rel="noopener noreferrer">+39 333 1234567</a></p>
                            <p>Email: <a href="mailto:danielemogavero@gmail.com">danielemogavero@gmail.com</a></p>
                            <p>P.IVA: 03428974235t98</p>
                            <p><FaInstagram /> <a href="https://www.instagram.com/barber_pit_bull/" target="_blank" rel="noopener noreferrer">Barber_Pit-bull</a></p>
                        </div>
                        <div className="col-6"> 
                            <MapComponent />
                        </div>
                    </div>
                </div>
            </div>

            {showPopup && 
                <div className={`popup ${showPopup ? 'show' : ''} ${isError ? 'error' : 'success'}`}>
                    {popupMessage}
                </div>
            }
        </>
    );
}
