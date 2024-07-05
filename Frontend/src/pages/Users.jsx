import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import axios from "../utils/axiosClient";

export default function() {

    const { isLoggedIn, user } = useAuth();
    const [users, setUsers] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async () => {
        const { data: array } = await axios.get(`/admin/users`);
        setUsers(array.data);
    };

    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/dashboardAdmin');
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = users ? users.filter(user => 
        user.surname.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <>
            <div className="users">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="text-center mb-4">Utenti Registrati</h1>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <input 
                                type="text" 
                                placeholder="Cerca per cognome..." 
                                value={searchTerm} 
                                onChange={handleSearchChange} 
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="row">
                        {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                            <div key={`user${user.id}`} className="col-3 mb-4">
                                <div className="card">
                                    <img src={user.imageUrl} alt={user.title} className="card-img-top"/>
                                    <div className="card-body">
                                        <h5 className="card-title">{user.name}</h5>
                                        <h5 className="card-title">{user.surname}</h5>
                                        <p className="card-text">Email: <a href={`mailto:${user.email}`}>{user.email}</a></p>
                                        <p className="card-text">Tel: <a href={`tel:${user.phone}`}>{user.phone}</a></p>
                                    </div>
                                </div>
                            </div>
                        )) : <p>Nessun utente trovato</p>}
                        <div className="col-12">
                            <div className="back">
                                <button onClick={handleBack} className="btn btn-primary">Back</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
