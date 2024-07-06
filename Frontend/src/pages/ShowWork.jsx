import React, { useEffect, useState } from "react";
import axios from "../utils/axiosClient";
import { MdDelete, MdEditNote } from "react-icons/md";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Work() {
    const { id } = useParams();
    const [work, setWork] = useState(null);
    const [fullscreen, setFullscreen] = useState(false);

    // State per mostrare l'alert
    const [showAlert, setShowAlert] = useState(false);

    const fetchWork = async () => {
        try {
            const { data } = await axios.get(`/works/${id}`);
            setWork(data);
        } catch (error) {
            console.error("Error fetching work:", error);
        }
    };

    const navigate = useNavigate();

    const deleteWork = async (id) => {
        try {
            await axios.delete(`/works/${id}`);
            navigate('/works');
        } catch (error) {
            console.error("Error deleting work:", error);
        }
    };

    useEffect(() => {
        fetchWork();
    }, [id]);

    const handleBack = () => {
         navigate('/works');
    };

    const toggleFullscreen = () => {
        setFullscreen(!fullscreen);
    };

    const handleDeleteClick = () => {
        console.log("Delete button clicked");
        // Impostiamo showAlert a true invece di setShowDeleteConfirm(true)
        setShowAlert(true);
    };

    const confirmDelete = async () => {
        if (work) {
            await deleteWork(work.id);
        }
        // Chiudiamo l'alert impostando showAlert a false
        setShowAlert(false);
    };

    const cancelDelete = () => {
        // Chiudiamo l'alert impostando showAlert a false
        setShowAlert(false);
    };

    const { isAdminIn } = useAuth();

    return (
        <>
            {work === null ? (
                <span>Loading...</span>
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                        {showAlert && (
                        <div className="alert">
                            <p>Sei sicuro di voler eliminare questo lavoro?</p>
                            <button onClick={confirmDelete}>Conferma</button>
                            <button onClick={cancelDelete}>Annulla</button>
                        </div>
                    )}
                        </div>
                        <div className="col-12">
                            <div className="work">
                                <div className="back">
                                    <button onClick={handleBack}>Back</button>
                                </div>
                                <div className="card-work">
                                    {isAdminIn && (
                                        <div className="top-card">
                                            <h4>
                                                <Link to={`/works/${id}/edit`}>
                                                    Modifica <MdEditNote />
                                                </Link>
                                            </h4>
                                            {/* Cambiamo l'evento onClick */}
                                            <h4 onClick={handleDeleteClick}>
                                                Elimina <MdDelete />
                                            </h4>
                                        </div>
                                    )}
                                    {fullscreen && (
                                        <div className="fullscreen-overlay" onClick={toggleFullscreen}>
                                            <img src={work.imageWork} alt={work.name} className="fullscreen-image" />
                                        </div>
                                    )}
                                    {!fullscreen && (
                                        <img src={work.imageWork} alt={work.name} onClick={toggleFullscreen} />
                                    )}
                                    <h1>{work.name}</h1>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    {/* Utilizziamo un alert anziché la modale */}
                    
                </div>
            )}
        </>
    );
}
