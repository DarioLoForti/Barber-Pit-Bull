// import { Link, useSearchParams } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import { useState, useEffect } from "react";
// import axios from "../utils/axiosClient";
// import Slider from "../components/Slider";



export default function(){

    // const {isLoggedIn, user} = useAuth();

    // const [photos, setPhotos] = useState(null);

    // const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

    // // const [searchParams, setSearchParams] = useSearchParams({page: 1});

    // // const currPage = parseInt(searchParams.get('page'));

    // const fetchPhotos = async () => {
    //     const { data: array } = await axios.get(`/photos`);
    //     setPhotos(array.data);
    // }


    // useEffect(() => {
    //    fetchPhotos();
    // }, []);
   
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
        <div className="homepage">

        <h1>Benvenuti !!!</h1>


        </div>

    </>)
}
