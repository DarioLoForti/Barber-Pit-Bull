import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import axios from "../utils/axiosClient";
// import Slider from "../components/Slider";



export default function(){

    const {isLoggedIn, user} = useAuth();

    const [users, setUsers] = useState(null);

    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

    // const [searchParams, setSearchParams] = useSearchParams({page: 1});

    // const currPage = parseInt(searchParams.get('page'));

    const fetchUsers = async () => {
        const { data: array } = await axios.get(`/admin/users`);
        setUsers(array.data);
        
    }
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/dashboardAdmin');
   };


    useEffect(() => {
       fetchUsers();
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

        <div className="users">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center mb-4">Utenti Registrati</h1>
                </div>
            </div>
            <div className="row">
                    {users ? users.map((user) => (
                        <div key={`user${user.id}`} className="col-3">
                            <div className="card">
                                <img src={user.imageUrl} alt={user.title} />
                                    <div className="card-body">
                                        <h5 className="card-title">{user.name}</h5>
                                        <h5 className="card-title">{user.surname}</h5>
                                        <p className="card-text">{user.email}</p>
                                        <p className="card-text">{user.phone}</p>
                                    </div>
                            </div>
                        </div>
                            )) : 
                            <p>Loading users...</p>
                    }
                    <div className="col-12">
                    <div className="back">
                                <button onClick={handleBack}>Back</button>
                                </div>
                    </div>
            </div>
        </div>
        </div>



    </>)
}
