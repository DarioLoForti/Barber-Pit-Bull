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
        <div className="home">

            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="jumbotron">
                            {isLoggedIn && <h1>Welcome {user.name}</h1>
                            }
                            {!isLoggedIn && <h1>Welcome...</h1>}
                            <img className="palo" src="../../public/jumbo/palo barbiere 1.jpg" alt="" />
                            <img className="barber" src="../../public/logo/BarberStyle.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row my-5">
                    <div className="col-2">

                    </div>
                    <div className="col-4 mt-3">
                        <img src="../../public/profile/profilo.jpg" alt="" />
                    </div>
                    <div className="col-6">
                        <h2 className="mb-5">Barber Style</h2>
                        <p>Il mio nome è Daniele Mogavero, sono un barbiere professionista con esperienza pluriennale.</p>
                        <p>Il mio obiettivo è quello di offrire un servizio di qualità e soddisfare le esigenze dei miei clienti.</p>
                        <p>Il mio salone si trova a Collesano, in provincia di Palermo, in Via Vincenzo Florio n. 23.</p>
                        <p>Per prenotare un appuntamento, contattami al numero <a href="https://wa.me/393331234567" target="_blank" rel="noopener noreferrer">+39 333 1234567</a>.</p>
                        <p>Per ulteriori informazioni, visita il mio profilo Instagram <a href="https://www.instagram.com/barber_pit_bull/" target="_blank" rel="noopener noreferrer">Barber_Pit-bull</a>.</p>
                        <p>Il mio salone è aperto dal lunedì al sabato, dalle 8:00 alle 20:00.</p>
                        <p>Vi aspetto per offrirvi un servizio di qualità e per farvi vivere un'esperienza unica.</p>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col-1">

                    </div>
                    <div className="col-7">
                        <h2>La mia esperienza a Sanremo</h2>
                        <p>
                        Ciao a tutti! Sono Daniele Mogavero, parrucchiere e stilista originario di Collesano. <br />
                        Recentemente ho avuto l'opportunità incredibile di vivere un'esperienza indimenticabile al Festival di Sanremo.Grazie alla magia di Internet, ho avuto modo di far conoscere il mio lavoro attraverso il gruppo "United Barber Sicilian", fondato da Pietro Panzarella. Con oltre 1300 membri, questo gruppo mi ha permesso di mettermi in mostra professionalmente e di essere notato dagli addetti ai lavori del mondo della moda e dello spettacolo. <br />
                        È stato un onore far parte di una squadra di stilisti che ha curato il look dei protagonisti del 67° Festival della canzone italiana. Da Gratteri all'Ariston e poi di nuovo a casa nel mio salone madonita a Collesano, questa esperienza mi ha arricchito umanamente e professionalmente, permettendomi di vivere la passione per il mio mestiere al massimo livello.Grazie a tutti voi che mi avete sostenuto e creduto in me. <br /> Continuerò a portare avanti la mia arte con passione e dedizione, sperando di poter ancora stupire e ispirare con i miei lavori.
                        </p>
                    </div>
                    <div className="col-4 mt-3">
                        <img src="../../public/profile/Danile-Mogavero.jpg" alt="" />
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="raw">
                    <div className="col-12">
                        <h3 className="text-center my-2">Recensioni</h3>
                    </div>
                </div>
                {isLoggedIn &&
                    <div className="row my-3">
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
                            <h5><a href="https://www.google.com/maps/search/?api=1&query=Via+Vincenzo+Florio,+23,+90016+Collesano+PA" target="_blank" rel="noopener noreferrer">Via Vincenzo Florio, n 23, <br /> 90016 Collesano PA</a></h5>
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
        </div>
        </>
    );
}
